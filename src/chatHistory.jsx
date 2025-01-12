import React from "react";
import "../src/styles/ChatHistory.css"

function ChatHistory(){
let chatCounter = 0;
let activeChatId = null; 
const chats = {}; 


function createNewChat() {
chatCounter++;
const chatList = document.getElementById('chatList');


const newChat = document.createElement('div');
newChat.classList.add('chatItem');
newChat.textContent = `Chat ${chatCounter}`;
newChat.dataset.chatId = chatCounter; 
newChat.onclick = () => openChat(parseInt(newChat.dataset.chatId)); 

chatList.appendChild(newChat);

chats[chatCounter] = {
title: `Chat ${chatCounter}`,
messages: [],
};

openChat(chatCounter);
}


function openChat(chatId) {
activeChatId = chatId; 
const chat = chats[chatId]; 
if (!chat) return;


const chatTitle = document.getElementById('chatTitle');
chatTitle.textContent = chat.title;


const chatContent = document.getElementById('chatContent');
chatContent.innerHTML = ''; 

chat.messages.forEach((message) => {
const messageElement = document.createElement('p');
messageElement.textContent = message;
chatContent.appendChild(messageElement);
});
}


function sendMessage() {
const input = document.getElementById('messageInput');
const message = input.value.trim();

if (!message || !activeChatId) return; 

chats[activeChatId].messages.push(message);

const chatContent = document.getElementById('chatContent');
const messageElement = document.createElement('p');
messageElement.textContent = message;
chatContent.appendChild(messageElement);

input.value = '';
}
    return(
        <div class="chatHistory">
            <div class="Heading">
            <h1>Previous Conversations</h1>
            <button class="newChatButton" onClick={createNewChat}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-dotted" viewBox="0 0 16 16">
                <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
            </svg>
        </button>
        
        </div>
        <div class="chatList" id="chatList"></div>
        </div>
    );
}

export default ChatHistory;
