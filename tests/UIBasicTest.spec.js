const {test, expect} = require('@playwright/test');
const { waitForDebugger } = require('inspector');

test('Test for browser context' , async({browser}) => {

const context = await browser.newContext();
const page = await context.newPage();
const userName = page.locator('input#username')
const password = page.locator('[type="password"]')
const signInButton = page.locator('input#signInBtn')
const cardTitles = page.locator(".card-body a")

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await userName.fill("rahulshetty")
await password.fill("learning")
await signInButton.click()

console.log(await page.locator("[style*='block']").textContent())
await expect(page.locator("[style*='block']")).toContainText('Incorrect')

await userName.fill("")
await userName.fill("rahulshettyacademy")
await password.fill("learning")
await signInButton.click()

console.log(await cardTitles.first().textContent())
console.log(await cardTitles.nth(1).textContent())
const allTitles = await cardTitles.allTextContents();

console.log(allTitles)



});






test('Test for page', async({page})=> {

    await page.goto("https://www.google.com/")
console.log(await page.title());
await expect(page).toHaveTitle("Google")
});