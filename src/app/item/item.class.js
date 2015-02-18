var shoe, shirt, cap;
(function() {
    'use strict';

    var item = function people() {
        this.type = "item";
        this.name = "undefined";
        this.price= "undefined";
    };

    shoe = function shoe() {
        item.call(this);
        this.name = "shoe";
        this.price=105;
    };
    shoe.prototype = Object.create(item.prototype);

    shirt = function shirt() {
        item.call(this);
        this.name = "shirt";
         this.price=50;
    };
    shirt.prototype = Object.create(item.prototype);

    cap = function cap() {
        item.call(this);
        this.name = "cap";
         this.price=25;
    };
    cap.prototype = Object.create(item.prototype);

})();