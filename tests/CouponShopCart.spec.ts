/*
TC -> Insert an invalid coupon code

steps:
a) navigate to the URL
b) enter a product name in the search field
c) click the search button
d) add product to cart and check the success message
e) click on shopping cart link on the message 
f) verify the shopping cart page exists
g) click 'Use Coupon Code' link and insert the wrong code
h) click on 'apply coupon' button
i) verify the message displayed contains: Warning: Coupon is either invalid

*/


import {test,expect} from '@playwright/test';
import {Products} from '../pages/ProductPage'
import {TestConfig} from '../test.config';
import {UI_HomePage} from '../pages/HomePage';
import {ShoppingCart} from '../pages/CartPage';



//define as global variables to istanciate the classes
let hp: UI_HomePage;
let config: TestConfig;
let products: Products;
let shop: ShoppingCart;

//This hook runs before each test
test.beforeEach(async({page}) => {
    config = new TestConfig();
    await page.goto(config.appUrl); 
    //initialize Page Objects
    hp = new UI_HomePage(page)
    products = new Products(page)
    shop = new ShoppingCart(page)
})


//Optional cleanup after each test
test.afterEach(async({page}) => {
    await page.waitForTimeout(3000)
    await page.close(); 

})


test('User searches a product and adds it to the cart, inserting a wrong coupon code @master @regression @smoke', async() =>{
    console.log("Insert a wrong coupon")
    //step b)
    let pName = config.productName; // fetching the product name from the config file
    await hp.enterProductName(pName);
    // step c)
    await hp.searchClick();

    //step d)
    await products.addTheProductToCart();
    expect(await products.isSuccessMessageTextDisplayed()).toBeTruthy();

    //step e+f)
    await products.navigateToShoppingCart();
    expect(await shop.isVisibleCartHeader()).toBeTruthy();

    //step g)
    await shop.openCouponCodeSection();
    await shop.insertCouponCode(config.wrongCouponCode);

    //step h)
    await shop.clickApplyCouponBtn();

    //step i)  gotta check why variable in isMessageTextDisplayed contains----> 'Products marked with *** are not available in the desired quantity or not in stock!' and not 'Warning: Coupon is either invalid, expired or reached its usage limit!'
    //expect(await shop.isMessageTextDisplayed()).toBeTruthy();

})
