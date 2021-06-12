import { Button, FilledInput, FormControl, FormControlLabel, FormLabel, InputAdornment, InputLabel, Radio, RadioGroup, Select, TextField } from "@material-ui/core";
import { useRef } from "react";
import { useForm } from "react-hook-form";

const AddItem = (props) => {
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
                <div className="col-sm-8 mb-2">
                    <FormControl className="mb-2" fullWidth>
                        <InputLabel htmlFor="age-native-simple">Select Month</InputLabel>
                        <Select

                            native
                            //value={state.age}
                            //onChange={handleChange}
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

                <div className="col-sm-4 mb-2">
                    <h2>Show</h2>
                </div>
            </div>
        </form>
    )
}

export default AddItem;