const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function loginTest() {
    // Launch the browser
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // Go to the login page
        await driver.get("http://results.mvsrec.edu.in/SBLogin.aspx");

        // Enter credentials
        await driver.findElement(By.id("txtUserName")).sendKeys("245121737129");
        await driver.findElement(By.id("txtPassword")).sendKeys("245121737129");

        // Submit the form
        await driver.findElement(By.id("btnSubmit")).click();

        // Wait for the label to be present after login
        await driver.wait(until.elementLocated(By.id("lblHTNo")), 5000);
        const user = await driver.findElement(By.id("lblHTNo")).getText();

        // Verify HT Number
        assert.strictEqual(user.trim(), "245121737129");
        console.log("Login success");

        // Click on Exams section
        await driver.findElement(By.id("Stud_cpModules_imgbtnExams")).click();

        // Wait for the link to appear and click on Semester results
        await driver.wait(until.elementLocated(By.id("cpBody_lnkSem")), 5000);
        await driver.findElement(By.id("cpBody_lnkSem")).click();

        // Verify final URL
        await driver.wait(until.urlContains("Frm_SemwiseStudMarks.aspx"), 5000);
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(
            currentUrl,
            "http://results.mvsrec.edu.in/STUDENTLOGIN/Frm_SemwiseStudMarks.aspx"
        );

        console.log("Display marks success");
    } catch (err) {
        console.error("Test failed:", err);
    } finally {
        await driver.quit();
    }
}

loginTest();
