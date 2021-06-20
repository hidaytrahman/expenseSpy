import { Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddItem from './AddItem';
import TrackerList from './TrackerList';
import "./Tracker.scss";
import useProgress from 'hooks/useProgress';
import { getTotalAmount } from "core/utils";

function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
        </Box>
    );
}



const Tracker = () => {

    // get data from browser if already exists and set to initial state
    const trackerListOnStorage = localStorage.getItem("expenseTracker") ? JSON.parse(localStorage.getItem("expenseTracker")) : [];

    const [trackerList, setTrackerList] = useState([...trackerListOnStorage]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [expenseList, setExpenseList] = useState([]);
    const [incomeList, setIncomeList] = useState([]);
    const totalAmount = getTotalAmount(trackerList);

    // get completed todos
    const todosCompleted = (trackerList && trackerList.length > 0) ? trackerList.filter((todo) => todo.completed === true) : []

    const progress = useProgress(todosCompleted.length, trackerList.length)

    // edit item
    const addItem = (trackerData) => {
        console.log(' trackerData ', trackerData);

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

        console.log(' dataset ', dataset);
        setTrackerList([...trackerList, dataset]);
        localStorage.setItem("expenseTracker", JSON.stringify(trackerList))
    }

    // delete item
    const deleteItem = (index) => {
        trackerList.splice(index, 1);
        setTrackerList([...trackerList]);
        localStorage.setItem("expenseTracker", JSON.stringify(trackerList))
    }

    // todo edit item
    const editTrackerItem = (index, title) => {
        trackerList.splice(index, 1, { title: title, completed: false });
        setTrackerList([...trackerList]);
        localStorage.setItem("expenseTracker", JSON.stringify(trackerList))
    }

    useEffect(() => {
        // filter income and expense
        const _incomeList = trackerList.filter((item) => item.type === 'income');
        const _expenseList = trackerList.filter((item) => item.type === 'expense');

        setIncomeList(_incomeList)
        setExpenseList(_expenseList)


    }, [trackerList]);


    return (
        <section className="tracker-wrapper">

            <div className="container">
                <div className="custom-progressbar">
                    <LinearProgressWithLabel value={progress} color="secondary" />
                </div>

                <AddItem
                    addItem={addItem}
                    trackerList={trackerList}
                    todosCompleted={todosCompleted}
                    progress={progress}
                    totalAmount={totalAmount}
                />

                <div className="row">
                    <div className="col-lg-8">

                        {
                            trackerList && trackerList.length > 0 ?
                                <TrackerList
                                    trackerList={trackerList}
                                    deleteItem={deleteItem}
                                    editTrackerItem={editTrackerItem}
                                />

                                : <div className="alert alert-info">What are you thinking, Add your first expense? 😉</div>
                        }

                    </div>
                </div>

            </div>

        </section>
    )
}

export default Tracker;