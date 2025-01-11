let chatCounter = 0; // Counter for chat IDs
let activeChatId = null; // ID of the currently active chat
const chats = {}; // Store chat data dynamically

// Function to create a new chat
function createNewChat() {
    chatCounter++;
    const chatList = document.getElementById('chatList');

    // Create a new chat item
    const newChat = document.createElement('div');
    newChat.classList.add('chatItem');
    newChat.textContent = `Chat ${chatCounter}`;
    newChat.dataset.chatId = chatCounter; // Store chat ID
    newChat.onclick = () => openChat(parseInt(newChat.dataset.chatId)); // Attach click handler

    // Append to chat list
    chatList.appendChild(newChat);

    // Initialize chat data
    chats[chatCounter] = {
    title: `Chat ${chatCounter}`,
    messages: [],
    };

    // Automatically open the new chat
    openChat(chatCounter);
}

// Function to open a specific chat
function openChat(chatId) {
    activeChatId = chatId; // Set active chat ID
    const chat = chats[chatId]; // Get chat data
    if (!chat) return;

    // Update chat title
    const chatTitle = document.getElementById('chatTitle');
    chatTitle.textContent = chat.title;

    // Update chat content
    const chatContent = document.getElementById('chatContent');
    chatContent.innerHTML = ''; // Clear previous messages

    chat.messages.forEach((message) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatContent.appendChild(messageElement);
    });
}

// Function to send a message in the active chat
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (!message || !activeChatId) return; // Don't send empty messages or if no chat is active

    // Add message to the active chat's messages
    chats[activeChatId].messages.push(message);

    // Update chat content
    const chatContent = document.getElementById('chatContent');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatContent.appendChild(messageElement);

    // Clear input field
    input.value = '';
}