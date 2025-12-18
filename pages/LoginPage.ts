import {Page,Locator} from '@playwright/test';


    export class Login {

    private readonly page:Page; 
    private readonly emailField:Locator;
    private readonly passwordField:Locator;
    private readonly loginBtn:Locator;
    private readonly infoDisplayed:Locator;    
    private readonly errorMsg:Locator;

    //constructor
    constructor(page:Page){
    this.page=page;
    this.emailField=this.page.getByPlaceholder('E-Mail Address');
    this.passwordField=this.page.getByPlaceholder('Password');    
    this.loginBtn=this.page.locator('input.btn.btn-primary')
    this.infoDisplayed=this.page.locator('h2:has-text("Returning Customer")')
    this.errorMsg=this.page.locator('div.alert.alert-danger.alert-dismissible');
    }

    async correctLoginPage():Promise<string>{
        return await this.infoDisplayed.textContent() ?? '';

    }


     async insertEmail(email:string):Promise<void>{
        await this.emailField.fill(email)
    }

    async insertPassword(pw:string):Promise<void>{
        await this.passwordField.fill(pw)
    }

    async clickLoginBtn(){
        await this.loginBtn.click()
    }


    //login in one single method:
    async performLogin(email:string,pwd:string){
        await this.insertEmail(email);
        await this.insertPassword(pwd);
        await this.clickLoginBtn();
    }

    async getLoginErrorMsg(): Promise<string | null>{
        return (this.errorMsg.textContent() ?? '')
    }
    


}