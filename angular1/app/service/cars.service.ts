@Service({
   module: 'service-rest',
   provider: [],
})
class CarsService {

    constructor() {}

    getCars(): Promise<Array<car>> {
        return new Promise(function (resolve:(cars: Array<car>) => void ) {
            resolve([
                {mark: 'Volvo', id: 1},
                {mark: 'Saab', id: 2},
                {mark: 'Mercedes', id: 3},
                {mark: 'Audi', id: 4},
                {mark: 'Laguna', id: 5},
                {mark: 'Opel', id: 6},
                {mark: 'Ford', id: 7},
                {mark: 'Peugeot', id: 8},
            ]);
        })
    }

};
