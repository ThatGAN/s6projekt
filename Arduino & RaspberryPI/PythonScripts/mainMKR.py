#!/usr/bin/env python3

from datetime import datetime
from pymongo import MongoClient
import config
import random
import threading
import smtplib
from paho.mqtt import client as mqtt_client

client = MongoClient("mongodb+srv://ThatGAN:{}@cluster0.fsf0qbj.mongodb.net/?retryWrites=true&w=majority".format(config.password))
db = client.weather
collection = db.stationEntries

broker = '192.168.2.37'
port = 1883
topic = "#"
client_id = f'python-mqtt-{random.randint(0, 100)}'
username = f'mqttuser'
password = f'mqtt125634'

# Timer configuration
timer_interval = 900  # in seconds
timer_reset_flag = threading.Event()

SMTP_SERVER = 'smtp.gmail.com' #Email Server (don't change!)
SMTP_PORT = 587 #Server Port (don't change!)
GMAIL_USERNAME = 'raspberrynotificationgan@gmail.com' #change this to match your gmail account
GMAIL_PASSWORD = "lldr bjyg gfcn aais" #change this to match your gmail app-password

class Emailer:
    def sendmail(self, recipient, subject, content):

        #Create Headers
        headers = ["From: " + GMAIL_USERNAME, "Subject: " + subject, "To: " + recipient,
                   "MIME-Version: 1.0", "Content-Type: text/html"]
        headers = "\r\n".join(headers)

        #Connect to Gmail Server
        session = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        session.ehlo()
        session.starttls()
        session.ehlo()

        #Login to Gmail
        session.login(GMAIL_USERNAME, GMAIL_PASSWORD)

        #Send Email & Exit
        session.sendmail(
            GMAIL_USERNAME, recipient, headers + "\r\n\r\n" + content
        )
        session.quit

sender = Emailer()

def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.username_pw_set(username, password)
    client.connect(broker, port)
    return client

def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        global timer_reset_flag  # Use the outer variable
        time = datetime.now()
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
        mqttIn = (f"{msg.payload.decode()}")
        x = mqttIn.split(",")

        entry = {"temperature": x[0],
                 "humidity": x[1],
                 "illuminance": x[3],
                 "pressure": x[2],
                 "groundHumidity": x[4],
                 "createdAt": time,
                 "station_id": x[5]}
        collection.insert_one(entry)
        print(entry)

        # Reset the timer when a message arrives
        timer_reset_flag.set()

    client.subscribe(topic)
    client.on_message = on_message

def timer_function():
    while True:
        # Wait for the timer interval or until the flag is set
        timer_reset_flag.wait(timeout=timer_interval)
        
        if not timer_reset_flag.is_set():
            # Call your function only if the timer is not reset by a new message
            handle_timeout()
            
        # Reset the timer flag for the next iteration
        timer_reset_flag.clear()

def handle_timeout():
    sendTo = 'hangman909@gmail.com'
    emailSubject = "MKR Brochterbeck"
    emailContent = "Der MKR NB-1500 sendet keine Daten mehr"
    sender.sendmail(sendTo, emailSubject, emailContent)
    print("E-Mail send.")

def run():
    client = connect_mqtt()
    subscribe(client)

    # Start the timer thread
    timer_thread = threading.Thread(target=timer_function)
    timer_thread.daemon = True
    timer_thread.start()

    client.loop_forever()

if __name__ == '__main__':
    run()
