#include "Wire.h"
#include "DHT.h"
#include "Arduino_SensorKit.h"
#define DHTTYPE DHT20 // DHT 20

DHT dht(DHTTYPE); //   DHT10 DHT20 don't need to define Pin

#if defined(ARDUINO_ARCH_AVR)
#define debug Serial

#elif defined(ARDUINO_ARCH_SAMD) || defined(ARDUINO_ARCH_SAM)
#define debug SerialUSB
#else
#define debug Serial
#endif

int sound_sensor = A2;
int light_sensor = A3;

float pressure;

void setup()
{

  debug.begin(9600);
  Serial.begin(9600);
  // debug.println("DHTxx test!");
  Wire.begin();
  Pressure.begin();

  /*if using WIO link,must pull up the power pin.*/
  // pinMode(PIN_GROVE_POWER, OUTPUT);
  // digitalWrite(PIN_GROVE_POWER, 1);

  dht.begin();
}

void loop()
{
while(true)
  {
    float temp_hum_val[2] = {0};
    int raw_light = analogRead(light_sensor);
    int light = map(raw_light, 0, 1023, 0, 100);
    int soundValue = 0;  
    
    if (!dht.readTempAndHumidity(temp_hum_val)) {
       /* debug.print("Humidity: ");
        
        debug.print(" %\t");
        debug.print("Temperature: ");
        debug.println(" *C"); */
        Serial.print("Temp: ");
        Serial.println(temp_hum_val[1]);
        Serial.print("Humidity: ");
        Serial.println(temp_hum_val[0]);
        
    } else {
        debug.println("Failed to get temprature and humidity value.");
    }

    Serial.print("Light: ");
    Serial.println(light);

            // create variable to store many different readings
    for (int i = 0; i < 32; i++) // create a for loop to read
    {
    soundValue += analogRead(sound_sensor);
    } // read the sound sensor

    soundValue >>= 5;

    Serial.print("Sound: ");
    Serial.println(soundValue);

    Serial.print("Pressure: ");
    Serial.println(Pressure.readPressure());
    //Serial.println("Pa");

    if (soundValue > 500)
    {
      Serial.println("      !! Sound thres hold met !!        ");
    }
    delay(600000);
    }
  
}