/*
TC -> Search a product

steps:
a) navigate to the URL
b) enter a product name in the search field
c) click the search button
d) Verify if the product is displayed in the search result page

*/


import {test,expect} from '@playwright/test';
import {ResultProductSearch} from '../pages/SearchResultsPage'
import {TestConfig} from '../test.config';
import {UI_HomePage} from '../pages/HomePage';

//define as global variables to istanciate the classes
let hp: UI_HomePage;
let config: TestConfig;
let searchResults: ResultProductSearch;


//This hook runs before each test
test.beforeEach(async({page}) => {
    config = new TestConfig();
    await page.goto(config.appUrl); 
    //initialize Page Objects
    hp = new UI_HomePage(page)
    searchResults = new ResultProductSearch(page)
    
})


//Optional cleanup after each test
test.afterEach(async({page}) => {
    //await page.waitForTimeout(3000)
    await page.close(); 

})


test('User searches a product without login in the account @master @regression @sanity', async() =>{
    //step b)
    let pName = config.productName; // fetching the product name from the config file
    await hp.enterProductName(pName);
    // step c)
    await hp.searchClick();

    //verify that the search results page is correctly displayed
    let isPageDisplayed: boolean = await searchResults.isSearchPageResultsExists()
    expect(isPageDisplayed).toBeTruthy();
    //step d)
    expect(await searchResults.isProductExist(pName)).toBeTruthy();


})
