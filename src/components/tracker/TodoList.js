import { Button, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Radio } from "@material-ui/core";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { useRef, useState } from "react";
const TodoList = (props) => {
    const { trackerList, deleteTodoItem, markTodoAsCompleted, editTodoItem } = props;
    const [editFormStatus, setEditFormStatus] = useState(false);
    const [selectedListIndex, setSelectedListIndex] = useState(0);
    const editTodoInput = useRef(null);

    const editFormSubmit = (e) => {
        e.preventDefault();

        editTodoItem(selectedListIndex, editTodoInput.current.value);
        setSelectedListIndex(0);
        setEditFormStatus(false);
    }


    // create dynamic form for edit todo item
    const createEditFrom = () => {
        return (
            <div className="editFormWrapper">
                <form onSubmit={(e) => editFormSubmit(e)}>
                    <input type="text" defaultValue={trackerList[selectedListIndex].title} className="custom-input" ref={editTodoInput} />
                    <Button type="submit" variant="contained" color="primary"
                    >Update</Button>
                </form>
            </div >
        )
    }

    return (
        <div>
            <List className="todo-list-wrapper">

                {
                    trackerList &&
                    trackerList.map((todo, index) => {
                        return (
                            <ListItem role={undefined} dense button key={index}
                                onDoubleClick={() => {
                                    setEditFormStatus(true);
                                    setSelectedListIndex(index)
                                }}

                                className={todo.completed && "todo-completed"}
                            >

                                {
                                    editFormStatus && index === selectedListIndex &&
                                    createEditFrom()
                                }

                                <ListItemIcon>
                                    <Radio
                                        color="primary"
                                        checked={todo.completed}
                                        disabled={todo.completed}
                                        onChange={() => markTodoAsCompleted(index, todo.title)}
                                        value={true}
                                        variant="secondary"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />
                                </ListItemIcon>
                                <ListItemText style={{ textDecoration: todo.completed && "line-through" }}>{todo.title}</ListItemText>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments" onClick={() => deleteTodoItem(index)}>
                                        <DeleteSharpIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })
                }
            </List>

            <small>Double click to edit</small>
        </div>


    )
}

export default TodoList;