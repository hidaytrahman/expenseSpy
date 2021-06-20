export const monthList = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
];


// Date utils
const date = new Date();
// get date as a string
export const currentMonth = monthList[date.getMonth()];

// get date as a string by calling a method
export const getCurrentMonthName = () => monthList[date.getMonth()];