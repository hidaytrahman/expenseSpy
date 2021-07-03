import { Card, CardContent, Chip,  IconButton, List } from "@material-ui/core";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { observer } from "mobx-react-lite";
import { useStores } from "store";

const TrackerList = () => {
  const { expenseStore } = useStores(); 

  return (
    <div className="list-main-wrapper mb-4">
      <h2>Expense List</h2>
      <List className="list-wrapper">
        {
          expenseStore.expenses &&
          expenseStore.expenses.map((expense, index) => {
            return (
              <Card key={index} className={(expense.type === 'income') ? "income-list-item": "expense-list-item"}>
                <CardContent>
                  <div className="list-header row">
                    <div className="col-sm-4 amount">
                      {`₹ ${expense.amount}`}
                    </div>

                    <div className="col-sm-8">
                      <div className="amount-title d-flex align-items-center justify-content-end">
                        <span className="m-2">{expense.title}</span>

                        <Chip color="secondary" label={expense.categories} size="small" />

                        {/* <IconButton>
                          <RemoveRedEyeRounded />
                        </IconButton> */}
                        <IconButton
                          onClick={() => expenseStore.deleteExpense(index)}>
                          <DeleteSharpIcon />
                        </IconButton>
                      </div>


                    </div>

                  </div>

                  <div className="more-info-wrapper">
                    <h6>{expense.info}</h6>
                    <p><small>{expense.date.day} | {expense.date.month} | {expense.date.year}</small></p>
                  </div>

                </CardContent>


              </Card>

            )
          })
        }
      </List>
    </div >


  )
}

export default observer(TrackerList);