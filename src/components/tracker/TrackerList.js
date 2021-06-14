import { Button, Card, CardContent, CardHeader, Chip, Collapse, MenuList, ClickAwayListener, MenuItem, Paper, Grow, Popper, IconButton, List, Typography, DialogActions, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { Edit, MoreVert, RemoveRedEyeOutlined } from "@material-ui/icons";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { useEffect, useRef, useState } from "react";
const TrackerList = (props) => {
  const { trackerList, deleteItem } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const anchorRef = useRef(null);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const moreInfoitemHandleToggle = () => {
    setOpenMoreInfo((prevOpen) => !prevOpen);
  };

  const moreInfoitemHandleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenMoreInfo(false);
  };

  function moreInfoitemHandleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenMoreInfo(false);
    }
  }

  

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


  return (
    <div className="list-main-wrapper mt-4 mb-4">
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
                      <div className="amount-title d-flex align-items-center justify-content-end">
                        <span className="m-2">{expense.title}</span>

                        <Chip color="secondary" label={expense.categories} size="small" />

                        <Button
                          ref={anchorRef}
                          aria-controls={openMoreInfo ? 'menu-list-grow' : undefined}
                          aria-haspopup="true"
                          onClick={moreInfoitemHandleToggle}
                        >
                          <MoreVert />
                        </Button>
                        <Popper open={openMoreInfo}
                          anchorEl={anchorRef.current}
                          ole={undefined} transition disablePortal>
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={moreInfoitemHandleClose}>
                                  <MenuList autoFocusItem={openMoreInfo} id="menu-list-grow"
                                    onKeyDown={moreInfoitemHandleListKeyDown}
                                  >
                                    <MenuItem onClick={moreInfoitemHandleClose}><Edit /> Edit</MenuItem>
                                    <MenuItem onClick={handleClickOpen}><RemoveRedEyeOutlined /> More</MenuItem>
                                    <MenuItem onClick={() => deleteItem(index)}><DeleteSharpIcon /> Delete</MenuItem>
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>


                      </div>


                    </div>

                  </div>

                </CardContent>
                <Dialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <DialogTitle id="customized-dialog-title"
                    onClose={handleClose}
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