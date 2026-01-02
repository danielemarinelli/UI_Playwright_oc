import {Page,Locator} from '@playwright/test';
import {Logout} from './LogoutPage'

    export class MyAccount {

    private readonly page:Page; 
    private readonly editAccountButton:Locator;
    private readonly myOrdersDisplayed:Locator;
    private readonly logoutBtn:Locator;

    //constructor
    constructor(page:Page){
    this.page=page;

    this.myOrdersDisplayed=this.page.locator(':text("My Orders")');
    this.logoutBtn=this.page.locator('a').filter({ hasText: 'Logout' }).last()
    this.editAccountButton=this.page.getByText('Edit Account');
    }


    //methods
    async getOrdersLabel(): Promise<string>{
        return (await this.myOrdersDisplayed.textContent() ?? '')
    }


    async performLogOut(): Promise<Logout>{
        try {
        await this.logoutBtn.click();
        return new Logout(this.page)
        } catch (error){
            console.log(`Exception occurred when clicking logout link: ${error}`)
            throw error;
        }
    }


    async editAccount(): Promise<string>{
        return (await this.editAccountButton.textContent() ?? '')
    }

}