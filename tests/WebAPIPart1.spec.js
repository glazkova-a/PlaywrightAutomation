const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');
const loginPayload = {userEmail: "test707@test.com", userPassword: "Qwerty1!"};
const orderPayload = {orders:[{country:"Anguilla",productOrderedId:"6262e990e26b7e1a10e89bfa"}]};


let response;


test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayload);
   response = await apiUtils.createOrder(orderPayload);

});

test ('Place the order', async ({page})=>
{   
   
    page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
        }, response.token);
    
    await page.goto("https://rahulshettyacademy.com/client/");
    
    //const email = "test707@test.com";
    //const productName = 'zara coat 3';
    //const UserName = page.locator('#userEmail');
    //const SignIn = page.locator ('#login');
    //const products = page.locator(".card-body"); 
   

    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
  
    
    for (let i =0; i < await rows.count(); ++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes (rowOrderId))
        {
            
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect (response.orderId.includes(orderIdDetails)).toBeTruthy();


    



   // await page.pause();




});
