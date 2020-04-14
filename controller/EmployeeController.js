/**
 * Author: William Teixeira
 * Website: https://williamteixeira.github.io/
 * 
 */

class EmployeeController {

    constructor(formIdCreate, formIdUpdate, tableId, boxCompany) {

        this.form = document.getElementById(formIdCreate);
        this.formUpdate = document.getElementById(formIdUpdate);
        this.table = document.getElementById(tableId);
        this.formCompany = document.getElementById(boxCompany);
      
        this.onSubmit();
        this.onEdit();
        this.selectAll();
        this.export();
    }

    onEdit() {
        document.querySelector("#box-employee-update .btn-cancel").addEventListener("click", (e) => {
            this.showPanelCreate();
        });

        this.formUpdate.addEventListener("submit", (event) => {
            event.preventDefault();

            let btnSubmit = this.formUpdate.querySelector("[type=submit]");

            btnSubmit.disabled = true;
            let values = this.getValues(this.formUpdate);
            let index = this.formUpdate.dataset.trIndex;
            let tr = this.table.rows[index];
            let employeeOld = JSON.parse(tr.dataset.employee);
            let result = Object.assign({}, employeeOld, values);

            let employee = new Employee();
            employee.loadFromJSON(result);
            employee.save();
            this.getTr(employee, tr);
            this.updateCount();
            this.formUpdate.reset();
            btnSubmit.disabled = false;
            this.showPanelCreate();
            
        });

    }

    /**
     * Evento de envio: interrompe o comportamento padrão do form e incluio o objeto digitado pelo form 
     * na tabela em foco.
     */
    onSubmit() {

        this.form.addEventListener("submit", (event) => {

            event.preventDefault();          
            let btnSubmit = this.form.querySelector("[type=submit]");
            btnSubmit.disabled = true;

            let values = this.getValues(this.form);
            if (values) {
                values.save();
                this.addLine(values);
                this.form.reset();
                btnSubmit.disabled = false;
               
            } else {
                btnSubmit.disabled = false;
                return false;
            }
        });
    }

    /**
     * Retorna um objeto com os dados digitados no formulario
     */
    getValues(form) {

        let employee = {};
        let isValid = true;

        [...form.elements].forEach((field) => {

            if (['name', 'cpf'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;
            } else {
                field.parentElement.classList.remove('has-error');
            }

            if (field.name == "accessiontype") {
                if (field.checked) {
                    employee[field.name] = field.value;
                }
            } else {
                employee[field.name] = field.value;
            }

        });

        if (isValid) {
            return new Employee(
                employee.name,
                employee.birth,
                employee.namemother,
                employee.admissiondate,
                employee.cpf,
                employee.pispasep,
                employee.accessiontype,
                employee.agreementdate,
                employee.percent,
                employee.monthlong,
                employee.bankcode,
                employee.bankagency,
                employee.dvbankagency,
                employee.accountbank,
                employee.dvaccountbank,
                employee.accountype,
                employee.lastsalary,
                employee.penultimatesalary,
                employee.prepenultimatepalary
            );
        } else {
            return false;
        }
    }

   

    selectAll(){
        
        let employees = Employee.getEmployeesStorage();

        employees.forEach(dataEmployee => {
            
            let employee = new Employee();

            employee.loadFromJSON(dataEmployee);

            this.addLine(employee);

        });
    }

    /**
     * Insere um objeto na tabela.
     * @param {objeto que deve ser incluido na tabela} dataEmployee  
     */
    addLine(dataEmployee) {

        let tr = this.getTr(dataEmployee);

        this.table.appendChild(tr);

        this.updateCount();

    }

    getTr(dataEmployee, tr = null){
        if(tr === null){
            tr = document.createElement("tr");
        }
        //JSON.stringfy converte o objeto em json
        tr.dataset.employee = JSON.stringify(dataEmployee);

        tr.innerHTML = `
                <td>${dataEmployee.cpf}</td>
                <td>${dataEmployee.name}</td>
                <td>${(dataEmployee.accessiontype == 0) ? "Suspensão": "Redução" }</td>
                <td>
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-edit btn-outline-primary"><i class="fas fa-pencil-alt"></i></button>
                        <button type="button" class="btn btn-delete btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
                    </div>
               </td>
             
        `;

        this.addEventsTr(tr);

        return tr;

    }

    addEventsTr(tr) {

        tr.querySelector(".btn-delete").addEventListener("click", (e) => {

            if (confirm("Deseja realmente excluir?")) {
               
                let employee = new Employee();
                employee.loadFromJSON(JSON.parse(tr.dataset.employee));
                employee.remove(); 

                tr.remove();
                this.updateCount();
            }

        });


        tr.querySelector(".btn-edit").addEventListener("click", (e) => {
            let json = JSON.parse(tr.dataset.employee);

            this.formUpdate.dataset.trIndex = tr.sectionRowIndex;
            for (let name in json) {

                let field = this.formUpdate.querySelector(`[name=${name.replace("_", "")}]`);
                
                if (field) {

                    switch (field.type) {
                        case 'file':
                            continue;
                            break;
                        case 'radio':
                            field = this.formUpdate.querySelector(`[name=${name.replace("_", "")}][value='${json[name]}']`);
                            field.checked = true;
                            break;
                        case 'checkbox':
                            field.checked = json[name];
                            break;
                        default:
                            field.value = json[name];
                            break;
                    }

                }
            }

            this.showPanelUpdate();
        });
    }

    showPanelCreate() {
        document.querySelector("#box-employee-create").style.display = "block";
        document.querySelector("#box-employee-update").style.display = "none";
    }

    showPanelUpdate() {
        document.querySelector("#box-employee-create").style.display = "none";
        document.querySelector("#box-employee-update").style.display = "block";
    }
    updateCount() {
        let numberEmployees = 0;
       
        [...this.table.children].forEach((tr) => {
            numberEmployees++;
        });

        document.querySelector("#number-employee").innerHTML = numberEmployees;
    }

    export(){
        
        let aElement = this.formCompany.querySelector("a");
        
        aElement.onclick = () => {

            let company = new Company();
            company.loadFromForm(this.formCompany.querySelectorAll("input"));
            
            let employeesStorage = Employee.getEmployeesStorage();
            
            let csvContent = Util.exportToCsv(employeesStorage, company);
            
            var encodedUri = "data:text/csv;charset=utf-8,";
            encodedUri += encodeURI(csvContent);
    
            aElement.setAttribute("href", encodedUri);
            aElement.setAttribute("download", "arquivo_bem.csv");
   
        };

    }

   


}