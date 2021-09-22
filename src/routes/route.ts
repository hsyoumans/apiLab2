// require the express module
import express from "express";

interface specialPizza {
    pizzaType: string;
    price: number;
}

//interface feedback {
//    customerName: string;
//    feedback: string;
//    rating: string;
//}

// create a new Router object
const routes = express.Router();

//create a hard-coded list of specialty pizzas
const specialties: specialPizza[] = [
    {pizzaType: "Breakfast Pizza", price: 12.5},
    {pizzaType: "Barbecue Chicken Pizza", price: 15},
    {pizzaType: "Veggie Pizza", price: 11},
    {pizzaType: "Margherita Pizza", price: 12},
    {pizzaType: "Paleo Pizza", price: 15},
    {pizzaType: "Dessert Pizza", price: 10}
];

//const customerRatings: feedback[] = [];

//get endpoint at the root just returns a string (Read)
routes.get('/', (req, res) => {
    res.render('home');
});

routes.get('/specialties', (req, res) => {
    const pizza = req.query.pizzaType;
    const pizzaPrice = Number(req.query.price);
    res.render('specialty', {
        pizza, pizzaPrice: pizzaPrice.toFixed(2)
    });    
});

routes.get('/customerRatings', (req, res) => {
    res.render('customerReview');
});

routes.get('/customerRatingConfirm', (req, res) => {
    const name = req.query.name;
    const comment = req.query.comment;
    const rating = req.query.rating;
    res.render('reviewResult', {name, comment, rating});
});

routes.get('/pizzaBuilder', (req, res) => {
    const toppings = ["Pepperoni", "Sausage", "Ham", "Chicken",
    "Hamburger", "Steak", "Mushrooms", "Olives", "Bell Pepper", 
    "Jalepeno Pepper", "Banana Pepper", "Onions", "Black Olives",
    "Roasted Red Pepper", "Sun-Dried Tomato", "Fresh Mozzarella",
    "Feta Cheese", "Basil", "Arugala", "Pineapple", "Tomato Sauce",
    "White Sauce", "Barbecue Sauce", "Shredded Mozzarella", 
    "Parmesan Cheese"];

    res.render('pizzaBuilder', {toppings});
});

routes.post('/pizzaBuilder', (req, res) => {
    const size = req.body.size;
    let glutenFree = !!req.body.glutenFree;
    const instructions = req.body.instructions;
    let toppingNum: number = (req.body.toppingNum);
    let price: number;

    if (size === "Small") {
        price = 7 + toppingNum * .5;
    }
    else if (size === "Medium") {
        price = 10 + toppingNum;
    }
    else {
        price = 12 + toppingNum * 1.25;
    }

    if (glutenFree) {
        price += 2;
    }

    const freeDelivery = price >= 15;

    res.render('pizzaBuilderReview', {
        size, toppingNum, glutenFree, instructions, price: price.toFixed(2), freeDelivery
    });
});

export default routes;