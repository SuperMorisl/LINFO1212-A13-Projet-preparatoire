const checkReportInput =  {

    isValidDescription : function(input) {

        if (!input){
            return false;
        }

        const minLength = 20;
        const maxLength = 400;
    
        if (input.length < minLength || input.length > maxLength){
            return false;
        }

        return true;
    },

    isValidAdress : function(input) { // ne garantit pas que l'adresse existe bien 

        if (!input){
            return false;
        }

        const minLength = 10;
        const maxLength = 100;
        
        if (input.length < minLength || input.length > maxLength){
            return false;
        }

        let forbiddenCharacters = "<>@#$%";
        for (let char of input) {
            if (forbiddenCharacters.includes(char)){
                return false;
            }
        }

        return true;
    }

}


module.exports = checkReportInput;