import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import { useEffect, useState } from "react";

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);


    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");

        if (currentTheme === "dark") {
            document.body.classList.add("dark-theme");
            setDarkMode(true);
        } else {
            setDarkMode(false);
            document.body.classList.remove("dark-theme");
        }
    }, [darkMode]);



    const toggleChecked = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-theme");
        const theme = document.body.classList.contains("dark-theme")
            ? "dark"
            : "light";
        localStorage.setItem("theme", theme);
    }


    return (
        <header className="main-header">
            <div className="container">
                <div className="row">
                    <div className="col-sm-10">
                        <h1>💰 Expense Spy 🕵️  </h1>
                       
                    </div>
                    <div className="col-sm-2 d-none">
                        <FormGroup className="d-flex align-items-end">
                            <FormControlLabel
                                control={<Switch checked={darkMode}
                                    onChange={toggleChecked}
                                />}
                                label="Dark Mode"
                            />
                        </FormGroup>
                    </div>
                </div>



            </div>

        </header>
    )
}

export default Header;