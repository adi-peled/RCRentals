const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {

    const criteria = _buildCriteria(filterBy)

    console.log(criteria);
    const collection = await dbService.getCollection('messages')
    try {
        const msgs = await collection.find(criteria).toArray();
        console.log('msgsservc', msgs);
        return msgs
    } catch (err) {
        console.log('ERROR: cannot find msgs')
        throw err;
    }
}

function _buildCriteria(filterBy) {
    var criteria = {}
    if (filterBy.minPrice) {
        criteria =
            ({
                $and: [{
                        $and: [{ price: { $lt: Number(filterBy.maxPrice) } },
                            { price: { $gt: Number(filterBy.minPrice) } }
                        ]
                    },
                    {
                        $and: [{ model: { $lt: Number(filterBy.maxModel) } },
                            { model: { $gt: Number(filterBy.minModel) } }
                        ]
                    }
                ]
            })
    }
    if (filterBy.tag) {
        criteria.tags = filterBy.tag
    }

    return criteria;
}

async function getById(msgId) {
    const collection = await dbService.getCollection('msg')
    try {
        const msg = await collection.findOne({ "_id": ObjectId(msgId) })
        return msg
    } catch (err) {
        console.log(`ERROR: while finding msg ${msgId}`)
        throw err;
    }
}

async function remove(msgId) {
    const collection = await dbService.getCollection('msg')
    try {
        await collection.deleteOne({ "_id": ObjectId(msgId) })
    } catch (err) {
        console.log(`ERROR: cannot remove msg ${msgId}`)
        throw err;
    }
}

async function update(msg) {
    const collection = await dbService.getCollection('msg')
    msg._id = ObjectId(msg._id);

    try {
        await collection.replaceOne({ "_id": msg._id }, { $set: msg })
        return msg
    } catch (err) {
        console.log(`ERROR: cannot update msg ${msg._id}`)
        throw err;
    }
}

async function add(msg) {
    const collection = await dbService.getCollection('messages')
    try {
        await collection.insertOne(msg);
        return msg;
    } catch (err) {
        console.log(`ERROR: cannot insert msg`)
        throw err;
    }
}