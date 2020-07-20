import { carService } from '../services/car-service.js'

export const carStore = {
    state: {
        cars: []
    },
    getters: {
        cars(state) {
            return state.cars
        }
    },
    mutations: {
        setCars(state, { cars }) {
            state.cars = cars;
        },
        setCar(state, { car }) {
            state.currCar = car
        },
        removeCar(state, { id }) {
            const idx = state.cars.findIndex(car => car._id === id)
            state.cars.splice(idx, 1);
        },
        addCar(state, { savedCar }) {
            state.cars.push(savedCar)
        },
        updateCar(state, { savedCar }) {
            const idx = state.cars.findIndex(car => car._id === savedCar._id)
            state.cars.splice(idx, 1, savedCar)
        }
    },
    actions: {
        async loadCars({ commit }, { filterBy }) {
            console.log(filterBy);
            try {
                var cars = await carService.query(filterBy)
                commit({ type: 'setCars', cars })
                return cars
            } catch (err) {
                console.log(err);
            }
        },
        async removeCar({ commit }, { id }) {
            try {
                await carService.remove(id)
                commit({ type: 'removeCar', id })
            } catch (err) {
                console.log(err);
            }
        },
        async saveCar({ commit }, { car }) {
            const type = (car._id) ? 'updateCar' : 'addCar';
            const savedCar = await carService.saveCar(car)
            commit({ type, savedCar })
        },

    },




}