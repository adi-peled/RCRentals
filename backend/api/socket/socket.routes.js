const { checkChat, getMsgs, deleteMsg, updateMsg, addMsg } = require('./socket.controller')
const dbService = require('../../services/db.service')
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('get chat', chat => {
            console.log(chat);
            checkChat(chat)
        })
        socket.on('getHistory', async() => {
            const collection = await dbService.getCollection('chats')
            const chats = await collection.find().toArray();
            socket.emit('gotChatHistory', chats)
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