import {Page,Locator} from '@playwright/test';
import { UI_HomePage } from './HomePage';


export class ShoppingCart {

private readonly page:Page;    

//define the variables -> private and readonly
private readonly pageHeader:Locator;
private readonly useCouponCodeLink:Locator;
private readonly couponField:Locator;    
private readonly applyCouponBtn:Locator;
private readonly removeBtn:Locator;
private readonly wrongCouponMsg:Locator;
private readonly removeMsgDisplayed:Locator;
private readonly continueBtn:Locator;

//constructor
constructor(page:Page){
    this.page=page;
    
    this.pageHeader=this.page.locator("div[id='content'] h1")  
    this.useCouponCodeLink=this.page.getByText('Use Coupon Code')  
    this.couponField=this.page.locator('#input-coupon') 
    this.applyCouponBtn=this.page.locator("#button-coupon") 
    this.removeBtn=this.page.locator(".fa.fa-times-circle") 
    this.wrongCouponMsg=this.page.locator('div.alert.alert-danger.alert-dismissible')
    this.removeMsgDisplayed=this.page.locator('p').filter({ hasText: 'Your shopping cart is empty!' }).first()
    this.continueBtn=this.page.getByText('Continue')
}

    //action methods for every element  

    // click ApplyCoupon button 
    async clickApplyCouponBtn(){
    try {
        await this.applyCouponBtn.click()
        const messageText = await this.wrongCouponMsg.textContent();
        console.log(messageText);
    } catch (error) {
        console.log(`Exception occurred while clicking 'Apply Coupon': ${error}` )
        throw error
        }
    }

    // Enter product coupon code in the field (coupon will be retrive from the config file)
    async insertCouponCode(code:string){
    try {
        await this.couponField.fill(code)
    } catch (error) {
        console.log(`Exception occurred while filling the coupon field: ${error}` )
        throw error
        }
    }


      // click on USE COUPON CODE link 
    async openCouponCodeSection(){
    try {
        await this.useCouponCodeLink.click()
    } catch (error) {
        console.log(`Exception occurred while clicking on 'coupon code': ${error}` )
        throw error
        }
    }


    //returns true if Msg is displayed
        async isVisibleCartHeader(): Promise<boolean>{
            return await this.pageHeader.isVisible()
        }

        //verify if message text displayed after inserting wrong coupon code
        //return boolean -> TRUE if the message contains 'Warning: Coupon is either'
        async isMessageTextDisplayed(): Promise<boolean>{
            try{
                const messageText = await this.wrongCouponMsg.textContent();
                console.log(messageText);
                return messageText?.includes('Warning: Coupon is either') ?? false;   //return true or false if the test is not present
            } catch (error){
                return false;}
        }


        // click on the remove button to remove the product from the cart 
        async removeProductFromCart(){
        try {
            await this.removeBtn.click()
        } catch (error) {
            console.log(`Exception occurred while clicking on 'remove icon': ${error}` )
            throw error
            }
        }

        async getEmptyCartMessage(): Promise<string | null>{
            return this.removeMsgDisplayed.textContent();
        }

        //click on continue button to go back at homepage
        async clickContinueButtonToGoToHomePage(): Promise<UI_HomePage>{
                try {
                    await this.continueBtn.click();
                    return new UI_HomePage(this.page)
                } catch (error){
                    console.log(`Exception occurred when clicking 'continue button': ${error}`)
                    throw error;
                }
        }
        
        


}