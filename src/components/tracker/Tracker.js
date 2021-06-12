import { Box, Chip, CircularProgress, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddItem from './AddItem';
import TodoList from './TodoList';
import "./Todo.css";
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
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
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

                {
                    trackerList && trackerList.length > 0 &&
                    <div className="col-lg-4">
                        <section className="todo-board">
                            <h3 className="d-flex"> 📝 <div style={{ marginRight: "5px" }}>Tracker Board</div>  <CircularProgressWithLabel color="secondary" value={progress} /></h3>

                            <hr />
                            <small>
                                ( <span>List</span> <span> {todosCompleted.length} / {trackerList.length}</span> )
                            </small>
                            <hr />

                            <div className="row">

                                <div className="col-6">
                                    <strong>All : </strong> <Chip color="primary" label={trackerList.length} />
                                </div>

                                <div className="col-6">
                                    <strong>Done : </strong> <Chip color="secondary" label={todosCompleted.length} />
                                </div>
                            </div>

                            <hr />

                            <div>
                                <p>We don't store data on server. 🙂</p>
                            </div>
                        </section>
                    </div>
                }



            </div>

        </section>
    )
}

export default Tracker;