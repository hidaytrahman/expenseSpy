import { Button, Card, CardContent, CardHeader, Chip, Collapse, MenuList, ClickAwayListener, MenuItem, Paper, Grow, Popper, IconButton, List, Typography, DialogActions, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { Edit, MoreVert, RemoveRedEyeOutlined, RemoveRedEyeRounded } from "@material-ui/icons";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { useEffect, useRef, useState } from "react";
const TrackerList = (props) => {
  const { trackerList, deleteItem } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);


  };

  const openMoreInfo = (data) => {
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title"
          onClose={handleClose}
        >
          {data.title}
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
    )
  }

  const handleClose = () => {
    setOpen(false);
  };

  const anchorRef = useRef(null);



  return (
    <div className="list-main-wrapper mt-4 mb-4">
      <h2>Expense List</h2>
      <List className="list-wrapper">
        {
          trackerList &&
          trackerList.map((expense, index) => {
            return (
              <Card className={(expense.type === 'income') ? "income-list-item": "expense-list-item"}>
                <CardContent>
                  <div className="list-header row">
                    <div className="col-sm-4 amount">
                      {`₹ ${expense.amount}`}
                    </div>

                    <div className="col-sm-8">
                      <div className="amount-title d-flex align-items-center justify-content-end">
                        <span className="m-2">{expense.title}</span>

                        <Chip color="secondary" label={expense.categories} size="small" />

                        <IconButton
                          onClick={handleClickOpen}>
                          <RemoveRedEyeRounded />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteItem(index)}>
                          <DeleteSharpIcon />
                        </IconButton>
                      </div>


                    </div>

                  </div>

                  <div className="more-info-wrapper">
                    <h6>{expense.info}</h6>
                    <p><small>{expense.date.day} | {expense.date.month} | {expense.date.year}</small></p>
                  </div>

                </CardContent>


              </Card>

            )
          })
        }
      </List>
    </div >


  )
}

export default TrackerList;