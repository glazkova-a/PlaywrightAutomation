const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');
const loginPayload = {userEmail: "test707@test.com", userPassword: "Qwerty1!"};
const orderPayload = {orders:[{country:"Anguilla",productOrderedId:"6262e990e26b7e1a10e89bfa"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};


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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/62026f4edfa52b09e0a20b18",
    async route =>
    {
        const response = await page.request.fetch(route.request());
        let body = fakePayLoadOrders;
        route.fulfill(
            {
                response,
                body,
            });
    });
    
    //const email = "test707@test.com";
    //const productName = 'zara coat 3';
    //const UserName = page.locator('#userEmail');
    //const SignIn = page.locator ('#login');
    //const products = page.locator(".card-body"); 
    
   
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.pause();
    console.log(await page.locator(".mt-4").textContent());
    //await page.locator("tbody").waitFor();
    //const rows = await page.locator("tbody tr");
    
  
    
    


   // await page.pause();




});
