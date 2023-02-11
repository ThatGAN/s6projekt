#!/usr/bin/env python3
import serial
import config
from datetime import datetime
from pymongo import MongoClient

client = MongoClient("mongodb+srv://ThatGAN:{}@cluster0.fsf0qbj.mongodb.net/?retryWrites=true&w=majority".format(config.password))

db = client.weather

collection = db.stationEntries




if __name__ == '__main__':
    ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
    ser.reset_input_buffer()
    while True:
        time = datetime.now()
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').split()
            print(line)
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
                entry = {"temperature": temp,
                     "humidity": humidity,
                     "illuminance": light,
                     "sound": sound,
                     "pressure": pressure,
                     "createdAt": time,
                     "station_id": "637e7149f0007e04d9e986aa"}
                print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"),":")
                print(entry)
                collection.insert_one(entry)
                
                
