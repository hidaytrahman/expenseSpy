import { Box, Chip, CircularProgress, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddItem from './AddItem';
import TodoList from './TodoList';
import "./Tracker.css";
import "../../theme.css";
import useProgress from 'hooks/useProgress';

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
    const todosOnStorage = localStorage.getItem("expenseTracker") ? JSON.parse(localStorage.getItem("expenseTracker")) : [];

    const [trackerList, setTrackerList] = useState([...todosOnStorage]);

    // get completed todos
    const todosCompleted = (trackerList && trackerList.length > 0) ? trackerList.filter((todo) => todo.completed === true) : []

    const progress = useProgress(todosCompleted.length, trackerList.length)

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

    const deleteTodoItem = (index) => {
        trackerList.splice(index, 1);
        setTrackerList([...trackerList]);
        localStorage.setItem("expenseTracker", JSON.stringify(trackerList))
    }

    const editTodoItem = (index, title) => {
        trackerList.splice(index, 1, { title: title, completed: false });
        setTrackerList([...trackerList]);
        localStorage.setItem("expenseTracker", JSON.stringify(trackerList))
    }

    const markTodoAsCompleted = (index, title) => {
        // basic modification
        trackerList.splice(index, 1, {
            completed: true,
            title
        });

        // and setting to the main states with spread
        setTrackerList([...trackerList]);
        localStorage.setItem("expenseTracker", JSON.stringify(trackerList))
    }


    return (
        <section className="container todo-wrapper">
            <div className="custom-progressbar">
                <LinearProgressWithLabel value={progress} color="secondary" />
            </div>

            <AddItem
                addItem={addItem}
                trackerList={trackerList}
                todosCompleted={todosCompleted}
                progress={progress}
            />

            <div className="row">
                <div className="col-lg-8">

                    {
                        trackerList && trackerList.length > 0 ?
                            <TodoList
                                trackerList={trackerList}
                                deleteTodoItem={deleteTodoItem}
                                markTodoAsCompleted={markTodoAsCompleted}
                                editTodoItem={editTodoItem}
                            />

                            : <div className="alert alert-info">What are you thinking, Add your first expense? 😉</div>
                    }

                </div>

               



            </div>

        </section>
    )
}

export default Tracker;