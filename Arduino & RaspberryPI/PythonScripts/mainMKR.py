#!/usr/bin/env python3

from datetime import datetime
from pymongo import MongoClient
import config

client = MongoClient("mongodb+srv://ThatGAN:{}@cluster0.fsf0qbj.mongodb.net/?retryWrites=true&w=majority".format(config.password))

db = client.weather

collection = db.stationEntries

import random

from paho.mqtt import client as mqtt_client


broker = '192.168.2.37'
port = 1883
topic = "#"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 100)}'
# username = 'emqx'
# password = 'public'


def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
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

    client.subscribe(topic)
    client.on_message = on_message


def run():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()


if __name__ == '__main__':
    run()