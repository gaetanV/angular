class ItemFactory {

    shoe = class extends itemClass {
        constructor() {
            super();
            this.name = "shoe";
            this.price = 105;

        }
    }

    cap = class extends itemClass {
        constructor() {
            super();
            this.name = "cap";
            this.price = 25;

        }
    }

    shirt = class extends itemClass {
        constructor() {
            super();
            this.name = "shirt";
            this.price = 50;

        }
    }

    constructor() {}

};

angular.module('app.factory').service('ItemFactory', ItemFactory);