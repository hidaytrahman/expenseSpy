import { Button, Card, CardContent, CardHeader, Chip, Collapse, IconButton, List, Typography, DialogActions, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { RemoveRedEyeOutlined } from "@material-ui/icons";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { useState } from "react";
const TrackerList = (props) => {
  const { trackerList, deleteItem } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
                    <div className="col-sm-4 amount">
                      {`₹ ${expense.amount}`}
                    </div>

                    <div className="col-sm-8">
                      <div className="amount-title d-flex align-items-center justify-content-evenly">
                        <span className="mr-2">{expense.title}</span>

                        <Chip color="secondary" label={expense.categories} size="small" />

                        <IconButton
                          onClick={handleClickOpen}>
                          <RemoveRedEyeOutlined />
                        </IconButton>
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
                <Dialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <DialogTitle id="customized-dialog-title"
                  //onClose={handleClose}
                  >
                    Modal title
                  </DialogTitle>
                  <DialogContent dividers>
                    <Typography gutterBottom>
                      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                      in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                      Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                      lacus vel augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                      Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                      scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                      auctor fringilla.
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus
                      onClick={handleClose}
                      color="primary">
                      Save changes
                    </Button>
                  </DialogActions>
                </Dialog>
              </Card>

            )
          })
        }
      </List>
    </div >


  )
}

export default TrackerList;