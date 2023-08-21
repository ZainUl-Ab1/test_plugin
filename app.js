// camera-worker.js
let cameraStream = null;

self.onmessage = function (e) {
    if (e.data === 'start') {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                cameraStream = stream;
                self.postMessage('started');
            })
            .catch((error) => {
                console.error('Error starting camera stream:', error);
                self.postMessage('error');
            });
    } else if (e.data === 'stop') {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
            self.postMessage('stopped');
        }
    }
};
