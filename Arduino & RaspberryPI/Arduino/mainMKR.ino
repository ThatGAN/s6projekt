// MQTT Import
#include <MKRNB.h>
#include <ArduinoMqttClient.h>
#include <ArduinoLowPower.h>
//Sensor Import
#include <Arduino_MKRENV.h>

int sensorPin = A0;
int sensorValue = 0;

//The MKRNB lib needs this even if its blank
const char PINNUMBER[]     = "1503";

//broker url in here, demo is using eclipse test server

//broker port in here
int mqttPort = 1883;

//var things for storage
const char broker[] = "weatherstation.dynv6.net";
int        port     = 1883;
const char topic[]  = "MKREnvData";
boolean loopTrigger = false;

// initialize the library instance
NBClient client;
GPRS gprs;
NB nbAccess;

MqttClient mqttClient(client);

bool restart = false;
bool connected = false;


void setup() {  
  //Setting up the Board Sensors
  setupSensors();

  //Setting up the NB Connection
  setupNB();

  //Setting up MQTT Connection
  setupMQTT();

}

void setupSensors() {
  Serial.begin(9600);
  while (!Serial && (millis() < 10000));

  if (!ENV.begin()) {
    Serial.println("Failed to initialize MKR ENV shield!");
    while (1);
  }
}

void setupNB(){
   Serial.println("Warming up....");
  // connection state
  boolean connected = false;

  while (!connected) {
    if ((nbAccess.begin(PINNUMBER, true) == NB_READY) &&
        (gprs.attachGPRS() == GPRS_READY)) {
          Serial.println("Successfully connected!");
      connected = true;
    } else {
      Serial.println("Not connected");
      restart = true;
      delay(1000);
    }
  }
  
}

void setupMQTT() {
  // initialize serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial && (millis() < 10000)) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  Serial.println("connecting to the mqtt broker...");

  Serial.println(broker);

  if (!mqttClient.connect(broker, port)) {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());

    while (1);
  }

  Serial.println("You're connected to the MQTT broker!");
  Serial.println();

  Serial.print("Subscribing to topic: ");
  Serial.println(topic);
  Serial.println();

  // subscribe to a topic
  mqttClient.subscribe(topic);

  // topics can be unsubscribed using:
  // mqttClient.unsubscribe(topic);

  Serial.print("Waiting for messages on topic: ");
  Serial.println(topic);
  Serial.println();

}

void verifyConnection() {
  if (nbAccess.isAccessAlive()){
    connected = true;
    Serial.println("Connection verified");
  }
    else{
      connected = false;
      Serial.println(F("Restart"));

      setupNB();
    }
}

void verifyMQTT(){
  if(!mqttClient.connected()){
    setupMQTT
    ();
  }else{
    Serial.println("MQTT verified");
  }
}

void restartSerial(){
  if (!Serial){
    Serial.begin(9600);
    while(!Serial && (millis() < 10000)){
      }
  }
  
}

void loop() {
  Serial.println("Start of loop()");

  //restartSerial();

  verifyConnection();
  verifyMQTT();
  
  // put your main code here, to run repeatedly:
  // read all the sensor values
  float temperature = ENV.readTemperature();
  float humidity    = ENV.readHumidity();
  float pressure    = ENV.readPressure();
  float illuminance = ENV.readIlluminance();
  sensorValue = analogRead(sensorPin);     

  //Establishing MQTT Conn to send msg
  mqttClient.beginMessage(topic);
  // print each of the sensor values
  //mqttClient.print("Temperature = ");
  mqttClient.print(temperature);
  mqttClient.print(",");
 // mqttClient.print(" °C");

 // mqttClient.print("Humidity    = ");
  mqttClient.print(humidity);
  mqttClient.print(",");
 // mqttClient.print(" %");

 // mqttClient.print("Pressure    = ");
  mqttClient.print(pressure);
  mqttClient.print(",");
 // mqttClient.print(" kPa");

//  mqttClient.print("Illuminance = ");
  mqttClient.print(illuminance);
  mqttClient.print(",");
 // mqttClient.print(" lx");

  mqttClient.print(sensorValue);
  delay(10000);
  mqttClient.print(",");
  
  mqttClient.print("638b772697742e380fdf5302");
  //Ending Connection
  mqttClient.endMessage();
  

  delay(1000);

  
  mqttClient.stop();

  Serial.println("Entering Sleep WakeUp Cicle");
  Serial.end();
  //delay(10000);
  nbAccess.shutdown();
  
  LowPower.sleep(600000);

}
