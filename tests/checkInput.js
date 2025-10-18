const checkuserInput = {

    isValidUsername : function(input) {

        // rajouter une condition et un test pour le cas où le username existe déjà dans la db
        
        const minLength = 6;
        const maxLength = 20;

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

        const minLength = 12;
        const maxLength = 30;

        if (input.length < minLength || input.length > maxLength){
            return false;
        }
        if (!/[A-Z]/.test(input) || !/[a-z]/.test(input) || !/\d/.test(input)){ // si le mot de passe ne contient pas au moins une majuscule, une minuscle et un chiffre il est invalide
            return false;
        }
        
        return true;
    },

    isValidEmail: function(input) {

        // format de l'e-mail :
        // elle doit commencer par un chiffre ou une lettre
        // après elle ne peut contenir que des : chiffres, lettres et -, _ ou .
        // il y a que trois domaines valides : gmail.com, outlook.com et hotmail.com (faire un test pour ça et/ou rajouter des domaines)
        // elle se finit avec le domaine
        // "!input.includes('..')" fait en sorte que deux points ne peuvent pas se succéder, ni plus

        return /^[A-Za-z0-9_][A-Za-z0-9._-]*@(gmail\.com|outlook\.com|hotmail\.com)$/.test(input) && !input.includes('..');

        
}

}

module.exports = checkuserInput;
