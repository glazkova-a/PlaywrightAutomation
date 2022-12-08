const {test, expect} = require('@playwright/test');


test.only ('Browser Context Playwrigt test', async ({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    page.route('**/*.css',route=>route.abort());
    const UserName = page.locator('#username');
    const SignIn = page.locator ('#signInBtn');
    const CardTitles = page.locator(".card-body a"); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await UserName.type("rahulshetty");
    await page.locator("[type='password']").type("learning");
    await SignIn.click();
    console.log (await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await UserName.fill("");
    await UserName.fill("rahulshettyacademy");
    
    await Promise.all(
        [
            page.waitForNavigation(),
            SignIn.click(),
        ]
    );
    
 
   // console.log(await CardTitles.first().textContent());
    //console.log(await CardTitles.nth(1).textContent());
    const AllTitles = await CardTitles.allTextContents();
    console.log(AllTitles);




    



});





test ('UI Controls', async ({page})=>
{
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const UserName = page.locator('#username');
    const SignIn = page.locator ('#signInBtn');
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator (".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect (page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");


    //await page.pause();


});


test ('Child windows handling', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const UserName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click(),
        ]
    );
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator ("#username").type(domain);
    await page.pause();
    console.log(await page.locator ('#username').textContent());

});

