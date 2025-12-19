import {test,expect} from '@playwright/test';
import {UI_HomePage} from '../pages/HomePage';
import {TestConfig} from '../test.config';
import {DataProvider} from '../utils/dataProvider';
import {Login} from '../pages/LoginPage';
import {MyAccount} from '../pages/MyAccountPage';


// Load JSON test data from logindata.json file
const jsonPath:string = "dataset/logindata.json";
const jsonTestData:any = DataProvider.getDataFromJSON(jsonPath);

for(const data of jsonTestData){
    test(`Login Test with JSON Data: ${data.testName} @datadriven`, async({page}) =>{
            const config = new TestConfig();
            await page.goto(config.appUrl);
            const hp = new UI_HomePage(page)
            await hp.myAccountClick();
            await hp.loginClick()

            const login = new Login(page)
            await login.performLogin(data.email,data.password)

            //validation
            if(data.expected.toLowerCase()==='success'){
                    const myA = new MyAccount(page);
                    const label:string=await myA.getOrdersLabel();
                    expect(label).toContain('My Orders')
            }
            else{
                    let errorMsg=await login.getLoginErrorMsg();
                    expect(errorMsg).toBe('Warning: No match for E-Mail Address and/or Password.')
            }

    })
    
}


