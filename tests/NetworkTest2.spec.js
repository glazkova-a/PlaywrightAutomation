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

    
    
    //const email = "test707@test.com";
    //const productName = 'zara coat 3';
    //const UserName = page.locator('#userEmail');
    //const SignIn = page.locator ('#login');
    //const products = page.locator(".card-body"); 
    
   
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=636ab6e0d7778f57972b2c5f",
    route=> route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6218dad22c81249b296508b9"})
    )
    await page.locator("button:has-text('View')").first().click(); 

    await page.pause();
    




});
