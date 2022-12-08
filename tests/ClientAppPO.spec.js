const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {CartPage} = require('../pageobjects/CartPage');
const {CheckoutPage} = require('../pageobjects/CheckoutPage');
const {MyOrdersPage} = require('../pageobjects/MyOrdersPage');
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));


for (const data of dataset)
{
test (`Browser Context Playwrigt test1 for  ${data.productName}`, async ({page})=>
{
    
    //const email = "test707@test.com";
    //const password = "Qwerty1!";
   // const productName = 'zara coat 3';
    //const countryCode = 'Can';
    //const countryName = " Canada";
    //const contractedName = "Can";
    const selectDate = '05';
    const selectMonth = '11';
    const fullName = "Ivan Ten";
    const csvCode = "123";
   


    
    const products = page.locator(".card-body"); 
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = new CartPage(page);
    //await cartPage.currentProductAssertion(data.productName);
    await cartPage.clickCheckout();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.selectCountry();
    await expect(page.locator(".user__name label[type='text']")).toHaveText(data.username);
    await checkoutPage.fillInDropdown(selectDate, selectMonth);
    
    await checkoutPage.fillInPersonalDataAndSubmit (csvCode, fullName);
    const orderId = await checkoutPage.AndGetOrderId();
    console.log(orderId)

    

    


    const myOrdersPage = new MyOrdersPage(page);
    await myOrdersPage.orderIdAssertion(orderId)
    


    
    const orderIdDetails = await myOrdersPage.getOrderId();
    expect (orderId.includes(orderIdDetails)).toBeTruthy();


    



   // await page.pause();




});
}
