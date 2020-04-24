/**
 * Author: William Teixeira
 * Website: https://williamteixeira.github.io/
 */

import EmployeeController from './controller/EmployeeController';
import Util from './util/Util';

new EmployeeController("form-employee-create", "form-employee-update", "list-employee", "box-company");


const elScrollTop = document.getElementById("scrolltop");
elScrollTop.onclick = Util.scrollTop;

const elDivExport = document.getElementById('divexport');
elDivExport.onclick =  Util.showDivExport;

const elDivFaq = document.getElementById('divfaq');
elDivFaq.onclick = Util.showDivFaq;

const elInputCnpjCei = document.getElementById('inputCnpjCei');
elInputCnpjCei.onkeyup = () => Util.cnpjCeiFormat(elInputCnpjCei);

const elInputCNO = document.getElementById('inputCNO');
elInputCNO.onkeyup = () => Util.cnoFormat(elInputCNO);

const arrayElInputCpf = document.querySelectorAll(".inputCpf");
arrayElInputCpf.forEach(e => {
    e.onkeyup = () => Util.cpfFormat(e);
});

const arrayElInputLastSalary = document.querySelectorAll('.inputLastSalary');
arrayElInputLastSalary.forEach(e => {
    e.onkeyup = () => Util.reaisFormat(e);
});


const arrayElInputPenultimateSalary = document.querySelectorAll('.inputPenultimateSalary');
arrayElInputPenultimateSalary.forEach(e => {
    e.onkeyup = () => Util.reaisFormat(e);
});

const arrayElInputPrePenultimateSalary = document.querySelectorAll('.inputPrePenultimateSalary');
arrayElInputPrePenultimateSalary.forEach(e => {
    e.onkeyup = () => Util.reaisFormat(e);
});


