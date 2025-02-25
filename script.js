let bluetoothDevice;
let characteristic;
let customCommands = {
    forward: "move forward",
    backward: "move backward",
    left: "turn left",
    right: "turn right",
    stop: "stop"
};

// 🔗 Bluetooth Connection
async function connectBluetooth() {
    try {
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['00001101-0000-1000-8000-00805f9b34fb']
        });

        const server = await bluetoothDevice.gatt.connect();
        const service = await server.getPrimaryService('00001101-0000-1000-8000-00805f9b34fb');
        characteristic = await service.getCharacteristic('00002a37-0000-1000-8000-00805f9b34fb');

        alert("Connected to Robot!");
    } catch (error) {
        alert("Bluetooth Connection Failed: " + error);
    }
}

// 📡 Send Command to Robot
async function sendCommand(command) {
    if (!characteristic) {
        alert("Please connect to the robot first.");
        return;
    }

    const encoder = new TextEncoder();
    await characteristic.writeValue(encoder.encode(command));
    alert("Sent: " + command);
}

// 🎙️ Start Voice Control
function startVoiceControl() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function (event) {
        let spokenCommand = event.results[0][0].transcript.toLowerCase();
        document.getElementById("currentCommand").innerText = "You said: " + spokenCommand;

        if (spokenCommand.includes(customCommands.forward)) {
            sendCommand('F');
        } else if (spokenCommand.includes(customCommands.backward)) {
            sendCommand('B');
        } else if (spokenCommand.includes(customCommands.left)) {
            sendCommand('L');
        } else if (spokenCommand.includes(customCommands.right)) {
            sendCommand('R');
        } else if (spokenCommand.includes(customCommands.stop)) {
            sendCommand('S');
        } else {
            alert("Unknown Command: Try again.");
        }
    };
}

// 📝 Save Custom Commands
function saveCommands() {
    customCommands.forward = document.getElementById("cmdForward").value || "move forward";
    customCommands.backward = document.getElementById("cmdBackward").value || "move backward";
    customCommands.left = document.getElementById("cmdLeft").value || "turn left";
    customCommands.right = document.getElementById("cmdRight").value || "turn right";
    customCommands.stop = document.getElementById("cmdStop").value || "stop";
    
    alert("Custom Commands Updated!");
}
