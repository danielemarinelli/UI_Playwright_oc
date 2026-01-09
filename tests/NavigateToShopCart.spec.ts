/*
TC -> Search a product and display the Shopping Cart Page

steps:
a) navigate to the URL
b) enter a product name in the search field
c) click the search button
d) Verify if the product is displayed in the search result page
e) Add the product to cart and verify the success message
f) click on 'shopping cart' link 

*/


import {test,expect} from '@playwright/test';
import {ResultProductSearch} from '../pages/SearchResultsPage'
import {TestConfig} from '../test.config';
import {UI_HomePage} from '../pages/HomePage';
import {Products} from '../pages/ProductPage';
import {ShoppingCart} from '../pages/CartPage';

//define as global variables to istanciate the classes
let hp: UI_HomePage;
let config: TestConfig;
let searchResults: ResultProductSearch;
let p: Products;
let shcart: ShoppingCart;

//This hook runs before each test
test.beforeEach(async({page}) => {
    config = new TestConfig();
    await page.goto(config.appUrl); 
    //initialize Page Objects
    hp = new UI_HomePage(page)
    searchResults = new ResultProductSearch(page)
    p = new Products(page)
    shcart = new ShoppingCart(page)
})


//Optional cleanup after each test
test.afterEach(async({page}) => {
    await page.waitForTimeout(3000)
    //await page.close(); 

})


test('User searches a product without login and navigate to shopping cart @master @regression @sanity', async() =>{
    //step b)
    console.log("User navigated to cart page")
    let pName = config.productName; // fetching the product name from the config file
    await hp.enterProductName(pName);
    // step c)
    await hp.searchClick();

    //verify that the search results page is correctly displayed
    let isPageDisplayed: boolean = await searchResults.isSearchPageResultsExists()
    expect(isPageDisplayed).toBeTruthy();
    //step d)
    expect(await searchResults.isProductExist(pName)).toBeTruthy();

    // step e)
    await p.addTheProductToCart();
    expect(await p.isSuccessMessageTextDisplayed()).toBeTruthy();

    //step f)
    expect((await p.navigateToShoppingCart()).isVisibleCartHeader()).toBeTruthy;

})
