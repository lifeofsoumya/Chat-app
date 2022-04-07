const socket = io()

let namE;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let sendBtn = document.querySelector('#send-icon');

do {
    namE = prompt('Enter your Name: ')
} while(!namE);

textarea.addEventListener('keyup', (e)=>{
    if(e.key=== 'Enter' && textarea.value != ''){
        sendMessage(e.target.value) // function to send message with enter
    }
})

sendBtn.addEventListener('click',()=>{
    if (textarea.value != ''){
        sendMessage(textarea.value) // function to send message with send icon
    }
})

function sendMessage(message){
    let msg = {
        user: namE,
        message: message.trim()
    }
    
    // Append
    appendMessage(msg, 'outgoing')
    textarea.value = ''; //emptying the message typing section after sending a message
    scrollToBottom()

    // sending to server
    socket.emit('message', msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv);
}

// Receive messages

socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

// bottom scrolling after sending a message

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}