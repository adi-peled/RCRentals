const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

// async function query(filterBy) {
//     const criteria = _buildCriteria(filterBy)
//     const collection = await dbService.getCollection('car')
//     try {
//         const cars = await collection.find(criteria).toArray();
//         return cars
//     } catch (err) {
//         console.log('ERROR: cannot find cars')
//         throw err;
//     }
// }



async function query(filterBy = {}) {
    console.log('filter:', filterBy);

    const criteria = _buildCriteria(filterBy)
    // var prop = (filterBy.sort === 'price') ? 'price' : 'name';
    // var order = (filterBy.order === 'desc') ? -1 : 1;
    // var sortBy = {[prop]: order}

    console.log('critrea', criteria);
    const collection = await dbService.getCollection('car')
    try {
        const cars = await collection.find(criteria).toArray();
        return cars
    } catch (err) {
        console.log('ERROR: cannot find cars')
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {
    };
    if (filterBy.price) {
        criteria.price = [{ price: { $lt: filterBy.price.high } }, { price: { $gt: filterBy.price.low } }]
    }
    if (filterBy.model) {
        criteria.model = [{ model: { $lt: filterBy.model.old } }, { model: { $gt: filterBy.model.new } }]
    }
    if (filterBy.tag) {
        criteria.tags = filterBy.tag
        // db.getCollection('car').find({'tags': 'sport'})
    }

    // db.getCollection('car').find({$and:[{$and: [{price: {$lt : 12342412}},{price: {$gt:444}}]},{$and: [{model: {$lt : 2021}},{model: {$gt:2011}}]}]})

    // if (filterBy.type) {
    //     var filterType = new RegExp(filterBy.type, 'i');
    //     criteria.type = { $regex: filterName }
    // }
    // // if (filterBy.name) criteria.name = {'$regex': `.*${filterBy.name}.*\i`}
    // if (filterBy.type !== 'all') criteria.type = filterBy.type
    // if (filterBy.inStock !== 'all') {
    //     criteria.inStock = (filterBy.inStock === 'inStock') ? true : false
    // }
    return criteria;
}






// function _filterBy(cars, filterBy) {
//     console.log('fil:', filterBy);
//     var filteredCars = cars
//     if (filterBy.location) filteredCars = filteredCars.filter(car => car.location.city === filterBy.location)
//     if (filterBy.price === 'asc') {
//         filteredCars = filteredCars.sort((a, b) => (a.price > b.price) ? 1 : -1)
//     } else if (filterBy.price === 'desc') {
//         filteredCars = filteredCars.sort((a, b) => (a.price < b.price) ? 1 : -1)
//     }
//     if (filterBy.model === 'asc') {
//         filteredCars = filteredCars.sort((a, b) => (a.model > b.model) ? 1 : -1)
//     } else if (filterBy.model === 'desc') {
//         filteredCars = filteredCars.sort((a, b) => (a.model < b.model) ? 1 : -1)
//     }
//     console.log('cars:', filteredCars);
//     return filteredCars
// }


// if (filterBy.type_like) filteredToys = filteredToys.filter((toy) => toy.type === filterBy.type_like)
// if (filterBy.name_like) filteredToys = filteredToys.filter((toy) => toy.name.toLowerCase().includes(filterBy.name_like))
// if (filterBy._order === 'asc') {
//     filteredToys = filteredToys.sort((a, b) => (a.name > b.name) ? 1 : -1)
// } else if (filterBy._order === 'desc') {
//     filteredToys = filteredToys.sort((a, b) => (a.name < b.name) ? 1 : -1)
// }
async function getById(carId) {
    const collection = await dbService.getCollection('car')
    try {
        const car = await collection.findOne({ "_id": ObjectId(carId) })
        return car
    } catch (err) {
        console.log(`ERROR: while finding car ${carId}`)
        throw err;
    }
}

async function remove(carId) {
    const collection = await dbService.getCollection('car')
    try {
        await collection.deleteOne({ "_id": ObjectId(carId) })
    } catch (err) {
        console.log(`ERROR: cannot remove car ${carId}`)
        throw err;
    }
}

async function update(car) {
    const collection = await dbService.getCollection('car')
    car._id = ObjectId(car._id);

    try {
        await collection.replaceOne({ "_id": car._id }, { $set: car })
        return car
    } catch (err) {
        console.log(`ERROR: cannot update car ${car._id}`)
        throw err;
    }
}

async function add(car) {
    const collection = await dbService.getCollection('car')
    try {
        await collection.insertOne(car);
        return car;
    } catch (err) {
        console.log(`ERROR: cannot insert car`)
        throw err;
    }
}




