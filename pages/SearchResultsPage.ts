import {Page,Locator} from '@playwright/test';


    export class ResultProductSearch {

        private readonly page:Page;
        private readonly searchHeader:Locator;
        private readonly allProductsDisplayed:Locator;
        

        constructor(page:Page){
        this.page = page;
        this.searchHeader=this.page.locator("div[id='content'] h1");
        this.allProductsDisplayed=this.page.locator('h4> a'); 
        }

        

        //verify if search results page exists by checking the header text
        //return boolean -> TRUE if the search results page exists
        async isSearchPageResultsExists(): Promise<boolean>{
            try{
                const headerText = await this.searchHeader.textContent();
                return headerText?.includes('Search -') ?? false;   //return true or false if the test is not present
            } catch (error){
                return false;}
        }
    
    //check if product exists in the results by its name
    // one argument --> product name to search 
    // returns boolean --> TRUE if the product exists

    async isProductExist(productNameToFind: string):Promise<boolean>{
        try{
            let count = await this.allProductsDisplayed.count();
            for(let i=0;i<count;i++){
                const product = this.allProductsDisplayed.nth(i);
                const nameProdFromListDisplayed = await product.textContent();
                if (nameProdFromListDisplayed === productNameToFind)
                    return true;
            }
        }catch (error){
            console.log(`Exception occurred while check if product exists: ${error}`);
        }
        return false;
    }

    // Get count of product in search result and returns a number
    async getProductCount(): Promise<number>{
        return await this.allProductsDisplayed.count();
    }

       

}