const ws = new WebSocket(`ws://localhost:3333`);

const chatDiv = document.getElementById('chat')!;
const messageInput = document.getElementById('message') as HTMLInputElement;
const form = document.getElementById('form')! as HTMLFormElement

console.log(`index.js`)

const insertMessageInToDom = (message: string): void => {

  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatDiv.appendChild(messageElement);
}

ws.onmessage = ({ data }) => {
  const parsedData = JSON.parse(data)

  insertMessageInToDom(parsedData.message)
};

function sendMessage(message: string) {
  const data = { message }
  
  insertMessageInToDom(data.message)
  ws.send(JSON.stringify(data));
}


form.addEventListener('submit', event => {
  event.preventDefault()
  const message = messageInput.value
  
  if(message.length < 0) return alert('Mensagem não pode ser vazio')
  
  sendMessage(messageInput.value)
  form.reset()
})