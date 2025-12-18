/*
Steps for registration:
a) navigate to URL
b) click 'My Account' and 'Register'
c) Fill all the fields
d) Agree to policy and submit the form
e) validate the confirmation message

*/

import {test,expect} from '@playwright/test';
import {UI_HomePage} from '../pages/HomePage';
import {RegistrationForm} from '../pages/Registration';
import{RandomDataUtil} from '../utils/randomDataGenerator';
import {TestConfig} from '../test.config';


//define as global variables to istanciate the classes
let hp: UI_HomePage;
let reg: RegistrationForm;
let config: TestConfig;
let pwd,email:string;

test.beforeEach(async({page}) => {
    config = new TestConfig();
    await page.goto(config.appUrl);   //step a
    hp = new UI_HomePage(page);
    reg = new RegistrationForm(page);

})

//optional hook
test.afterEach(async({page}) => {
  await page.waitForTimeout(3000)
  await page.close();

})


test('User registration validation @master @regression @sanity', async() =>{   //we don't need to pass fixture PAGE here, because it is on the hooks
    
    
    await hp.myAccountClick();       //step b
    await hp.registerClick();

         //step c
    await reg.setFirstName(RandomDataUtil.getFirstName());
    await reg.setLastName(RandomDataUtil.getLastName());
    email = RandomDataUtil.getEmail();
    await reg.setEmail(email);
    await reg.setTelephone(RandomDataUtil.getPhoneNumber());
    pwd = RandomDataUtil.getPassword();  //store the generated pwd and the I can use (the same pwd) it in two different fields
    await reg.setPassword(pwd);
    await reg.setPasswordConfirmation(pwd);
    await reg.selectPolicyCheck();    //step d
    await reg.selectSubscribeRadioBtn();
    await reg.clickContinue();

    //validate the confirmation message

     const confirmation = await reg.getConfirmationMsg();
     expect(confirmation).toContain('Your Account Has Been Created!')

})




