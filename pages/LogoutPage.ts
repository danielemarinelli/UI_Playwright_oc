import {Page,Locator} from '@playwright/test';
import { log } from 'node:console';
import { UI_HomePage } from './HomePage';


    export class Logout {

        private readonly page:Page;
        private readonly continueBtn:Locator;
        private readonly accountLogoutMsg:Locator;
        private readonly secondLogoutMsg:Locator;

        constructor(page:Page){
        this.page = page;
        this.continueBtn=this.page.locator('a:has-text("Continue")');
        this.accountLogoutMsg=this.page.getByRole('heading', { name: 'Account Logout' });
        this.secondLogoutMsg=this.page.locator('#content').locator('p').nth(0)
        }

        //return istance of UI_HomePage
        async backToHomePage(): Promise<UI_HomePage>{
            try {
            await this.continueBtn.click();
            return new UI_HomePage(this.page)
            } catch (error){
            console.log(`Exception occurred when clicking 'continue button': ${error}`)
            throw error;
        }
        }

        //returns true if Msg is displayed
        async isVisibleAccountLogoutMsg(): Promise<boolean>{
            return await this.accountLogoutMsg.isVisible()
        }

        async getSecondMsgWhenLogout(): Promise<string>{
        return (await this.secondLogoutMsg.textContent() ?? '')
    }

}