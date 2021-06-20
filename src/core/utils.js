// get income amount list
export const getIncomeAmountList = (trackerList) => {
  const incomeAmountList = trackerList
    .filter((item) => item.type === "income")
    .map((item) => parseInt(item.amount));

  return incomeAmountList;
};



// get expense amount list
export const getExpenseAmountList = (trackerList) => {
  const expenseAmountList = trackerList
    .filter((item) => item.type === "expense")
    .map((item) => parseInt(item.amount));

  return expenseAmountList;
};



// get total amount of income and expense
export const getTotalAmount = (trackerList) => {
  return {
    income: getIncomeAmountList(trackerList).reduce((a, b) => a + b, 0),
    expense: getExpenseAmountList(trackerList).reduce((a, b) => a + b, 0),
  };
};



// all income and expense amount list and total
export const getTrackerData = (trackerList) => {
  const _incomeList = getIncomeAmountList(trackerList);
  const _expenseList = getExpenseAmountList(trackerList);
  return {
    income: {
      list: _incomeList,
      total: _incomeList.reduce((a, b) => a + b, 0),
    },

    expense: {
      list: _expenseList,
      total: _expenseList.reduce((a, b) => a + b, 0),
    },
  };
};
