class Car {
    brand;
    model;
    speed = 0;
    isTrunkOpen = false;

    constructor (carDetails) {
        this.brand = carDetails.brand;
        this. model = carDetails.model;
    };

    displayInfo() {
        let trunkStatus = this.isTrunkOpen ? 'open' : 'closed';

        console.log(`${this.brand} ${this.model} - ${this.speed}km/h - ${trunkStatus}`);
    };

    go() {
        this.speed += 5;
        if(this.speed < 200) {
            this.speed += 0;
        }

        if(this.isTrunkOpen) {
            this.speed =+ 0;
        }
    };

    brake() {
        if(this.speed > 0) {
            this.speed -= 5;
        }
    };

    openTrunk() {
        if(this.speed === 0) {
            this.isTrunkOpen = true;
        }

    };

    closeTrunk() {
        this.isTrunkOpen = false;
    };
}

class RaceCar extends Car {
    acceleration;

    constructor(carDetails) {
        super(carDetails);
        this.isTrunkOpen = 'no Trunk';
        this.acceleration = carDetails.acceleration;
    }

    go() {
        this.speed += this.acceleration;
        if(this.speed < 300) {
            this.speed += 0;
        }

        if(this.isTrunkOpen) {
            this.speed =+ 0;
        }
    };

    displayInfo() {

        console.log(`${this.brand} ${this.model} - ${this.speed}km/h - ${this.acceleration} - ${this.isTrunkOpen}`);
    };

    openTrunk() {
        console.log('This car does not have a trunk.');
    };

    closeTrunk() {
        console.log('This car does not have a trunk.');
    };
}

const toytotaCar = new Car({
    brand: 'Toyota',
    model: 'Corolla'
});

const teslaCar = new Car({
    brand: 'Tesla',
    model :'Model 3'
});

const mcLarenCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
});

console.log(mcLarenCar);
mcLarenCar.displayInfo();
mcLarenCar.go();
mcLarenCar.displayInfo();
mcLarenCar.brake();
mcLarenCar.displayInfo();
mcLarenCar.closeTrunk();
mcLarenCar.displayInfo();
mcLarenCar.openTrunk();
mcLarenCar.go();
mcLarenCar.displayInfo();

// console.log(toytotaCar);
// console.log(teslaCar);

// toytotaCar.brake();
// toytotaCar.displayInfo();

// toytotaCar.openTrunk();
// toytotaCar.displayInfo();

// toytotaCar.closeTrunk();
// toytotaCar.displayInfo();

// toytotaCar.go();
// toytotaCar.go();
// toytotaCar.go();
// toytotaCar.openTrunk();
// toytotaCar.displayInfo();
// toytotaCar.go();
// toytotaCar.go();
// toytotaCar.go();
// toytotaCar.displayInfo();
// toytotaCar.brake();
// toytotaCar.displayInfo();

// teslaCar.brake();
// teslaCar.go();
// teslaCar.go();
// teslaCar.go();
// teslaCar.displayInfo();

