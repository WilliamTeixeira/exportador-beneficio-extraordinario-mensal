/**
 * Author: William Teixeira
 * Website: https://williamteixeira.github.io/
 * 
 */

class Util {

    static exportToCsv(employees, company) {

        let csvContent = '\"Tipo Inscricao\";\"CNPJ/CEI\";\"CNO\";\"Data Admissao\";\"CPF Trabalhador\";\"PIS/PASEP Trabalhador\";\"Nome Trabalhador\";\"Nome Mae Trabalhador\";\"Data Nascimento Trabalhador\";\"Tipo Adesao\";\"Data Acordo\";\"Percentual Reducao Carga Horaria\";\"Meses Duracao\";\"Codigo Banco\";\"Agencia Bancaria\";\"DV Agencia Bancaria\";\"Conta Bancaria\";\"DV Conta Bancaria\";\"Tipo Conta\";\"Ultimo Salario\";\"Penultimo Salario\";\"Antepenultimo Salario\"';
        csvContent += '\r\n';

        employees.map(dataEmployee => {

            let employee = new Employee();
            employee.loadFromJSON(dataEmployee);

            csvContent +=
                '\"' + company.registertype + '\";' +
                '\"' + Util.removeFormat(company.cnpjcei) + '\";' +
                '\"' + Util.removeFormat(company.cno) + '\";' +

                '\"' + new Date(employee.admissiondate).toLocaleDateString() + '\";' +
                '\"' + Util.removeFormat(employee.cpf) + '\";' +
                '\"' + Util.removeFormat(employee.pispasep) + '\";' +
                '\"' + employee.name + '\";' +
                '\"' + employee.namemother + '\";' +
                '\"' + new Date(employee.birth).toLocaleDateString() + '\";' +
                '\"' + employee.accessiontype + '\";' +
                '\"' + new Date(employee.agreementdate).toLocaleDateString() + '\";' +
                '\"' + Util.removeFormat(employee.percent) + '\";' +
                '\"' + employee.monthlong + '\";' +
                '\"' + employee.bankcode + '\";' +
                '\"' + employee.bankagency + '\";' +
                '\"' + employee.dvbankagency + '\";' +
                '\"' + employee.accountbank + '\";' +
                '\"' + employee.dvaccountbank + '\";' +
                '\"' + employee.accountype + '\";' +
                '\"' + Util.removeFormat(employee.lastsalary) + '\";' +
                '\"' + Util.removeFormat(employee.penultimatesalary) + '\";' +
                '\"' + Util.removeFormat(employee.prepenultimatepalary) + '\"';

            csvContent += '\r\n';

        });

        return csvContent;
    }

    static cnpjCeiFormat(i){
        var v = i.value.replace(/\D/g, '');
        
        if(v.length <= 12){
            v = v.replace(/^(\d{2})(\d{3})(\d{5})(\d{2})/g, "$1.$2.$3/$4");
        }else{
            v =  v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
        }

        i.value = v;
    }

    static cnoFormat(i){

        var v = i.value.replace(/\D/g, '');

        v = v.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        
        i.value = v;
    }

    static cpfFormat(i){

        var v = i.value.replace(/\D/g, '');
        
        v = v.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        
        i.value = v;
    }

    static reaisFormat(i) {
        var v = i.value.replace(/\D/g, '');
        v = (v / 100).toFixed(2) + '';
        v = v.replace(".", ",");
        v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
        v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
        i.value = v;
    }

    static removeFormat(str){
        str = str.split(".").join("");
        str = str.split("/").join("");
        str = str.split("-").join("");
        str = str.split(",").join("");
        return str;

    }

    static showDivExport() {
        document.querySelector("#box-export").style.display = "block";
        document.querySelector("#box-faq").style.display = "none";
    }

    static showDivFaq() {
        document.querySelector("#box-export").style.display = "none";
        document.querySelector("#box-faq").style.display = "block";
    }

    static scrollTop(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}