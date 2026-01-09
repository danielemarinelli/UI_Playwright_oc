/*
TC -> Select a product, go to cart page to remove it

steps:
a) navigate to the URL
b) enter a product name in the search field
c) click the search button
d) add product to cart 
e) click on shopping cart link on the message 
f) remove the product from the cart
g) check the correct message displayed
h) click continue button


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


test('User searches a product, adds it to the cart and removes it @ master @smoke @regression', async() =>{
    //step b)
    console.log("Remove test from cart")
    let pName = config.productName; // fetching the product name from the config file
    await hp.enterProductName(pName);
    // step c)
    await hp.searchClick();

    //step d)
    await products.addTheProductToCart();
    
    //step e)
    await products.navigateToShoppingCart();
    
    //step f)
    await shop.removeProductFromCart();

    //step g)
    let cartMesDisplayed = await shop.getEmptyCartMessage();
    expect(cartMesDisplayed).toBe("Your shopping cart is empty!");

    //step h)
    hp = await shop.clickContinueButtonToGoToHomePage()
    expect(await hp.doesHomePageExist()).toBeTruthy();
    

})
