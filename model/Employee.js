/**
 * Author: William Teixeira
 * Website: https://williamteixeira.github.io/
 * 
 */

class Employee {

    constructor(name, birth, namemother, admissiondate, cpf, pispasep, accessiontype, agreementdate, percent,
        dayslong, bankcode, bankagency, dvbankagency, accountbank, dvaccountbank, accountype, lastsalary,
        penultimatesalary, prepenultimatepalary) {
        
        this._id;
        this._name = name;
        this._birth = birth;
        this._namemother = namemother;
        this._admissiondate = admissiondate;
        this._cpf = cpf;
        this._pispasep = pispasep;
        this._accessiontype = accessiontype;    
        this._agreementdate = agreementdate;
        this._percent = percent;
        this._dayslong = dayslong;
        this._bankcode = bankcode;
        this._bankagency = bankagency;
        this._dvbankagency = dvbankagency;
        this._accountbank = accountbank;
        this._dvaccountbank = dvaccountbank;
        this._accountype = accountype;
        this._lastsalary = lastsalary;
        this._penultimatesalary = penultimatesalary;
        this._prepenultimatepalary = prepenultimatepalary;

    }

    //#region getter an setter
    get admissiondate () {
        return this._admissiondate;
    }
    set admissiondate (value) {
        this._admissiondate = value;
    }

    get cpf () {
        return this._cpf;
    }
    set cpf (value) {
        this._cpf = value;
    }

    get pispasep () {
        return this._pispasep;
    }
    set pispasep (value) {
        this._pispasep = value;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }

    get namemother () {
        return this._namemother;
    }
    set namemother (value) {
        this._namemother = value;
    }

    get birth () {
        return this._birth;
    }
    set birth (value) {
        this._birth = value;
    }

    get accessiontype () {
        return this._accessiontype;
    }
    set accessiontype (value) {
        this._accessiontype = value;
    }

    get agreementdate () {
        return this._agreementdate;
    }
    set agreementdate (value) {
        this._agreementdate = value;
    }

    get percent () {
        return this._percent;
    }
    set percent (value) {
        this._percent = value;
    }

    get dayslong () {
        return this._dayslong;
    }
    set dayslong (value) {
        this._dayslong = value;
    }

    get bankcode () {
        return this._bankcode;
    }
    set bankcode (value) {
        this._bankcode = value;
    }

    get bankagency () {
        return this._bankagency;
    }
    set bankagency (value) {
        this._bankagency = value;
    }

    get dvbankagency () {
        return this._dvbankagency;
    }
    set dvbankagency (value) {
        this._dvbankagency = value;
    }

    get accountbank () {
        return this._accountbank;
    }
    set accountbank (value) {
        this._accountbank = value;
    }

    get dvaccountbank () {
        return this._dvaccountbank;
    }
    set dvaccountbank (value) {
        this._dvaccountbank = value;
    }

    get accountype () {
        return this._accountype;
    }
    set accountype (value) {
        this._accountype = value;
    }

    get lastsalary () {
        return this._lastsalary;
    }
    set lastsalary (value) {
        this._lastsalary = value;
    }

    get penultimatesalary () {
        return this._penultimatesalary;
    }
    set penultimatesalary (value) {
        this._penultimatesalary = value;
    }

    get prepenultimatepalary () {
        return this._prepenultimatepalary;
    }
    set prepenultimatepalary (value) {
        this._prepenultimatepalary = value;
    }

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }

//#endregion
    
    loadFromJSON(json) {

        for (let name in json) {

            if (name == '_admissiondate' || name == '_birth' || name == '_agreementdate') {
                this[name] = json[name];
            } else {
                this[name] = json[name];
            }
        }
    }

    static getEmployeesStorage() {
        let employees = [];

        if (localStorage.getItem("employees")) {
            employees = JSON.parse(localStorage.getItem("employees"));
        }
        return employees;
    }

    getNewID() {

        let employeeID = parseInt(localStorage.getItem("employeeID"));

        if (!employeeID > 0){
            employeeID = 0;
        }

        employeeID++;

        localStorage.setItem("employeeID", employeeID);
        
        return employeeID;
    }

    save() {
        let employee = Employee.getEmployeesStorage();

        if (this.id > 0) {

            employee.map((u) => {

                if (u._id == this.id) {
                    Object.assign(u, this);
                }

                return u;
            });

        } else {
            this.id = this.getNewID();

            employee.push(this);

        }

        localStorage.setItem("employees", JSON.stringify(employee));

    }

    remove(){

        let employees = Employee.getEmployeesStorage();

        employees.forEach((employeeData, index) => {
            
            if (this._id == employeeData._id){
                
                employees.splice(index, 1);
            
            }
        });

        localStorage.setItem("employees", JSON.stringify(employees));

    }



}