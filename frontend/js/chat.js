/**
 * NASA Asteroid Tracker - Chat System
 */

// Connect to Socket.io server
const socket = io('https://isha-intelligent-space-hazard-analysis-1cl2.onrender.com');

// DOM Elements
const chatContainer = document.getElementById('chat-container');
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatWindow = document.getElementById('chat-window');
const chatCloseBtn = document.getElementById('chat-close-btn');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');

// State
let isChatOpen = false;
const userId = 'user_' + Math.floor(Math.random() * 1000); // Simple random ID

// Event Listeners
chatToggleBtn.addEventListener('click', toggleChat);
chatCloseBtn.addEventListener('click', toggleChat);
chatSendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Socket Events
socket.on('connect', () => {
    // Only show if empty to avoid spam on reconnect
    if (chatMessages.children.length === 0) {
        addSystemMessage('🌍 Welcome to Global Space Comms…');
    }
});

socket.on('receive_message', (data) => {
    addMessageToUI(data);
});

// Listen for auto-alerts from the main app
window.addEventListener('asteroid-alert', (e) => {
    const { message, type } = e.detail;
    if (type === 'High') {
        addSystemMessage(`🔴 ${message}`);
    }
});

socket.on('disconnect', () => {
    addSystemMessage('Connection lost. Reconnecting...');
});

/**
 * Toggle chat window visibility
 */
function toggleChat() {
    isChatOpen = !isChatOpen;
    chatWindow.style.display = isChatOpen ? 'flex' : 'none';

    if (isChatOpen) {
        chatInput.focus();
        scrollToBottom();
    }
}

/**
 * Send message to server
 */
function sendMessage() {
    const text = chatInput.value.trim();

    if (text) {
        const messageData = {
            id: Date.now(),
            userId: userId,
            text: text,
            timestamp: new Date().toLocaleTimeString()
        };

        socket.emit('send_message', messageData);
        chatInput.value = '';
    }
}

/**
 * Add message bubble to UI
 */
function addMessageToUI(data) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message');

    // Determine message type
    if (data.userId === userId) {
        messageEl.classList.add('user');
    } else {
        messageEl.classList.add('other');
    }

    messageEl.textContent = data.text;

    chatMessages.appendChild(messageEl);
    scrollToBottom();
}

/**
 * Add system message to UI
 */
function addSystemMessage(text) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', 'system');
    messageEl.textContent = text;

    chatMessages.appendChild(messageEl);
    scrollToBottom();
}

/**
 * Scroll chat to bottom
 */
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
