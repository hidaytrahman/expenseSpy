import { makeAutoObservable } from "mobx";

class expenseStore {
    expenses = localStorage.getItem("expenseTracker") ? JSON.parse(localStorage.getItem("expenseTracker")) : [];;

    constructor(rootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this)
    }

    addExpense(trackerData) {
        const dataset = {
            type: trackerData.trackerType, //"expense",
            date: {
                month: trackerData.trackerMonth,
                day: new Date().getUTCDay(),
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

    deleteExpense(index) {
        this.expenses.splice(index, 1);
        
        localStorage.setItem("expenseTracker", JSON.stringify(this.expenses))
    }


}

export default expenseStore;