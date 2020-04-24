/**
 * Author: William Teixeira
 * Website: https://williamteixeira.github.io/
 * 
 */

export default class Company {

    constructor (registertype, cnpjcei, cno){
        this._registertype = registertype;
        this._cnpjcei = cnpjcei;
        this._cno = cno;
    }

    get registertype () {
        return this._registertype;
    }
    set registertype (value) {
        this._registertype = value;
    }

    get cnpjcei () {
        return this._cnpjcei;
    }
    set cnpjcei (value) {
        this._cnpjcei = value;
    }

    get cno () {
        return this._cno;
    }
    set cno (value) {
        this._cno = value;
    }
    
    loadFromForm(inputs){

        inputs.forEach((field) => {

            if (field.name == "registertype") {
                if (field.checked) {
                    this[field.name] = field.value;
                }
            } else {
                this[field.name] = field.value;
            }

        });
        
    }

    
}