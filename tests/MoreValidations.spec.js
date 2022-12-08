const {test, expect} = require('@playwright/test');


//test.describe.configure({mode:"parallel"});
test ('Popup validations', async ({page})=>
{
    await page.goto ("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    page.pause();

    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();

});


test ('Screenshot & Visual comparison', async ({page})=>
{
    await page.goto ("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator ('#displayed-text').screenshot({path:'PartialScreenShot.png'});
    await page.locator('#hide-textbox').click();
    await page.screenshot({path:'screenshot.png'});
    await expect(page.locator('#displayed-text')).toBeHidden();


});


test ('Visual', async ({page})=>
{

    await page.goto("https://ottawa.ctvnews.ca");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');


});