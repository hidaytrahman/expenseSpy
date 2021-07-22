import { createContext, useContext } from "react";
import expenseStore from "./expenseStore";

class RootStore {
    constructor() {
        this.expenseStore = new expenseStore(this);
    }
}

const StoresContext = createContext(new RootStore());

export const useStores = () => useContext(StoresContext);