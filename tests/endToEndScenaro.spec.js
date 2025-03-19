const {test, expect} = require("@playwright/test");


test.only("End to end test scenario", async({page})=>{
const email = "nagamani@123.com";
const products = page.locator(".card-body")
const productName = "IPHONE 13 PRO"
await page.goto("https://rahulshettyacademy.com/client");

await page.locator("#userEmail").fill(email)

await page.locator("#userPassword").fill("Tester123")

await page.locator("[value='Login']").click()

await page.waitForLoadState("networkidle");

const titles = await Promise.all([ products.allTextContents(),]);

console.log(titles)

const count = await products.count();

console.log(count)


for(let i =0; i<=count; ++i)
{

    if(await products.nth(i).locator("b").textContent() ===productName)
    {
        await products.nth(i).locator("text=' Add To Cart'").click();
        break;

    }

}

await page.locator("[routerlink*='cart']").click();
await page.locator('div li').first().waitFor();
const bool= await page.locator('h3:has-text("IPHONE 13 PRO")').isVisible();
expect(bool).toBeTruthy();
await page.locator('text = checkout').click();

// Payment Method Personal Information




await page.locator('[placeholder*="Country"]').pressSequentially("ind", {delay:100})

const countryDropdown = await page.locator('.ta-results');

await countryDropdown.waitFor();

const dropdownOptionsCount = await countryDropdown.locator("button").count();

for(let i=0; i< dropdownOptionsCount; ++i)
{
const text = await countryDropdown.locator("button").nth(i).textContent();

if(text === ' India')
{
await countryDropdown.locator("button").nth(i).click();
break;
}

}
await expect(page.locator(".user__name [type = 'text']").first()).toHaveText(email);

await page.locator('.action__submit').click();

await page.locator('.hero-primary').waitFor();

await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ")

const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

console.log(orderID)

// Clicking on myorders
await page.waitForLoadState();
await page.locator('button[routerlink*="myorders"]').click()

await page.locator('tbody').waitFor();

const rows = await page.locator('tr.ng-star-inserted');

for(let i = 0; i< await rows.count() ; i++)

    {
        const rowsOrderId = await rows.nth(i).locator('th').textContent();

        if(orderID.includes(rowsOrderId)){
            await rows.nth(i).locator('button').first().click();
            break;
        }

    }

    const orderIdDetails = await page.locator('.col-text').textContent();

    expect(orderID.includes(orderIdDetails)).toBeTruthy();


})


