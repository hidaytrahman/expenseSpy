import { useStores } from "store";
import { CircularProgressWithLabel } from "core/materialUtils";

const Board = ({progress, totalAmount}) => {
    const { expenseStore } = useStores();
    return (
        <div className="mb-2">
            {expenseStore.expenses && expenseStore.expenses.length > 0 && (
                <div className="col-lg-12">
                    <section className="board">
                        <h3 className="d-flex">
                            {" "}
                            <div style={{ marginRight: "5px" }}>Tracker Board</div>{" "}
                            <CircularProgressWithLabel
                                color="secondary"
                                value={progress}
                            />
                        </h3>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="income-expense-area income">
                                    <strong className="label">Income</strong>
                                    <span className="total-income-amount">
                                        {totalAmount && totalAmount.income}{" "}
                                    </span>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="income-expense-area">
                                    <strong className="label">Expense</strong>
                                    <span className="total-income-amount">
                                        {totalAmount && totalAmount.expense}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* <div className="app-meta-info">
                            <p>NO REGISTRATION REQUIRED</p>
                            <p>We don't store data on server. 🙂</p>
                        </div> */}
                    </section>
                </div>
            )}
        </div>
    )
}

export default Board;