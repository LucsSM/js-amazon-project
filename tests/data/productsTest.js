import {loadProductsFetch, getProduct, Product, Clothing, Appliance} from "../../data/products.js";

describe('TEST SUITE - getProduct', () => {

    beforeAll(async () => {
            await loadProductsFetch();
        });
    
    it('gets a product from the cart', () => {
        let product = getProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        
        expect(product).toEqual(jasmine.objectContaining({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: [
                "socks",
                "sports",
                "apparel"
            ]
        }))
    });
});

describe('TEST SUITE - Product class', () => {
    let product;

    beforeEach(() => {
        product = new Product({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c9",
            image: "images/products/smtv-vengence-cover.jpg",
            name: "Shin Megami Tensei V - Vengence",
            rating: {
            stars: 5,
            count: 10
            },
            priceCents: 4590,
            keywords: [
            "games",
            "rpg",
            "playstation 5"
            ]
        });
    });

    it('Create a Product Class object', () => { 
        let productInstance = product instanceof Product; 
    
        expect(productInstance).toEqual(true);
        expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c9");
        expect(product.image).toEqual("images/products/smtv-vengence-cover.jpg");
        expect(product.name).toEqual("Shin Megami Tensei V - Vengence");
    });

    it('get the stars rating', () => {
        expect(product.getStarsUrl()).toContain(50);
    });

    it('get the product price', () => {
        expect(product.getPriceUrl()).toContain('$45.90');
    });

    it('return an empty string when checking for extra info', () => {
        expect(product.extraInfoHTML()).toEqual('');
    });
})
    
describe('TEST SUITE - Clothing class', () => {
    let clothing;

    beforeEach(() => {
        clothing = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
            stars: 4.5,
            count: 56
            },
            priceCents: 799,
            keywords: [
            "tshirts",
            "apparel",
            "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        });
    });
    
    it('Create a Colthing Class object', () => {
        let clothingInstance = clothing instanceof Clothing; 
    
        expect(clothingInstance).toEqual(true);
        expect(clothing.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(clothing.image).toEqual("images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg");
        expect(clothing.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
    });

    it('get the stars rating', () => {
        expect(clothing.getStarsUrl()).toContain(45);
    });

    it('get the product price', () => {
        expect(clothing.getPriceUrl()).toContain('$7.99');
    });

    it('return an empty string when checking for extra info', () => {
        expect(clothing.extraInfoHTML()).toContain(clothing.sizeChartLink);
    });
})

describe('TEST SUITE - Appliance Class', () => {
    let appliance;

    beforeEach(() => {
        appliance = new Appliance({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
            stars: 5,
            count: 2197
            },
            priceCents: 1899,
            keywords: [
            "toaster",
            "kitchen",
            "appliances"
            ],
            type: "appliance",
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png"
        });
    })
    
    it('Creates a Appliance Class object', () => {
        let applianceInstance = appliance instanceof Appliance; 

        expect(applianceInstance).toEqual(true);
        expect(appliance.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
        expect(appliance.image).toEqual("images/products/black-2-slot-toaster.jpg");
        expect(appliance.name).toEqual("2 Slot Toaster - Black");
    });

    it('get the stars rating', () => {
        expect(appliance.getStarsUrl()).toContain(50);
    });

    it('get the product price', () => {
        expect(appliance.getPriceUrl()).toContain('$18.99');
    });

    it('return an empty string when checking for extra info', () => {
        expect(appliance.extraInfoHTML()).toContain(appliance.instructionsLink);
    });
})
