import {Page,Locator} from '@playwright/test';


export class RegistrationForm {
    private readonly page:Page;

    //define the variables -> provate and readonly
    private readonly firstNameField:Locator;
    private readonly lastNameField:Locator;
    private readonly emailField:Locator;
    private readonly telephoneField:Locator;
    private readonly passwordField:Locator;
    private readonly passwordConfirmField:Locator;
    private readonly subscribeRadioBtn:Locator;
    private readonly policyCheckBox:Locator;
    private readonly continueButton:Locator;
    private readonly confirmationMsg:Locator;

    //constructor
    constructor(page:Page){
    this.page=page;

    this.firstNameField=this.page.locator('#input-firstname');   //CSS
    this.lastNameField=this.page.locator('#input-lastname');   //CSS 
    this.emailField=this.page.getByLabel('E-Mail');   //built-in locator
    this.telephoneField=this.page.locator('#input-telephone');   //CSS    
    this.passwordField=this.page.locator('#input-password');   //CSS
    this.passwordConfirmField=this.page.locator('#input-confirm');     //CSS   
    this.subscribeRadioBtn=this.page.getByLabel('Yes');   //built-in locator    
    this.policyCheckBox=this.page.getByRole('checkbox');   //built-in locator        
    this.continueButton=this.page.locator('input.btn.btn-primary');   //CSS
    this.confirmationMsg=this.page.locator('h1:has-text("Your Account Has Been Created!")');

    }


    // methods for every Locator
    async setFirstName(name:string):Promise<void>{
        await this.firstNameField.fill(name)
    }

    async setLastName(lname:string):Promise<void>{
        await this.lastNameField.fill(lname)
    }

    async setEmail(email:string):Promise<void>{
        await this.emailField.fill(email)
    }

    async setTelephone(phone:string){
        await this.telephoneField.fill(phone)
    }

    async setPassword(pw:string){
        await this.passwordField.fill(pw)
    }

    async setPasswordConfirmation(pw:string){
        await this.passwordConfirmField.fill(pw)
    }

    async selectSubscribeRadioBtn(){
        await this.subscribeRadioBtn.click()
    }

    async clickContinue(){
        await this.continueButton.click()
    }

     async selectPolicyCheck(){
        await this.policyCheckBox.click()
    }

    




}