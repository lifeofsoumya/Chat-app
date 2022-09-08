const socket = io()

let namE;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let sendBtn = document.querySelector('#send-icon');

// for image handling

const realFileBtn = document.querySelector('#real-file')
const customFileBtn = document.querySelector('#custom-file')

customFileBtn.addEventListener("click", ()=>{
    realFileBtn.click();
})


// asking to enter name 

do {
    namE = prompt('Enter your Name: ')
} while(!namE);

textarea.addEventListener('keyup', (e)=>{
    if(e.target.value !== '' && e.key=== 'Enter'){
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
        message: message.trim() // .trim removes white spaces
    }
    
    // append
    appendMessage(msg, 'outgoing') // for frontend
    textarea.value = ''; //emptying the message typing section after sending a message
    scrollDown()

    // sending to server
    socket.emit('message', msg) // sends to the server for others
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('span')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv);
}

// user joined
function userJoined(msg, userUpdate){
    let joinDiv = document.createElement('div')
    let className = userUpdate
    joinDiv.classList.add(className)

    let userStatus = `
        <h4>${msg.user} Joined the Chat</h4>
    `
    joinDiv.innerHTML = userStatus
    messageArea.appendChild(userStatus);
}

// Receive messages

socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    scrollDown()
})


// bottom scrolling after sending a message

function scrollDown(){
    messageArea.scrollTop = messageArea.scrollHeight;
}