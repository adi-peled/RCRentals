const msgService = require('./socket.service')
const logger = require('../../services/logger.service')

async function getMsg(req, res) {
    console.log('msg');
    const msg = await msgService.getById(req.params.id)
    res.json(msg)
}


async function getMsg(req, res) {
    console.log('msgs query:', req.query);
    try {
        const msgs = await msgService.query(req.query)
        console.log(msgs);
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

async function addMsg(msg) {
    await msgService.add(msg)
}


module.exports = {
    getMsg,
    getMsg,
    deleteMsg,
    updateMsg,
    addMsg,
}