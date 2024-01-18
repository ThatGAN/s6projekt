#!/usr/bin/env python3
import serial
import config
from datetime import datetime
from pymongo import MongoClient
import time
import smtplib

client = MongoClient("mongodb+srv://ThatGAN:{}@cluster0.fsf0qbj.mongodb.net/?retryWrites=true&w=majority".format(config.password))

db = client.weather

collection = db.stationEntries

timer_duration = 900

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


def reset_timer():
    return time.time() + timer_duration

def handle_timeout():
    sendTo = 'hangman909@gmail.com'
    emailSubject = "UNO Muenster"
    emailContent = "Der UNO-R3 sendet keine Daten mehr"
    sender.sendmail(sendTo, emailSubject, emailContent)
    print("E-Mail send.")

if __name__ == '__main__':
    ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
    ser.reset_input_buffer()

    # Initialize the timer and timeout flag
    next_reset_time = reset_timer()
    timeout_occurred = False

    while True:
        current_time = time.time()

        if ser.in_waiting > 0:
            # Reset the timer and clear the timeout flag on new message arrival
            next_reset_time = reset_timer()
            timeout_occurred = False

            line = ser.readline().decode('utf-8').split()
            print(line)

            # Original code for handling data
            if line[0] == "Temp:":
                temp = float(line[1])
            if line[0] == "Humidity:":
                humidity = float(line[1])
            if line[0] == "Light:":
                light = int(line[1])
            if line[0] == "Sound:":
                sound = int(line[1])
            if line[0] == "Pressure:":
                pressure = int(line[1])
                entry = {
                    "temperature": temp,
                    "humidity": humidity,
                    "illuminance": light,
                    "sound": sound,
                    "pressure": pressure,
                    "createdAt": datetime.now(),
                    "station_id": "637e7149f0007e04d9e986aa"
                }
                print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"), ":")
                print(entry)
                collection.insert_one(entry)

        # Check if the timer has expired and the timeout action hasn't occurred yet
        if current_time > next_reset_time and not timeout_occurred:
            handle_timeout()
            # Set the flag to indicate that the timeout action has occurred
            timeout_occurred = True
