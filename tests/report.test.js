const checkReportInput = require('./checkReportInput');

describe("Check description validity", () => {
    test("Description is valid", () => {
        let description = "An incident happened yesterday."
        let result = checkReportInput.isValidDescription(description);
        expect(result).toBeTruthy();
    });
    test("Description is empty", () => {
        let description = "";
        let result = checkReportInput.isValidDescription(description);
        expect(result).toBeFalsy();
    });
    test("Description is too short", () => {
        let description = "Incident happened.";
        let result = checkReportInput.isValidDescription(description);
        expect(result).toBeFalsy();
    });


});

describe("Check adress validity", () => {
    test("Adress is valid", () => {
        let adress = "123 Maple Street, Apt 45, Springfield, IL 62704";
        let result = checkReportInput.isValidAdress(adress);
        expect(result).toBeTruthy();
    });
    test("Adress is empty", () => {
        let adress = "";
        let result = checkReportInput.isValidAdress(adress);
        expect(result).toBeFalsy();
    });
    test("Adress is too short", () => {
        let adress = "Chicken 8";
        let result = checkReportInput.isValidAdress(adress);
        expect(result).toBeFalsy();
    });
    test("Adress is too long", () => {
        let adress = "456 Long Avenue, Apartment 789, Very Long City Name, Some State, 12345-6789, United States of America";
        let result = checkReportInput.isValidAdress(adress);
        expect(result).toBeFalsy();
    });
    test("Adress contains an invalid character", () => {
        let adress = "123 #Maple Street, Apt 45, Springfield, IL 62704";
        let result = checkReportInput.isValidAdress(adress);
        expect(result).toBeFalsy();
    });

})
