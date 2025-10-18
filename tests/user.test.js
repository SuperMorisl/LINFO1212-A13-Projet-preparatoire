const checkuserInput = require('./checkInput');

describe("Check username validity", () => {
    test ("Username is valid", () => {
        let username = "Username";
        let result = checkuserInput.isValidUsername(username);
        expect(result).toBeTruthy();
    })
    test("Username is empty", () => {
        let username = "";
        let result = checkuserInput.isValidUsername(username);
        expect(result).toBeFalsy();
    });
    test ("Username is too short", () => {
        let username = "User";
        let result = checkuserInput.isValidUsername(username);
        expect(result).toBeFalsy();

    }); 
    test ("Username is too long", () => {
        let username = "UsenameIsWayTooLongToBeValid";
        let result = checkuserInput.isValidUsername(username);
        expect(result).toBeFalsy();
    });
    test ("Username contains at least one invalid character", () => {
        let username = "&Usern#ame";
        let result = checkuserInput.isValidUsername(username);
        expect(result).toBeFalsy();
    });
    test ("Username contains a number in the middle", () => {
        let username = "Usern1me";
        let result = checkuserInput.isValidUsername(username);
        expect(result).toBeFalsy();
    })

})

describe("Check user password validity", () => {
    test ("Password is valid", () => {
        let password = "Password12345";
        let result = checkuserInput.isValidPassword(password);
        expect(result).toBeTruthy();
    });
    test ("Password is too short", () => {
        let password = "Pass123";
        let result = checkuserInput.isValidPassword(password);
        expect(result).toBeFalsy();
    });
    test ("Password is too long", () => {
        let password = "ThisPasswordIsWayTooLongToBeValid";
        let result = checkuserInput.isValidPassword(password);
        expect(result).toBeFalsy();
    })

})