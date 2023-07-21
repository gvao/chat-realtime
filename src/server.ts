import express from "express";
import http from "http";
import WebSocket from "ws";

import path from "path";
import fs from 'fs'

export const PORT = 3333

const app = express()

const publicPath = path.join(__dirname, 'public')

app.get('/', (req, res) => {
    const filePath = path.join(publicPath, "index.html")
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500)
            res.end("erro ao carregar o arquivo")
        } else {
            res.writeHead(200, { "Contente-Type": "text/html" })
            res.end(data)
        }
    })
    
})

app.use(express.static(publicPath))

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

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

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}: http://localhost:${PORT}`)
})
