const { getMsg, getMsgs, deleteMsg, updateMsg, addMsg } = require('./socket.controller')
const dbService = require('../../services/db.service')
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('getHistory', async() => {
            const collection = await dbService.getCollection('messages')
            const msgs = await collection.find().toArray();
            socket.emit('gotChatHistory', msgs)
        })
        socket.on('chat message', msg => {
            io.emit('chat recivedMsg', msg);
            addMsg(msg)
            console.log('message: ' + msg.txt);

        })
        socket.on('chat topic', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
    })
}