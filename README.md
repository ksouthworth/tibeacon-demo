A basic iOS mobile app that can "listen" for a beacon and display basic information like in/out of range and approximate distance from the beacon.  These are the basic building blocks you'll need to build a more full-featured mobile app.

[screenshot]

## Requirements

1. At least 1 Beacon. [Estimote](http://estimote.com) beacons are very popular, and that's what I used for this app.
2. An iOS device that supports Bluetooth 4.0 (iPhone 4S or later, iPad 3rd-gen or later)
3. Appcelerator Titanium SDK (tested on 5.5.1)

## Setup

Edit your `config.json` with the details of your Beacon (app just looks for a single beacon).

```
"global": {
  "beacon": {
    "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
    "major": 1,
    "minor": 2  
  }
}
```
