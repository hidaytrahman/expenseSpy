import { Card, CardContent, Chip, IconButton, List, Button } from "@material-ui/core";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { observer } from "mobx-react-lite";
import { useStores } from "store";
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from "react";

const TrackerList = ({ setExpandList, expandList }) => {
  const { expenseStore } = useStores();

  const [sortBy, setSortBy] = useState('');

  return (
    <div className="list-main-wrapper mb-4">
      <div className="controls-container">
        <h2>Expense List <small>({expenseStore.expenses.length})</small></h2>
        <div className="controls">
          <div className="list-control">
            <Button type="submit" className="m-2" variant="contained" color="secondary"
              onClick={() => {
                setSortBy('');
              }}>
              All
            </Button>

            {
              expenseStore.getIncomeList().length > 0 &&
              <Button type="submit" className="m-2" variant="contained" color="secondary"
                onClick={() => {
                  setSortBy('income');
                }}>
                Incomes
              </Button>
            }


            {
              expenseStore.getExpenseList().length > 0 &&
              <Button type="submit" className="m-2" variant="contained" color="secondary"
                onClick={() => {
                  setSortBy('expense');
                }}>
                Expenses
              </Button>
            }

          </div>
        </div>

        <IconButton className="d-none control-expend-btn d-lg-block" onClick={() => setExpandList(!expandList)}> {(expandList) ? <FullscreenExitIcon /> : <AspectRatioIcon />}</IconButton>

      </div>

      <List className="list-wrapper">
        {
          expenseStore.expenses &&
          expenseStore.expenses.filter(exp => exp.type.includes(sortBy)).map((expense, index) => {
            return (
              <Card key={index} className={(expense.type === 'income') ? "income-list-item" : "expense-list-item"}>
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