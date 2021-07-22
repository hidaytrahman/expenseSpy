import { makeAutoObservable } from "mobx";

class expenseStore {
    // get data from browser if already exists and set to initial state
    expenses = localStorage.getItem("expenseTracker") ? JSON.parse(localStorage.getItem("expenseTracker")) : [];

    constructor(rootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this)
    }

    // CREATE //
    addExpense(trackerData) {
        const dataset = {
            type: trackerData.trackerType, //"expense",
            date: {
                month: trackerData.trackerMonth,
                day: new Date().getUTCDate(),
                year: new Date().getFullYear()
            },
            title: trackerData.trackerTitle,
            amount: trackerData.trackerAmount,
            info: trackerData.trackerNotes,
            categories: trackerData.trackerCategory,
            created: new Date()
        }

        this.expenses.push(dataset);

        localStorage.setItem("expenseTracker", JSON.stringify(this.expenses))
    }


    // UPDATE //
    updateExpense(index, newData) {

        const dataset = {
            type: newData.trackerType, //"expense",
            date: {
                month: newData.trackerMonth,
                day: new Date().getUTCDate(),
                year: new Date().getFullYear()
            },
            title: newData.trackerTitle,
            amount: newData.trackerAmount,
            info: newData.trackerNotes,
            categories: newData.trackerCategory,
            created: this.expenses[index].created,
            updated: new Date()
        }

        this.expenses.splice(index, 1, dataset);

        localStorage.setItem("expenseTracker", JSON.stringify(this.expenses))
    }


    // DELETE //
    deleteExpense(index) {
        this.expenses.splice(index, 1);

        localStorage.setItem("expenseTracker", JSON.stringify(this.expenses))
    }


    // GETTER Utils //
    getIncomeList(){
        return  this.expenses.filter((item) => item.type === 'income');
    }

    getExpenseList(){
        return  this.expenses.filter((item) => item.type === 'expense');
    }

}

export default expenseStore;