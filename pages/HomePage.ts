import {Page,Locator} from '@playwright/test';


export class UI_HomePage {

private readonly page:Page;    

//define the variables -> private and readonly
private readonly myAccountLink:Locator;
private readonly registerLink:Locator;
private readonly loginLink:Locator;    
private readonly searchField:Locator;
private readonly lentButton:Locator;

//constructor
constructor(page:Page){
    this.page=page;
    
    this.myAccountLink=this.page.locator('span:has-text("My Account")');  
    this.registerLink=this.page.getByText('Register');  
    this.loginLink=this.page.getByText('Login'); 
    this.searchField=this.page.getByPlaceholder('Search'); 
    this.lentButton=this.page.locator("//i[@class='fa fa-search']"); 
}

//action methods for every element

    //check if home page exists
    async doesHomePageExist():Promise<boolean>{
        let title:string= await this.page.title();
        if(title){ return true}
        return false
    }

    // click "MyAccount" link
    async myAccountClick(){
    try {
        await this.myAccountLink.click()
    } catch (error) {
        console.log(`Exception occurred while clicking 'myAccount': ${error}` )
        throw error
    
        }
    }

    // click "Register" link
    async registerClick(){
    try {
        await this.registerLink.click()
    } catch (error) {
        console.log(`Exception occurred while clicking 'Register': ${error}` )
        throw error
        }
    }


    // click "Login" link
    async loginClick(){
    try {
        await this.loginLink.click()
    } catch (error) {
        console.log(`Exception occurred while clicking 'Login': ${error}` )
        throw error
        }
    }

    // Enter product name in the search box
    async enterProductName(pName:string){
    try {
        await this.searchField.fill(pName)
    } catch (error) {
        console.log(`Exception occurred while filling the search field: ${error}` )
        throw error
        }
    }


      // click on search button
    async searchClick(){
    try {
        await this.lentButton.click()
    } catch (error) {
        console.log(`Exception occurred while clicking on 'search': ${error}` )
        throw error
        }
    }


}