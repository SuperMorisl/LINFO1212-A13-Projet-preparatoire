const checkuserInput = {

    isValidUsername : function(input) {

        // rajouter une condition et un test pour le cas si le username existe déjà dans la db
        
        let minLength = 6;
        let maxLength = 20;
        if(input.length < minLength || input.length > maxLength){
            return false;
        }
        
        let specialCharacters = "!@#$%^&*()+=[]{}|\\;:'\",.<>/?`~-";

        for (let char of input){
            if (specialCharacters.includes(char)){
                return false;
            }
        }

        let left = 0;
        let right = input.length - 1;

        while (left < input.length && /\d/.test(input[left])) { // /\d\.test() sert à tester si le caractère actuel de input est un chiffre ou non, il renvoit true ou false
            left++;
        }

        while (right >= 0 && /\d/.test(input[right])) {
            right--;
        }

    
        for (let i = left; i <= right; i++) {
            if (/\d/.test(input[i])) {
                return false; 
            }
        }

       
        return true;
    },

    isValidPassword : function(input) {

        let minLength = 12;
        let maxLength = 30;
        if (input.length < minLength || input.length >= maxLength){
            return false;
        }
        return true;

    },

    isValidEmail : function(input) {

    }

}

module.exports = checkuserInput;
