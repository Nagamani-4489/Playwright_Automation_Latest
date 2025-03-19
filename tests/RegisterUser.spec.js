const {test, expect} = require('@playwright/test');

test.skip('Test for Register context' , async({browser}) => {

const context = await browser.newContext();
const page = await context.newPage();

const registerButton = page.locator("text='Register'")
const registerTitle = page.locator('.login-title')
const firstName = page.locator('#firstName')
const lastName = page.locator('#lastName')
const email = page.locator('#userEmail')
const phone = page.locator("#userMobile")
const password = page.locator('#userPassword')
const confirmPassword = page.locator('#confirmPassword')
const checkBox = page.locator('//input[@formcontrolname="required"]')
const registerSubmitButton = page.locator('[value="Register"]')
const cardTitles = page.locator(".card-body b")

await page.goto("https://rahulshettyacademy.com/client")

await registerButton.click();

await expect(registerTitle).toHaveText('Register')

await firstName.fill("Nagamani");
await lastName.fill("Nagamani");

await email.fill('nagamani232@gmail.com')
await phone.fill('3434598763')
await password.fill('Test1234')
await confirmPassword.fill('Test1234')
await checkBox.click();

await registerSubmitButton.click();

await page.getByRole('button', { name: 'Login' }).click();

await page.getByPlaceholder('email@example.com').fill('nagamani12345@gmail.com');
await page.getByPlaceholder('enter your passsword').fill('Test1234');
await page.getByRole('button', { name: 'Login' }).click();
const allTitles = await cardTitles.nth(0).textContent()

console.log(allTitles)
})