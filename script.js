let bluetoothDevice;
let characteristic;

// 🔗 Bluetooth Connection to HC-05
async function connectBluetooth() {
    try {
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['00001101-0000-1000-8000-00805f9b34fb']
        });

        const server = await bluetoothDevice.gatt.connect();
        const service = await server.getPrimaryService('00001101-0000-1000-8000-00805f9b34fb');
        characteristic = await service.getCharacteristic('00002a37-0000-1000-8000-00805f9b34fb');

        alert("Connected to HC-05!");
    } catch (error) {
        alert("Bluetooth Connection Failed: " + error);
    }
}

// 📡 Send Command to Robot
async function sendCommand(command) {
    if (!characteristic) {
        alert("Please connect to HC-05 first.");
        return;
    }

    const encoder = new TextEncoder();
    await characteristic.writeValue(encoder.encode(command));
    console.log("Sent: " + command);
}

// 🎮 Joystick Control
let joystick = nipplejs.create({
    zone: document.getElementById("joystickContainer"),
    mode: "dynamic",
    color: "red",
    size: 150
});

joystick.on("move", (evt, data) => {
    let angle = data.angle.degree;
    if (angle >= 45 && angle <= 135) {
        sendCommand("F");  // Move Forward
    } else if (angle >= 225 && angle <= 315) {
        sendCommand("B");  // Move Backward
    } else if (angle > 135 && angle < 225) {
        sendCommand("L");  // Move Left
    } else if (angle > 315 || angle < 45) {
        sendCommand("R");  // Move Right
    }
});

joystick.on("end", () => {
    sendCommand("S");  // Stop when joystick is released
});
