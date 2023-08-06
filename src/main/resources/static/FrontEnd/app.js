// WebSocket related variables
var socket;
var stompClient;

// Initialize WebSocket connection
function initializeWebSocket() {
    socket = new SockJS('http://localhost:8080/websocket-endpoint');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
        console.log('Connected to WebSocket');

        stompClient.subscribe('/topic/receive-message', function(message) {
            document.getElementById('received-messages').innerHTML += '<p>Received: ' + message.body + '</p>';
        });
    });
}

// Function to send a message via WebSocket
function sendMessage() {
    var message = document.getElementById('message').value;
    stompClient.send("/app/send-message", {}, message);
}

// Function to register a user (dummy function for now)
function registerUser() {
    var username = document.getElementById('username').value;
    console.log('User registered:', username);
    // Here, you can add an API call to your backend to register the user
}

// Initialize WebSocket on page load
window.onload = initializeWebSocket;