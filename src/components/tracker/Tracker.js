
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { LinearProgressWithLabel } from 'core/materialUtils';
import { Button } from '@material-ui/core';

import AddItem from './AddItem';
import TrackerList from './TrackerList';
import "./Tracker.scss";
import useProgress from 'hooks/useProgress';
import { getTotalAmount } from "core/utils";
import { useStores } from 'store';



const Tracker = () => {
    const { expenseStore } = useStores();
    
    const [showList, setShowList] = useState(false);
    const totalAmount = getTotalAmount(expenseStore.expenses);

    const progress = useProgress(totalAmount.expense, totalAmount.income);

    return (
        <section className="tracker-wrapper">
            <div className="container">
                <div className="row d-flex justify-content-end mb-2">

                    <div className="col-sm-4 d-flex justify-content-end">
                        <Button type="submit" variant="contained" color="primary" onClick={() => {
                            (showList) ? setShowList(false) : setShowList(true)

                        }}>
                            {(showList) ? 'Add New' : 'Show List'}
                        </Button>
                    </div>

                </div>

            </div>

            <div className="container">
                <div className="custom-progressbar">
                    <LinearProgressWithLabel value={progress} color="primary" />
                </div>

                {
                    !showList && <AddItem
                        progress={progress}
                        totalAmount={totalAmount}
                    />
                }


                <div className="row">
                    <div className="col-lg-8">

                        {
                            expenseStore.expenses && expenseStore.expenses.length > 0 ?
                                showList &&
                                <TrackerList />

                                : <div className="alert alert-info">What are you thinking, Add your first expense? 😉</div>
                        }

                    </div>
                </div>

            </div>

        </section>
    )
}

export default observer(Tracker);