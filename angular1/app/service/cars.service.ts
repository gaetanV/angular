interface car {
    mark:String;
    id:number;
}
        
class CarsService {
    
    constructor() {}
    
    getCars() : Promise<Array<car>> {
        return new Promise(function(resolve, reject){
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

angular.module('app.rest').service('CarsService', CarsService);
