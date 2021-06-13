import { Card, CardContent, CardHeader, Chip, Collapse, IconButton, List, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
const TrackerList = (props) => {
    const { trackerList, deleteItem } = props;

    return (
        <div>
            <List className="list-wrapper">
                {
                    trackerList &&
                    trackerList.map((expense, index) => {
                        return (
                            <Card className="">
                                <CardContent>
                                    <div>
                                    {`₹ ${expense.amount}`}
                                    {expense.categories}
                                    </div>
                                    <Chip color="secondary" label="hidayt" size="small" />

                                    <div>
                                            <IconButton aria-label="settings">
                                                <ExpandMore />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="comments" onClick={() => deleteItem(index)}>
                                                <DeleteSharpIcon />
                                            </IconButton>
                                        </div>
                                </CardContent>
                                <Collapse
                                    //in={expanded}
                                    timeout="auto" unmountOnExit
                                >
                                    <CardContent>

                                        <Typography paragraph>
                                            {expense.info}</Typography>
                                            

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