package issueTracker.Utilities;

import com.github.javafaker.Faker;
import com.google.common.base.Function;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.Assert;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.support.ui.*;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class Driver {

    private Driver() {
    }

    static WebDriver driver;

    public static WebDriver getDriver() {
        if (driver == null) {
            switch (ConfigReader.getProperty("browser")) {
                case "chrome":
                    WebDriverManager.chromedriver().setup();
                    driver = new ChromeDriver();
                    break;
                case "firefox":
                    WebDriverManager.firefoxdriver().setup();
                    driver = new FirefoxDriver();
                    break;
                case "ie":
                    WebDriverManager.iedriver().setup();
                    driver = new InternetExplorerDriver();
                    break;
                case "safari":
                    WebDriverManager.getInstance(SafariDriver.class).setup();
                    driver = new SafariDriver();
                    break;
                case "chrome-headless":
                    WebDriverManager.chromedriver().setup();
                    driver = new ChromeDriver(new ChromeOptions().setHeadless(true));
                    break;
            }
        }
        driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
        driver.manage().window().maximize();
        return driver;
    }

    public static void closeDriver() {
        if (driver != null) {
            //driver.quit();

            driver = null;
        }
    }

    public static void wait(int secs) {
        try {
            Thread.sleep(1000 * secs);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
//    public static void login (String userType){
//        UserInfoPage userInfoPage = new UserInfoPage();
//        userInfoPage.accountItem.click();
//        userInfoPage.login.click();
//        String entranceUserName = userType + "name";
//        String entrancePassword = userType+ "Password";
//        userInfoPage.username.sendKeys(ConfigReader.getProperty(entranceUserName));
//        userInfoPage.password.sendKeys(ConfigReader.getProperty(entrancePassword));
//        userInfoPage.signInButton.click();
//    }
//    public static void create(String role) {
//        RegisterPage register = new RegisterPage();
//        Faker faker = new Faker();
//        String SSN = faker.number().digits(3) + "-" + faker.number().digits(2) + "-" + faker.number().digits(4);
//        String firstName = faker.name().firstName();
//        String lastName = faker.name().lastName();
//        String address = faker.address().fullAddress();
//        String phoneNumber = faker.number().digits(3) + "-" + faker.number().digits(3) + "-" + faker.number().digits(4);
//        String userName = faker.name().username();
//        String email = faker.internet().emailAddress();
//        String password = faker.internet().password(7, 10, true, true, true);
//        register.ssnBox.sendKeys(SSN);
//        register.firstnameBox.sendKeys(firstName);
//        register.lastnameBox.sendKeys(lastName);
//        register.addressBox.sendKeys(address);
//        register.mobilePhoneBox.sendKeys(phoneNumber);
//        register.usernameBox.sendKeys(userName);
//        register.emailBox.sendKeys(email);
//        register.newPasswordBox.sendKeys(password);
//        register.passwordConfirmBox.sendKeys(password);
//        register.registerButton2.click();
//        WriteToText.saveTestData(email, firstName, lastName, SSN, role);
//        Driver.login("admin");
//        Admin admin = new Admin();
//        admin.adminMenu.click();
//        Driver.wait(1);
//        admin.item.click();
//        Driver.wait(1);
//        admin.item2.click();
//        Driver.wait(1);
//        for(int i=1;i<21;i++){
//            String xpath = "//tbody//tr["+i+"]//td["+3+"]";
//            String data=driver.findElement(By.xpath(xpath)).getText();
//            if(data.equals(email)){
//                Driver.getDriver().findElement(By.xpath("//tbody//tr["+i+"]//td["+4+"]")).click();
//                Driver.getDriver().findElement(By.xpath("(//a[@class='btn btn-primary btn-sm'])[1]")).click();
//                //String upper = role.toUpperCase();
//                Driver.wait(2);
//                Actions actions = new Actions(Driver.getDriver());
//                JavascriptExecutor js = (JavascriptExecutor) Driver.getDriver();
//                js.executeScript("window.scrollBy(0,500)"); //Scroll vertically down by 1000 pixels
//                Driver.wait(2);
//                Select select = new Select(admin.kutu);
//                select.getFirstSelectedOption().click();
//                Driver.getDriver().findElement(By.xpath("//option[@value='ROLE_"+role+"']")).click();
//
//                Driver.wait(2);
//                Driver.getDriver().findElement(By.xpath("//button[@class='btn btn-primary']")).click();
//            }
//
//
//
//        }
//
//    }
//    public static void UIverification(String role){
//        Admin admin = new Admin();
//        String emaildata = ReadText.returnEmail();
//        //System.out.println(emaildata+"?????");
//        JavascriptExecutor js = (JavascriptExecutor) Driver.getDriver();
//        js.executeScript("window.scrollBy(0,-500)"); //Scroll vertically down by 1000 pixels
//        Driver.wait(2);
//        //admin.item2.click();
//        Driver.wait(2);
//        admin.item2.click();
//        for(int i=1;i<21;i++){
//            String xpath = "//tbody//tr["+i+"]//td["+3+"]";
//            String data=driver.findElement(By.xpath(xpath)).getText();
//            if(data.equals(emaildata)){
//                Driver.wait(2);
//                String actualRole = Driver.getDriver().findElement(By.xpath("//tbody//tr["+i+"]//td["+6+"]")).getText();
//                String expectedRole = "ROLE_"+role;
//                Assert.assertTrue(actualRole.equals(expectedRole));
//
//
//            }
//
//
//
//
//        }
//        System.out.println("UI verification is done for ==> " + ReadText.returnFirstName()+" | " + ReadText.returnLastName() + " | " + ReadText.returnSSn());
//
//
//    }
    public static void waitAndClick(WebElement element, int timeout) {
        for (int i = 0; i < timeout; i++) {
            try {
                element.click();
                return;
            } catch (WebDriverException e) {
                wait(1);
            }
        }
    }
    public static void switchToWindow(String targetTitle) {
        String origin = Driver.getDriver().getWindowHandle();
        for (String handle : Driver.getDriver().getWindowHandles()) {
            Driver.getDriver().switchTo().window(handle);
            if (Driver.getDriver().getTitle().equals(targetTitle)) {
                return;
            }
        }
        Driver.getDriver().switchTo().window(origin);
    }
    public static void hover(WebElement element) {
        Actions actions = new Actions(Driver.getDriver());
        actions.moveToElement(element).perform();
    }
    /**
     * return a list of string from a list of elements ignores any element with no
     * text
     *
     * @param list
     * @return
     */


    public static List<String> getElementsText(List<WebElement> list) {
        List<String> elemTexts = new ArrayList<>();
        for (WebElement el : list) {
            elemTexts.add(el.getText());
        }
        return elemTexts;
    }


    public static List<String> getElementsText(By locator) {
        List<WebElement> elems = Driver.getDriver().findElements(locator);
        List<String> elemTexts = new ArrayList<>();
        for (WebElement el : elems) {
            elemTexts.add(el.getText());
        }
        return elemTexts;
    }
    public static WebElement waitForVisibility(WebElement element, int timeToWaitInSec) {
        WebDriverWait wait = new WebDriverWait(Driver.getDriver(), timeToWaitInSec);
        return wait.until(ExpectedConditions.visibilityOf(element));
    }
    public static WebElement waitForVisibility(By locator, int timeout) {
        WebDriverWait wait = new WebDriverWait(Driver.getDriver(), timeout);
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }
    public static Boolean waitForInVisibility(By locator, int timeout) {
        WebDriverWait wait = new WebDriverWait(Driver.getDriver(), timeout);
        return wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }
    public static WebElement waitForClickablility(WebElement element, int timeout) {
        WebDriverWait wait = new WebDriverWait(Driver.getDriver(), timeout);
        return wait.until(ExpectedConditions.elementToBeClickable(element));
    }
    public static WebElement waitForClickablility(By locator, int timeout) {
        WebDriverWait wait = new WebDriverWait(Driver.getDriver(), timeout);
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    public static void waitForPageToLoad(long timeOutInSeconds) {
        ExpectedCondition<Boolean> expectation = new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver driver) {
                return ((JavascriptExecutor) driver).executeScript("return document.readyState").equals("complete");
            }
        };
        try {
            WebDriverWait wait = new WebDriverWait(Driver.getDriver(), timeOutInSeconds);
            wait.until(expectation);
        } catch (Exception error) {
            error.printStackTrace();
        }
    }
    public static WebElement fluentWait(final WebElement webElement, int timeinsec) {
        FluentWait<WebDriver> wait = new FluentWait<WebDriver>(Driver.getDriver())
                .withTimeout(Duration.ofSeconds(timeinsec))
                .pollingEvery(Duration.ofMillis(500))
                .ignoring(NoSuchElementException.class);
        WebElement element = wait.until(new Function<WebDriver, WebElement>() {
            public WebElement apply(WebDriver driver) {
                return webElement;
            }
        });
        return element;
    }
    /**
     * Verifies whether the element matching the provided locator is displayed on page
     * fails if the element matching the provided locator is not found or not displayed
     *
     * @param by
     */
    public static void verifyElementDisplayed(By by) {
        try {
            assertTrue("Element not visible: " + by, Driver.getDriver().findElement(by).isDisplayed());
        } catch (NoSuchElementException e) {
            Assert.fail("Element not found: " + by);
        }
    }
    /**
     * Verifies whether the element matching the provided locator is NOT displayed on page
     * fails if the element matching the provided locator is not found or not displayed
     *
     * @param by
     */
    public static void verifyElementNotDisplayed(By by) {
        try {
            assertFalse("Element should not be visible: " + by, Driver.getDriver().findElement(by).isDisplayed());
        } catch (NoSuchElementException e) {
            e.printStackTrace();
        }
    }
    /**
     * Verifies whether the element is displayed on page
     * fails if the element is not found or not displayed
     *
     * @param element
     */
    public static void verifyElementDisplayed(WebElement element) {
        try {
            assertTrue("Element not visible: " + element, element.isDisplayed());
        } catch (NoSuchElementException e) {
            Assert.fail("Element not found: " + element);
        }
    }
    /**
     * Waits for element to be not stale
     *
     * @param element
     */
    public void waitForStaleElement(WebElement element) {
        int y = 0;
        while (y <= 15) {
            if (y == 1)
                try {
                    element.isDisplayed();
                    break;
                } catch (StaleElementReferenceException st) {
                    y++;
                    try {
                        Thread.sleep(300);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } catch (WebDriverException we) {
                    y++;
                    try {
                        Thread.sleep(300);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
        }
    }
    /**
     * Selects a random value from a dropdown list and returns the selected Web Element
     *
     * @param select
     * @return
     */
    public static WebElement selectRandomTextFromDropdown(Select select) {
        Random random = new Random();
        List<WebElement> weblist = select.getOptions();
        int optionIndex = 1 + random.nextInt(weblist.size() - 1);
        select.selectByIndex(optionIndex);
        return select.getFirstSelectedOption();
    }


    public static void selectDropdown (WebElement element, int  index){
        Select dropdown = new Select(element);
        dropdown.selectByIndex(index);
    }

    public static void selectDropdownCountry (WebElement element, int  countryIndex){
        Select dropdown = new Select(element);
        dropdown.selectByIndex(countryIndex);
//select dropdownlist
    }

    public static void selectDropdown (WebElement element, String str){
        Select dropdown = new Select(element);
        dropdown.selectByVisibleText(str);
    }
    //generate number for ssn  321-56-6789
    public static int getRandomInteger(int maximum, int minimum){
        return ((int) (Math.random()*(maximum - minimum))) + minimum;

    }

//    public static void waitAndClick(WebElement element, int timeout) {
//        for (int i = 0; i < timeout; i++) {
//            try {
//                element.click();
//                return;
//            } catch (WebDriverException e) {
//                wait(1);
//            }
//        }
//    }




    /**
     * Clicks on an element using JavaScript
     *
     * @param element
     */
    public static void clickWithJS(WebElement element) {
        ((JavascriptExecutor) Driver.getDriver()).executeScript("arguments[0].scrollIntoView(true);", element);
        ((JavascriptExecutor) Driver.getDriver()).executeScript("arguments[0].click();", element);
    }
    /**
     * Scrolls down to an element using JavaScript
     *
     * @param element
     */
    public static void scrollToElement(WebElement element) {
        ((JavascriptExecutor) Driver.getDriver()).executeScript("arguments[0].scrollIntoView(true);", element);
    }
    /**
     * Performs double click action on an element
     *
     * @param element
     */
    public static void doubleClick(WebElement element) {
        new Actions(Driver.getDriver()).doubleClick(element).build().perform();
    }
    /**
     * Changes the HTML attribute of a Web Element to the given value using JavaScript
     *
     * @param element
     * @param attributeName
     * @param attributeValue
     */
    public static void setAttribute(WebElement element, String attributeName, String attributeValue) {
        ((JavascriptExecutor) Driver.getDriver()).executeScript("arguments[0].setAttribute(arguments[1], arguments[2]);", element, attributeName, attributeValue);
    }
    /**
     * @param element
     * @param check
     */
    public static void selectCheckBox(WebElement element, boolean check) {
        if (check) {
            if (!element.isSelected()) {
                element.click();
            }
        } else {
            if (element.isSelected()) {
                element.click();
            }
        }
    }
    public static void clickWithTimeOut(WebElement element, int timeout) {
        for (int i = 0; i < timeout; i++) {
            try {
                element.click();
                return;
            } catch (WebDriverException e) {
                wait(1);
            }
        }
    }
    /**
     * executes the given JavaScript command on given web element
     *
     * @param element
     */
    public static void executeJScommand(WebElement element, String command) {
        JavascriptExecutor jse = (JavascriptExecutor) Driver.getDriver();
        jse.executeScript(command, element);
    }
    /**
     * executes the given JavaScript command on given web element
     *
     * @param command
     */
    public static void executeJScommand(String command) {
        JavascriptExecutor jse = (JavascriptExecutor) Driver.getDriver();
        jse.executeScript(command);
    }

    public boolean isElementSelected(By locator){  return webAction(locator).isSelected();    }
    public void sendValue(By locator, String value){
        try {
            webAction(locator).sendKeys(value);
        }catch (Exception e){
            System.out.println("Some exception occured while sending value"+ locator);
        }
    }
    public static WebElement webAction(final By locator){
        Wait<WebDriver> wait = new FluentWait<WebDriver>(getDriver())
                .withTimeout(Duration.ofSeconds(15))
                .pollingEvery(Duration.ofSeconds(1))
                .ignoring(java.util.NoSuchElementException.class)
                .ignoring(StaleElementReferenceException.class)
                .ignoring(ElementClickInterceptedException.class)
                .withMessage(
                        "Webdriver waited for 15 seconds not still could not find the element therefore TimeOutExceptions"
                );
        return wait.until(new java.util.function.Function<WebDriver, WebElement>() {
            @Override
            public WebElement apply(WebDriver webDriver) {
                return null;
            }
        });
    }

    public static void waitAndSendText(WebElement element,String text, int timeout) {
        for (int i = 0; i < timeout; i++) {
            try {
                element.sendKeys(text);
                return;
            } catch (WebDriverException e) {
                wait(1);
            }
        }
    }}

