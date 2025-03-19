const {test} = require("@playwright/test")

test.skip("Google Test", async({page})=>{

await page.goto("https://www.google.com/");

await page.locator(".gLFyf").fill("Automation testing");

await page.locator("[value='Google Search']").nth(0).click()

await page.pause();
})