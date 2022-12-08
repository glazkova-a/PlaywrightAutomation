class MyOrdersPage {

    constructor (page)
    {
        this.page = page;
        this.myOrders = page.locator("button[routerlink='/dashboard/myorders']");
        this.pageBody = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails =page.locator(".col-text");
        


        
        
    
    }
    
    async orderIdAssertion(orderId)
    {
        await this.myOrders.click();
        await this.pageBody.waitFor();

       
        
  
    
        for (let i =0; i < await this.rows.count(); ++i)
        {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId))
            {
            
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
        
    }



    async getOrderId()
    {
        return await this.orderIdDetails.textContent();
    }
}
    
    
 module.exports = {MyOrdersPage};