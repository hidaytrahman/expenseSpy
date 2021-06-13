import { Card, CardContent, CardHeader, Chip, Collapse, IconButton, List, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
const TrackerList = (props) => {
    const { trackerList, deleteItem } = props;

    return (
        <div>
            <h2>Expense List</h2>
            <List className="list-wrapper">
                {
                    trackerList &&
                    trackerList.map((expense, index) => {
                        return (
                            <Card className="">
                                <CardContent>
                                    <div className="list-header row">
                                        <div className="col-6 amount">
                                            {`₹ ${expense.amount}`}
                                        </div>

                                        <div className="col-6">
                                            <div className="amount-title d-flex align-items-center justify-content-evenly">
                                                <span className="mr-2">{expense.title}</span>

                                                <Chip color="secondary" label={expense.categories} size="small" />

                                                <IconButton edge="end" aria-label="comments" onClick={() => deleteItem(index)}>
                                                    <DeleteSharpIcon />
                                                </IconButton>
                                            </div>


                                        </div>

                                    </div>

                                    <div className="list-content">
                                        {/* <IconButton aria-label="settings">
                                            <ExpandMore />
                                        </IconButton> */}
                                        
                                    </div>

                                </CardContent>

                                <Collapse
                                    //in={expanded}
                                    timeout="auto" unmountOnExit
                                >
                                    <CardContent>
                                        {expense.info}
                                    </CardContent>
                                </Collapse>
                            </Card>

                        )
                    })
                }
            </List>
        </div>


    )
}

export default TrackerList;