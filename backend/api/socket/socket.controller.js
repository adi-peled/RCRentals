const chatService = require('./socket.service')
const logger = require('../../services/logger.service')

async function getChat(req, res) {
    console.log(req.query);
    const chat = await chatService.getById(req.params.id)
    res.json(chat)
}

async function checkChat(chat) {


    const chats = await chatService.getChat(chat);



}

async function getMsg(req, res) {
    try {
        const msgs = await msgService.query(req.query)
        res.send(msgs)
    } catch (err) {
        throw err;
    }
}

async function deleteMsg(req, res) {
    await msgService.remove(req.params.id)
    res.end()
}

async function updateMsg(req, res) {
    const msg = req.body;
    await msgService.update(msg)
    res.json(msg)
}

async function addMsg(chat) {
    await chatService.add(chat)
}


module.exports = {
    getChat,
    getMsg,
    deleteMsg,
    updateMsg,
    addMsg,
    checkChat
}