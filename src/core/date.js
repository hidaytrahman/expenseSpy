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

const d = new Date();

export const currentMonth = monthList[d.getMonth()];

export const getCurrentMonthName = () => {
    const d = new Date();

    return monthList[d.getMonth()];
}