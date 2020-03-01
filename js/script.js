console.log('Aplication Started');

// Get Inputs
let inputName = document.querySelector('#name');
let inputAmount = document.querySelector('#amount');
let btnAdd = document.querySelector('#addExpenseBtn');
let btnExpense = document.querySelector('#expenses');

let incomeListDom = document.querySelector('.income-list');
let expenseListDom = document.querySelector('.expense-list');


// Expenses Model
let expenses = {
    inc: {
        list: [],
        total: 0
    },
    exp: {
        list: [],
        total: 0    
    },
    total: 0
};

const EXP_TYPES = {
    inc: 'income',
    exp: 'expense'
}


init();

let arrayIndex = 0;

// Fire events
btnAdd.addEventListener('click', function(){
    if(inputName.value.trim() == '') {
        invalidField(inputName, 'Enter Title');
    } else if(inputAmount.value.trim() == ''){
        invalidField(inputAmount,'Enter amount');
    }else {
        inputAmount.removeAttribute('style');
        inputName.removeAttribute('style');
        addItem(btnExpense.value);
    }
    
});


document.addEventListener('keyup', function(e){
    if(e.keyCode == 13){
        btnAdd.click();
    }
});


// Initialize
function init() {
    inputName.value = '';
    inputAmount.value = '';
    inputName.focus();
    // show list when income have value
    (expenses.inc.list.length> 0) ? incomeListDom.style.display = 'block' : incomeListDom.style.display = 'none';
    (expenses.exp.list.length> 0) ? expenseListDom.style.display = 'block' : expenseListDom.style.display = 'none';
}

function invalidField(input, message) {
    alert(message);
    input.focus();
    input.style.borderBottom = '1px solid red';
}

function addItem(expType) {
    // Get value and put in array of specific array inc or exp
    if(expType === EXP_TYPES.inc){
        arrayIndex++;
        incomeListDom.querySelector('ul').insertAdjacentHTML('afterbegin',`<li id="${arrayIndex-1}"><span>${inputName.value}</span> <strong>${inputAmount.value}</strong> <button onclick="deleteItem(this)">X</button></li>`);
    } else {
        expenseListDom.querySelector('ul').insertAdjacentHTML('afterbegin',`<li><span>${inputName.value}</span> <strong>${inputAmount.value}</strong><button>X</button></li>`)
    }
    addExpenses(expType,inputAmount.value);
}

function deleteItem(item) {
    console.log(item);
    let elemId = item.parentElement.id;
    console.log('elemId',elemId);

    item.parentElement.remove();
    expenses.inc.list.splice(elemId,1);
    calculateExpenses();
    console.log('after deleted', expenses);
    // TODO: Delete from array as well of specific items
    // TOFO: current it has bug and not followinf the corret way
}


function addExpenses(expType,amount){
    // add income/expense to the model
     if(expType === EXP_TYPES.inc){
        expenses.inc.list.push(parseInt(amount));
     } else {
        expenses.exp.list.push(parseInt(amount));
     }
    calculateExpenses();
}

function calculateExpenses() {
   // calculate total
   let totalInc = expenses.inc.list.reduce((a,b) => a+b, 0);
   let totalExp = expenses.exp.list.reduce((a,b) => a+b, 0);

    // assign to model
   expenses.inc.total = totalInc;
   expenses.exp.total = totalExp;
   expenses.total = totalInc-totalExp;

    // Update DOM
    document.querySelector('.grand-total span').textContent = expenses.total;
    document.querySelector('#totalInc span').textContent = totalInc;
    document.querySelector('#totalExp span').textContent = totalExp;
   
   expenseZone(totalInc, totalExp);
   
   console.log('exp', expenses);
   init();
}


function expenseZone(totalInc, totalExp) {
    let totalSectionDom = document.querySelector('.total-section');
    if(totalInc<totalExp) {
        totalSectionDom.classList.add('expense-exceeds');
    } else {
        totalSectionDom.classList.remove('expense-exceeds');
    }
}


// TODO: Common function for calculate
// TODO: Store data
// TODO: Delete specific item from inc or exp
// TODO: Make UI Better - Almost done in v2 and above
// TODO: Save Monthly Wise data
// TODO: Login and sync with API
// TODO: Create App
// TODO: Change color according to Total amount
