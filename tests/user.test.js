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
        let username = "Yo";
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

});

describe("Check user password validity", () => {
    test ("Password is valid", () => {
        let password = "Password12345";
        let result = checkuserInput.isValidPassword(password);
        expect(result).toBeTruthy();
    });
    test("Password is empty", () => {
        let password = "";
        let result = checkuserInput.isValidUsername(password);
        expect(result).toBeFalsy();
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
    });
    test ("Password format is invalid", () => {
        let password = "thispasswordisinvalid";
        let result = checkuserInput.isValidPassword(password);
        expect(result).toBeFalsy();
    })

});

describe("Check user e-mail", () => {
    test ("e-mail is valid", () => {
        let email = "name.surname@gmail.com";
        let result = checkuserInput.isValidEmail(email);
        expect(result).toBeTruthy();
    });
    test("e-mail is empty", () => {
        let email = "";
        let result = checkuserInput.isValidUsername(email);
        expect(result).toBeFalsy();
    });
    test ("e-mail starts with an invalid character", () => {
        let email = "!name.surname@gmail.com";
        let result = checkuserInput.isValidEmail(email);
        expect(result).toBeFalsy();  
    });
    test ("e-mail contains at least one invalid character", () => {
        let email = "n!me.surname@gmail.com";
        let result = checkuserInput.isValidEmail(email);
        expect(result).toBeFalsy();  
    });
    test ("e-mail finishes with anything other than the domain name", () => {
        let email = "name.surname@gmail.comA";
        let result = checkuserInput.isValidEmail(email);
        expect(result).toBeFalsy();  
    });
    test ("e-mail contains two or more consecutive dots", () => {
        let email = "name..surname@gmail.com";
        let result = checkuserInput.isValidEmail(email);
        expect(result).toBeFalsy();  
    });

})