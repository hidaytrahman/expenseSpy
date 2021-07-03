import {
  Button,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";

import { useRef, useState } from "react";
import { monthList, currentMonth } from "../../core/date";
import { trackerCategoryList } from "core/constant";
import { CircularProgressWithLabel } from "core/materialUtils";
import { useStores } from "store";
import { observer } from "mobx-react-lite";


const AddItem = (props) => {
  const { expenseStore } = useStores(); 

  const { progress, totalAmount } = props;
  const refTodo = useRef(null);

  const [trackerMonth, setTrackerMonth] = useState(currentMonth);
  const [trackerType, setTrackerType] = useState("income");
  const [trackerCategory, setTrackerCategory] = useState(
    trackerCategoryList[trackerType][0]
  );
  const [trackerTitle, setTrackerTitle] = useState("");
  const [trackerAmount, setTrackerAmount] = useState(0);
  const [trackerNotes, setTrackerNotes] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (trackerAmount && trackerTitle) {
      const trackerData = {
        trackerType,
        trackerMonth,
        trackerTitle,
        trackerAmount,
        trackerCategory,
        trackerNotes,
      };

      console.log(" trackerData ", trackerData);

      expenseStore.addExpense(trackerData);

      setTrackerTitle("");
      refTodo.current.value = "";
      refTodo.current.focus();

      setMessage("");
    } else {
      setMessage("Title and Amount are required!");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className={`custom-panel  mb-2 ${(expenseStore.expenses && expenseStore.expenses.length === 0) ? 'col-sm-12' : 'col-sm-6'}`}>
          <div className="emoji-expresion">
            {trackerType === "income" ? <span>🤑</span> : <span>😑</span>}
          </div>
          <FormControl className="mb-2" fullWidth>
            <InputLabel htmlFor="age-native-simple">Month</InputLabel>
            <Select
              native
              defaultValue={trackerMonth}
              onChange={(e) => setTrackerMonth(e.target.value)}
            >
              <option aria-label="None" value="" />
              {monthList.map((month, index) => {
                return (
                  <option value={month} key={index}>
                    {month}
                  </option>
                );
              })}
            </Select>
          </FormControl>

          <FormControl component="fieldset" className="mb-2">
            <FormLabel component="legend">Type</FormLabel>
            <RadioGroup
              aria-label="type"
              defaultValue={trackerType}
              onChange={(e) => {
                setTrackerType(e.target.value);
              }}
            >
              <FormControlLabel
                value="income"
                control={<Radio />}
                label="Income"
              />
              <FormControlLabel
                value="expense"
                control={<Radio />}
                label="Expense"
              />
            </RadioGroup>
          </FormControl>

          <FormControl className="mb-2" fullWidth>
            <InputLabel htmlFor="age-native-simple">Select Category</InputLabel>
            <Select
              native
              defaultValue={trackerCategory}
              onChange={(e) => setTrackerCategory(e.target.value)}
            >
              <option aria-label="None" value="" />
              {trackerCategoryList[trackerType].map((cat, index) => {
                return (
                  <option value={cat} key={index}>
                    {cat}
                  </option>
                );
              })}
            </Select>
          </FormControl>

          <TextField
            className="mb-2"
            label={`Enter ${trackerType} title ?`}
            variant="filled"
            fullWidth
            inputRef={refTodo}
            defaultValue={trackerTitle}
            onChange={(e) => setTrackerTitle(e.target.value)}
          />

          <FormControl fullWidth className="mb-2" variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
            <FilledInput
              type="number"
              id="filled-adornment-amount"
              defaultValue={trackerAmount}
              onChange={(e) => setTrackerAmount(e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>

          <TextField
            id="filled-textarea"
            label="Notes"
            placeholder="Placeholder"
            multiline
            defaultValue={trackerNotes}
            onChange={(e) => setTrackerNotes(e.target.value)}
            fullWidth
            className="mb-2"
            variant="filled"
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add {trackerType}
          </Button>

          {message && <div className="alert alert-danger mt-2">{message}</div>}
        </div>

        <div className="col-sm-6 mb-2">
          {expenseStore.expenses && expenseStore.expenses.length > 0 && (
            <div className="col-lg-12">
              <section className="todo-board">
                <h3 className="d-flex">
                  {" "}
                  <div style={{ marginRight: "5px" }}>Tracker Board</div>{" "}
                  <CircularProgressWithLabel
                    color="secondary"
                    value={progress}
                  />
                </h3>

                <div className="row">
                  <div className="col-6">
                    <div className="income-expense-area">
                      <strong className="label">Income</strong>
                      <span className="total-income-amount">
                        {totalAmount && totalAmount.income}{" "}
                      </span>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="income-expense-area">
                      <strong className="label">Expense</strong>
                      <span className="total-income-amount">
                        {totalAmount && totalAmount.expense}
                      </span>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="app-meta-info">
                  <p>NO REGISTRATION REQUIRED</p>
                  <p>We don't store data on server. 🙂</p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};


export default observer(AddItem);
