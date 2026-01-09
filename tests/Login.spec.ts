/*
TC -> Login with valid credentials

steps:
a) navigate to the URL
b) Navigate to login page from home page
c) Enter valid credentials and login
d) Verify successful login by checking 'My Account' page

*/


import {test,expect} from '@playwright/test';
import {MyAccount} from '../pages/MyAccountPage'
import {Login} from '../pages/LoginPage'
import {TestConfig} from '../test.config';
import {UI_HomePage} from '../pages/HomePage';

//define as global variables to istanciate the classes
let hp: UI_HomePage;
let config: TestConfig;
let login: Login;
let myAccount: MyAccount;


//This hook runs before each test
test.beforeEach(async({page}) => {
    config = new TestConfig();
    await page.goto(config.appUrl); 
    //initialize Page Objects
    hp = new UI_HomePage(page)
    login = new Login(page)
    myAccount = new MyAccount(page)
})


//Optional cleanup after each test
test.afterEach(async({page}) => {
    await page.waitForTimeout(3000)
    await page.close(); 

})


test('User logs with valid credentials @master @regression @sanity @login', async() =>{
    console.log("User logs with valid credentials")
    //step b)
    await hp.myAccountClick();
    await hp.loginClick();
    //step c) 
    await login.performLogin(config.email,config.password);
    // alternativelly 3 methods we can perform instead of one

    // step d)
    let label=await myAccount.getOrdersLabel();
    expect(label).toContain('My Orders');


})


test('User inserts invalid credentials @master @regression @sanity @login', async() =>{
    console.log("User inserts invalid credentials")
    //step b)
    await hp.myAccountClick();
    await hp.loginClick();
    //step c) 
    await login.insertEmail(config.bademail);
    await login.insertPassword(config.badpassword);
    await login.clickLoginBtn();

    let error = await login.getLoginErrorMsg();
    expect(error).toBe('Warning: No match for E-Mail Address and/or Password.');


})
