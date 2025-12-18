import {Page,Locator} from '@playwright/test';
import { log } from 'node:console';
import { UI_HomePage } from './HomePage';


    export class Logout {

        private readonly page:Page;
        private readonly continueBtn:Locator;
        private readonly accountLogoutMsg:Locator;

        constructor(page:Page){
        this.continueBtn=this.page.getByText('Continue');
        this.accountLogoutMsg=this.page.getByRole('heading', { name: 'Account Logout' });
        }

        //return istance of UI_HomePage
        async performLogout(): Promise<UI_HomePage>{
            this.continueBtn.click();
            return new UI_HomePage(this.page)
        }

        //returns true is Msg is displayed
        async isVisibleAccountLogoutMsg(): Promise<boolean>{
            return await this.accountLogoutMsg.isVisible()
        }

}