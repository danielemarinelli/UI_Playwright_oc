import {Page,Locator} from '@playwright/test';


export class Products {

private readonly page:Page;    

//define the variables -> private and readonly

private readonly AddToCartButton:Locator;
private readonly successPartialMessage:Locator;
private readonly cartLink:Locator;

//constructor
constructor(page:Page){
    this.page=page;
    
    this.AddToCartButton=this.page.locator("body > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(8) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1) > span:nth-child(2)")
    this.successPartialMessage=this.page.locator('a:has-text("shopping cart")')
    this.cartLink=this.page.locator('a:has-text("shopping cart")')
}

//action methods for every element

    //check if home page exists
    async doesHomePageExist():Promise<boolean>{
        let title:string= await this.page.title();
        if(title){ return true}
        return false
    }


    // click on the ADD TO CART button of the product wanted
    async addTheProductToCart(){
        try {
        await this.AddToCartButton.click()
    } catch (error) {
        console.log(`Exception occurred while clicking on 'Add To Cart': ${error}` )
        throw error;
        }
    }

        //verify if message text displayed after add to cart
        //return boolean -> TRUE if the message contains ' Success: You have added'
        async isSuccessMessageTextDisplayed(): Promise<boolean>{
            try{
                const successMessageText = await this.successPartialMessage.textContent();
                console.log(successMessageText);
                return successMessageText?.includes('Shopping Cart') ?? false;   //return true or false if the test is not present
            } catch (error){
                return false;}
        }


        // click on 'shopping cart' link to display the cart page
         async navigateToShoppingCart(){//: Promise<CartPage>{
              try {
                await this.cartLink.click();
                //return new CartPage(this.page);
              } catch (error) {
                console.log(`Exception occurred while clicking on 'shopping cart' link: ${error}` )
                throw error;
                }
            }

}