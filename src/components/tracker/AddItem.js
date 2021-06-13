import { Box, Button, Chip, CircularProgress, FilledInput, FormControl, FormControlLabel, FormLabel, InputAdornment, InputLabel, Radio, RadioGroup, Select, TextField, Typography } from "@material-ui/core";
import { useRef } from "react";
import { useForm } from "react-hook-form";

const AddItem = (props) => {
    const { trackerList, todosCompleted, progress } = props;
    const refTodo = useRef(null);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(' data ', data);
        props.addItem(data);
        refTodo.current.value = "";
        refTodo.current.focus();
    }


    const monthList = [
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
    ]


    const categoryList = [
        "personal",
        "entertainment",
        "bills",
        "utilities",
        "EMI",
        "salary",
        "savings",
        "cash",
        "other"
    ]


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="custom-panel col-sm-6 mb-2">
                    <FormControl className="mb-2" fullWidth>
                        <InputLabel htmlFor="age-native-simple">Select Month</InputLabel>
                        <Select
                            native
                            {...register("trackerMonth", {
                                required: {
                                    value: true,
                                    message: "Please select type"
                                }
                            })}
                        >
                            <option aria-label="None" value="" />
                            {
                                monthList.map((month, index) => {
                                    return (
                                        <option value={month} key={index}>{month}</option>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <FormControl component="fieldset" className="mb-2">
                        <FormLabel component="legend">Type</FormLabel>
                        <RadioGroup aria-label="type" name="type"
                            {...register("trackerType", {
                                required: {
                                    value: true,
                                    message: "Please select type"
                                }
                            })}
                        >
                            <FormControlLabel value="income" control={<Radio />} label="Income" />
                            <FormControlLabel value="expense" control={<Radio />} label="Expense" />
                        </RadioGroup>
                        {errors.trackerType?.type === 'required' &&
                            <span className="alert alert-warning">"Please choose type 😟" </span>}
                    </FormControl>

                    <FormControl className="mb-2" fullWidth>
                        <InputLabel htmlFor="age-native-simple">Select Category</InputLabel>
                        <Select
                            native
                            defaultValue="other"
                            {...register("trackerCategory", {
                                required: {
                                    value: true,
                                    message: "Please select category"
                                }
                            })}
                        >
                            <option aria-label="None" value="" />
                            {
                                categoryList.map((cat, index) => {
                                    return (
                                        <option value={cat} key={index}>{cat}</option>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <TextField
                        className="mb-2"
                        error={errors.trackerTitle?.type === 'required' || errors.trackerTitle?.type === 'maxLength'}
                        label="Enter expense title ? 🤔"
                        helperText={
                            errors.trackerTitle?.type === 'required' && "Title is required 😟" ||
                            errors.trackerTitle?.type === 'maxLength' && "You've exceeds the max limits. Should not be more then 50 letter 🙄"
                        }
                        variant="filled"
                        fullWidth
                        inputRef={refTodo}

                        {...register("trackerTitle", {
                            required: {
                                value: true,
                                message: "Please write what is in your mind? 🤔"
                            }, maxLength: 50
                        })}
                    />

                    <FormControl fullWidth className="mb-2" variant="filled">
                        <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                        <FilledInput
                            id="filled-adornment-amount"
                            //value={values.amount}
                            // onChange={handleChange('amount')}
                            {...register("trackerAmount", {
                                required: {
                                    value: true,
                                    message: "Please select type"
                                }
                            })}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>


                    <TextField
                        id="filled-textarea"
                        label="Notes"
                        placeholder="Placeholder"
                        multiline
                        defaultValue=""
                        fullWidth
                        className="mb-2"
                        variant="filled"
                        {...register("trackerNotes")}
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth
                    >Add</Button>
                </div>

                <div className="col-sm-6 mb-2">
                    {
                        trackerList && trackerList.length > 0 &&
                        <div className="col-lg-12">
                            <section className="todo-board">
                                <h3 className="d-flex"> 📝 <div style={{ marginRight: "5px" }}>Tracker Board</div>  <CircularProgressWithLabel color="secondary" value={progress} /></h3>

                    

                                <div className="row">

                                    <div className="col-6">
                                        <strong>Income : </strong> <span >{trackerList.length} </span>
                                    </div>

                                    <div className="col-6">
                                        <strong>Expense : </strong> <span >{todosCompleted.length}</span>
                                    </div>
                                </div>

                                <hr />

                                <div>
                                    <p>NO REGISTRATION REQUIRED</p>
                                    <p>We don't store data on server. 🙂</p>
                                </div>
                            </section>
                        </div>
                    }
                </div>
            </div>
        </form>
    )
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
export default AddItem;