package issueTracker.StepDefinitions;

import io.cucumber.java.en.Given;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import issueTracker.Utilities.ConfigReader;

import static io.restassured.RestAssured.*;

public class ApiStepDefs {
    @Given("user gets all data from api")
    public void user_gets_all_data_from_api() {
        Response response =given().contentType(ContentType.JSON).
                            when().get(ConfigReader.getProperty("apiurl")).
                            then().statusCode(200).contentType(ContentType.JSON).extract().response();
        response.prettyPrint();
    }

}
