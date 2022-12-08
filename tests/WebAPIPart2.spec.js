const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "test707@test.com";
    const UserName = page.locator('#userEmail');
    const SignIn = page.locator ('#login');
     page.goto("https://rahulshettyacademy.com/client/");
    await UserName.type(email);
    await page.locator("[type='password']").type("Qwerty1!");
    await SignIn.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});



})


test ('Browser Context Playwrigt test1', async ()=>
{
    
    const productName = 'zara coat 3';
    const email = "test707@test.com";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");    
    const products = page.locator(".card-body"); 
    const titles = await page.locator(".card-body b").allTextContents();
   
    console.log(await page.title());

    console.log(titles);
    const count = await products.count();
    for (let i =0; i < count; ++i)
    {
        if (await products.nth(i).locator("b").textContent() === productName)
        {
            //add to cart
            await products.nth(i).locator ("text= Add to Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    page.locator("text=Checkout").click();
    
    await page.locator("[placeholder*='Country']").type("Can", {delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    optionsCount = await dropdown.locator ("button").count();
    for (let i =0; i,optionsCount;  ++i)
    {
        text = await dropdown.locator("button").nth(i).textContent();
        if (text === " Canada")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }

    };

    await expect(page.locator(".user__name label[type='text']")).toHaveText(email);

    const dropdown_date = page.locator("select >> nth=0");
    await dropdown_date.selectOption({label: '05'});
    const dropdown_month = page.locator("select >> nth=1");
    await dropdown_month.selectOption({label: '11'});
    await page.locator ("input[type='text'] >> nth=1").type("123");
    await page.locator ("input[type='text'] >> nth=2").type("Ivan Ten");

    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
  
    
    for (let i =0; i < await rows.count(); ++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes (rowOrderId))
        {
            
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect (orderId.includes(orderIdDetails)).toBeTruthy();


    



   // await page.pause();




});
