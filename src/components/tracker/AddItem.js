import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { monthList, currentMonth } from "../../core/date";

const AddItem = (props) => {
  const { trackerList, progress } = props;
  const refTodo = useRef(null);
  const [totalExpense, setTotalExpense] = useState(null);

  const [trackerMonth, setTrackerMonth] = useState(currentMonth);
  const [trackerType, setTrackerType] = useState("income");
  const [trackerCategory, setTrackerCategory] = useState("bills");
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

      props.addItem(trackerData);
      
      setTrackerTitle("");
      refTodo.current.value= "";
      refTodo.current.focus();

      setMessage("");
    } else {
      setMessage("Title and Amount are required!");
    }
  };

  const categoryList = [
    "personal",
    "entertainment",
    "bills",
    "utilities",
    "EMI",
    "salary",
    "savings",
    "cash",
    "other",
  ];

  useEffect(() => {

    const incomeAmountList = trackerList
      .filter((item) => item.type === "income")
      .map((item) => parseInt(item.amount));

    const expenseAmountList = trackerList
      .filter((item) => item.type === "expense")
      .map((item) => parseInt(item.amount));

    const totalIncome = incomeAmountList.reduce((a, b) => a + b, 0);
    const totalExpenses = expenseAmountList.reduce((a, b) => a + b, 0);

    setTotalExpense({ income: totalIncome, expense: totalExpenses });
    console.log(" amounts ", totalIncome);
    console.log(" totalExpense ", totalExpense);
  }, [trackerList]);

  return (
    <form onSubmit={onSubmit}>
      {message && <div className="alert alert-danger">{ message }</div>}
      <div className="row">
        <div className="custom-panel col-sm-6 mb-2">
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
              {categoryList.map((cat, index) => {
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
            label="Enter expense title ? 🤔"
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
            Add
          </Button>
        </div>

        <div className="col-sm-6 mb-2">
          {trackerList && trackerList.length > 0 && (
            <div className="col-lg-12">
              <section className="todo-board">
                <h3 className="d-flex">
                  {" "}
                  📝 <div style={{ marginRight: "5px" }}>
                    Tracker Board
                  </div>{" "}
                  <CircularProgressWithLabel
                    color="secondary"
                    value={progress}
                  />
                </h3>

                <div className="row">
                  <div className="col-6">
                    <strong>Income : </strong>{" "}
                    <span>{totalExpense && totalExpense.income} </span>
                  </div>

                  <div className="col-6">
                    <strong>Expense : </strong>{" "}
                    <span>{totalExpense && totalExpense.expense}</span>
                  </div>
                </div>

                <hr />

                <div>
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

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
export default AddItem;
