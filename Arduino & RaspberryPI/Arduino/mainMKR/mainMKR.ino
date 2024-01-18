// MKR NarrowBand Import
#include <MKRNB.h>
// MQTT Import
#include <ArduinoMqttClient.h>
// Low Power Import
#include <ArduinoLowPower.h>
//Sensor Import
#include <Arduino_MKRENV.h>

int sensorPin = A3;
int sensorValue = 0;

//The MKRNB lib needs this even if its blank
const char PINNUMBER[] = "1503";

//var things for storage
char broker[] = "ipv4record.weatherstation.v6.rocks";
int port = 1883;
const char topic[] = "MKREnvData";


// initialize the library instance
NBClient client;
NB nbAccess(true);
GPRS gprs;

MqttClient mqttClient(client);

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
  while (!Serial && (millis() < 5000))
    ;

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
    if ((nbAccess.begin(PINNUMBER) == NB_READY) && (gprs.attachGPRS() == GPRS_READY)) {
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
      delay(10000);
    }
  }
}

void setupMQTT() {
  mqttClient.setConnectionTimeout(360 * 1000L);
  bool mqttConnected = false;
  int x = 0;

  Serial.println("connecting to the mqtt broker...");
  Serial.println(broker);

  while (!mqttConnected) {
    Serial.println("Start of !mqttConnected");
    Serial.println("NB Access:");
    Serial.println(nbAccess.isAccessAlive());
    Serial.println("MqttConnect:");
    Serial.println(mqttClient.connected());
    if (!mqttClient.connect(broker, port)) {
      x++;
      Serial.print("MQTT connection failed! Error code = ");
      Serial.println(mqttClient.connectError());
      Serial.println("NB Access:");
      Serial.println(nbAccess.isAccessAlive());
      if (!nbAccess.isAccessAlive()) {
        myReset();
      }
      Serial.print("Trys: ");
      Serial.println(x);
      if (x == 10){
        longReset();
      }
      delay(10000);
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
  Serial.begin(9600);
  while (!Serial && (millis() < 5000))
    ;

  Serial.println("Start of loop()");
  Serial.println("NB Access:");
  Serial.println(nbAccess.isAccessAlive());
  Serial.println("MqttConnect:");
  Serial.println(mqttClient.connected());

  verifyConnection();
  verifyMQTT();

  // put your main code here, to run repeatedly:
  // read all the sensor values
  float temperature = ENV.readTemperature();
  float humidity = ENV.readHumidity();
  float pressure = ENV.readPressure();
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
  mqttClient.print(",");

  mqttClient.print("638b772697742e380fdf5302");
  //Ending Connection
  mqttClient.endMessage();

  delay(8000);

  mqttClient.stop();

  Serial.println("Entering Sleep WakeUp Cicle");
  Serial.end();
  nbAccess.shutdown();

  LowPower.sleep(600000);
}

void myReset() {
  Serial.println("Resetting");
  LowPower.sleep(120000);
  NVIC_SystemReset();
}

void longReset(){
  Serial.println("Resetting");
  LowPower.sleep(2700000);
  NVIC_SystemReset();
}

void verifyConnection() {
  if (!nbAccess.isAccessAlive()) {
    Serial.println("Connection not verified");
    setupNB();
  } else {
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