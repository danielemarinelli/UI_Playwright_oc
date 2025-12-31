/*
TC -> Login with valid credentials and click to logout button

steps:
a) navigate to the URL
b) Navigate to login page from home page
c) Enter valid credentials and login
d) Verify MyAccount page displayed by checking edit account label
e) Verify successful logout page by clicking click logout button
 

*/


import {test,expect} from '@playwright/test';
import {MyAccount} from '../pages/MyAccountPage'
import {Login} from '../pages/LoginPage'
import {Logout} from '../pages/LogoutPage'
import {TestConfig} from '../test.config';
import {UI_HomePage} from '../pages/HomePage';

//define as global variables to istanciate the classes
let hp: UI_HomePage;
let config: TestConfig;
let login: Login;
let myAccount: MyAccount;
let logout: Logout;


//This hook runs before each test 
test.beforeEach(async({page}) => {
    config = new TestConfig();
    await page.goto(config.appUrl); 
    //initialize Page Objects
    hp = new UI_HomePage(page)
    login = new Login(page)
    myAccount = new MyAccount(page)
    logout = new Logout(page)
})


//Optional cleanup after each test
test.afterEach(async({page}) => {
    await page.waitForTimeout(3000)
    await page.close(); 

})


test('User performs a logout @master @regression @sanity @logout', async() =>{
    //step b)
    await hp.myAccountClick();
    await hp.loginClick();
    //step c) 
    await login.performLogin(config.email,config.password);
    
    // step d)
    let label=await myAccount.editAccount();
    expect(label).toContain('Edit Account');

    // step e)
    await myAccount.performLogOut();
    await logout.backToHomePage();
    let flag = await logout.isVisibleAccountLogoutMsg();
    expect(flag).toBeTruthy;
})
