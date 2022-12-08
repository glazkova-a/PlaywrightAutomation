const {expect} = require('@playwright/test');


class CheckoutPage {

    constructor (page)
    {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.optionsCount = this.dropdown.locator("button");
        this.dropdownDate = page.locator("select >> nth=0");
        
        this.dropdownMonth = page.locator("select >> nth=1");
        
        this.csv = page.locator ("input[type='text'] >> nth=1");
        this.name = page.locator ("input[type='text'] >> nth=2");
    
        this.submit = page.locator(".action__submit");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderConfirmationText = page.locator(".hero-primary");
    
    }
     
   async  selectCountry ()
    {
        await this.country.type("Can", {delay:100});
        await this.dropdown.waitFor();
        await this.optionsCount.count();
        for (let i =0; i,this.optionsCount;  ++i)
    {
        
        const text = await this.dropdown.locator("button").nth(i).textContent();
        if (text === " Canada")
        {
            await this.dropdown.locator("button").nth(i).click();
            break;
        }
    }
    }

    
    async fillInDropdown(selectDate, selectMonth)
    {
        
        await this.dropdownDate.selectOption({label: selectDate});
        await this.dropdownMonth.selectOption({label: selectMonth});
    }
    
    async fillInPersonalDataAndSubmit(csvCode, fullName)
    {
        await this.csv.type(csvCode);
        await this.name.type(fullName);
        await this.submit.click();
        
    }
    

    async AndGetOrderId()
    {
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();

    }


    }
    
    
    
    module.exports = {CheckoutPage};