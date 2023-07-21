import http from "http";
import WebSocket from "ws";

const PORT = 5501

const server = http.createServer()
const wss = new WebSocket.Server({ server })

try {
    wss.on("connection", ws => {
        ws.on('message', (data: string) => {
            const parsedData = JSON.parse(data)
            
            console.log(`on message`, parsedData)
            
            wss.clients
                .forEach(client => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        
                        client.send(JSON.stringify(parsedData))
                    }
                })

        })
    })

} catch (err) {
    console.error(err)
}

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}: http://localhost:${PORT}`)
})