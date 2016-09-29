var TiBeacons = require('org.beuckman.tibeacons');

$.beaconLabel.text = "Beacon: " + Alloy.CFG.beacon.uuid + "\nMajor: " + Alloy.CFG.beacon.major + "\nMinor: " + Alloy.CFG.beacon.minor;
$.label.text = "Flip the switch to start monitoring for the Beacon";
monitorStartTimestamp = null;

Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS);

function onEnterRegion(e) {
  Ti.API.info('ENTER region: ' + JSON.stringify(e));
  print('[Enter]');

  TiBeacons.startRangingForBeacons(e);
}

function onExitRegion(e) {
  Ti.API.info('EXIT region: ' + JSON.stringify(e));
  print('[Exit]');

  TiBeacons.stopRangingForBeacons(e);
}

function onDeterminedRegionState(e) {
  Ti.API.info('DETERMINED region: ' + JSON.stringify(e));

  print("[RegionState] " + e.regionState);
}

function onBeaconRanges(e) {
  Ti.API.info('RANGES: ' + JSON.stringify(e));
  if(e.beacons && (e.beacons.length > 0)) {
    print('[Range] ' + e.beacons[0].proximity);
  }
}
function onBeaconProximity(e) {
  Ti.API.info('PROXIMITY: ' + JSON.stringify(e));
  print('[Proximity] ' + e.proximity + "(" + e.fromProximity + ", " + e.accuracy + ", " + e.rssi + ")");
}

function toggleMonitoring() {

  if ($.monitoringSwitch.value) {
    monitorStartTimestamp = new Date();
    print("START monitoring and ranging");
    TiBeacons.startMonitoringForRegion({
      notifyEntryStateOnDisplay: "YES",
      uuid: Alloy.CFG.beacon.uuid,
      major: Alloy.CFG.beacon.major,
      minor: Alloy.CFG.beacon.minor,
      identifier: "Estimote"
    });
  } else {
    print("STOP monitoring and ranging");
    TiBeacons.stopMonitoringAllRegions();
    TiBeacons.stopRangingForAllBeacons();
  }
}

function clearLog() {
  $.label.text = "";
}

function print(s) {
  var now = new Date();
  var secondsPassed = ((now - monitorStartTimestamp) / 1000);
  var padding = "0000";
  $.label.text = (padding + Math.round(secondsPassed)).slice(-padding.length) + "s    " + (s + "\n") + $.label.text;
}

/*----------------------------------
  EVENTS
-----------------------------------*/
TiBeacons.addEventListener('bluetoothStatus', function(e){
  Ti.API.info('bluetoothStatus = ' + JSON.stringify(e));
});

TiBeacons.addEventListener("enteredRegion", onEnterRegion);
TiBeacons.addEventListener("exitedRegion", onExitRegion);
TiBeacons.addEventListener("determinedRegionState", onDeterminedRegionState);

TiBeacons.addEventListener("beaconRanges", onBeaconRanges);
TiBeacons.addEventListener("beaconProximity", onBeaconProximity);


TiBeacons.requestBluetoothStatus();
$.index.open();

if (!Ti.Geolocation.locationServicesEnabled) {
  alert('Please enable location services');
}
