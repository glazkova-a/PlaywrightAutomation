const {test, expect} = require('@playwright/test');

class CartPage{

    constructor (page)
    {
        this.page = page;
        this.showProduct = page.locator("div li").first();
        //this.currentProduct = page.locator("h3:has-text('zara coat 3')");
        this.checkout = page.locator("text=Checkout");
    }



   async  currentProductAssertion(productName)
    {
        await this.showProduct.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }
    
    async getProductLocator (productName)
    {
        return this.page.locator("h3:has-text('"+productName+"')");
    }


    async clickCheckout()
    {
       await this.checkout.click();
    }


   




}
module.exports = {CartPage};