// MKR NarrowBand Import
#include <MKRNB.h>
// MQTT Import
#include <ArduinoMqttClient.h>
// Low Power Import
#include <ArduinoLowPower.h>
//Sensor Import
#include <Arduino_MKRENV.h>

int sensorPin = A0;
int sensorValue = 0;

//The MKRNB lib needs this even if its blank
const char PINNUMBER[] = "1503";

//broker url in here, demo is using eclipse test server

//broker port in here
int mqttPort = 1883;

//var things for storage
const char broker[] = "93.209.78.87";
int port = 1883;
const char topic[] = "MKREnvData";

// initialize the library instance
NBClient client;
GPRS gprs;
NB nbAccess;

MqttClient mqttClient(client);

void setup() {
  //Setting up the Board Sensors
  setupSensors();

  //Setting up the NB Connection
  setupNB();

  //Setting up MQTT Connection
  setupMQTT();

  pinMode(SARA_PWR_ON, OUTPUT);
  digitalWrite(SARA_PWR_ON, HIGH);
}

void setupSensors() {
  Serial.begin(9600);
  while (!Serial && (millis() < 10000));

  if (!ENV.begin()) {
    Serial.println("Failed to initialize MKR ENV shield!");
    while (1)
      ;
  }
}

void setupNB() {
  Serial.println("Warming up....");

  // connection state
  bool connected = false;
  while (!connected) {
    Serial.println("Start of !connected");
    if (nbAccess.begin(PINNUMBER, true) == NB_READY){
          Serial.println("Connect successful");
          Serial.println("NB Access:");
          Serial.println(nbAccess.isAccessAlive());
      connected = true;
    } else {
      Serial.println("Failed");
      Serial.println("NB Access:");
      Serial.println(nbAccess.isAccessAlive());
      Serial.println("MqttConnect:");
      Serial.println(mqttClient.connected());
      delay(2000);
      myReset();
    }
  }
}
void setupMQTT() {
  bool mqttConnected = false;
  Serial.println("connecting to the mqtt broker...");

  Serial.println(broker);

while(!mqttConnected){
  Serial.println("Start of !mqttConnected");
  Serial.println("NB Access:");
  Serial.println(nbAccess.isAccessAlive());
  Serial.println("MqttConnect:");
  Serial.println(mqttClient.connected());
    if (!mqttClient.connect(broker, port)) {
      Serial.print("MQTT connection failed! Error code = ");
      Serial.println(mqttClient.connectError());
      Serial.println("NB Access:");
      Serial.println(nbAccess.isAccessAlive());
      if(!nbAccess.isAccessAlive()){
        myReset();
      }
      delay(2000);
    } else {
      Serial.println("Mqtt Success!");
      Serial.println(mqttClient.connected());
      mqttConnected = true;
    }
  }

  Serial.println("You're connected to the MQTT broker!");
  Serial.println();

  Serial.print("Publishing to topic: ");
  Serial.println(topic);
  Serial.println();
}

void loop() {
  Serial.println("Start of loop()");
    Serial.println("NB Access:");
    Serial.println(nbAccess.isAccessAlive());
    Serial.println("MqttConnect:");
    Serial.println(mqttClient.connected());

  //Check to see if the connections are alive
  //This defaults to connect after wakeUp
  verifyConnection();
  verifyMQTT();

  // read all the sensor values
  float temperature = ENV.readTemperature();
  float humidity = ENV.readHumidity();
  float pressure = ENV.readPressure();
  float illuminance = ENV.readIlluminance();
  sensorValue = analogRead(sensorPin);

  //Establishing MQTT Conn to send msg
  mqttClient.beginMessage(topic);
  //print each of the sensor values
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
  mqttClient.print(",");

  mqttClient.print("638b772697742e380fdf5302");
  //Ending Connection
  mqttClient.endMessage();

  delay(1000);

  //Clean Exit for MQTT
  mqttClient.stop();

  Serial.println("Entering Sleep WakeUp Cicle");
  Serial.end();
  //delay(10000);

  //Shutdown the SARA Modem to save battery life
  nbAccess.shutdown();

  LowPower.sleep(600000);
}

//soft reset for Arduino if the Modem defaults into Error Loop
void myReset(){
  Serial.println("Reseting");
  //Sleep for 1min so the Modem has time to rest
  LowPower.sleep(60000);
  NVIC_SystemReset();
}

void verifyConnection() {
  if(!nbAccess.isAccessAlive()){
    Serial.println("Connection not verified");
    setupNB();
  }else{
    Serial.println("Connection verified");
  }
}

void verifyMQTT() {
  if (!mqttClient.connected()) {
    Serial.println("MQTT not verified");
    Serial.println("NB Access:");
    Serial.println(nbAccess.isAccessAlive());
    Serial.println("MqttConnect:");
    Serial.println(mqttClient.connected());
    setupMQTT();
  } else {
    Serial.println("MQTT verified");
  }
}

void restartSerial() {
  if (!Serial) {
    Serial.begin(9600);
    while (!Serial && (millis() < 10000)) {
    }
  }
}