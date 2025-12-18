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
import { faker } from '@faker-js/faker';


test('User registration validation', async({page}) =>{
    let config = new TestConfig();
    await page.goto(config.appUrl);   //step a

    let hp = new UI_HomePage(page)
    await hp.myAccountClick();       //step b
    await hp.registerClick();

    let reg = new RegistrationForm(page);     //step c
    await reg.setFirstName(RandomDataUtil.getFirstName());
    await reg.setLastName(RandomDataUtil.getLastName());
    await reg.setEmail(RandomDataUtil.getEmail());
    await reg.setTelephone(RandomDataUtil.getPhoneNumber());
    let pwd = RandomDataUtil.getPassword();  //store the generated pwd and the I can use (the same pwd) it in two different fields
    await reg.setPassword(pwd);
    await reg.setPasswordConfirmation(pwd);
    await reg.selectPolicyCheck();    //step d
    await reg.selectSubscribeRadioBtn();
    //await reg.clickContinue();

    //validate the confirmation message

    // const confirmation = await reg.getConfirmationMsg();
    // except(confirmation).toContain('Your Account Has Been Created!')

    await page.waitForTimeout(3000)

})
