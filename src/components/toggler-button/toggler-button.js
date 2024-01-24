import { ButtonToggle } from "../button/button";
import { ThemeContext, themes } from "../../contexts/toggler";
import React, {useContext} from "react";




export const ThemeTogglerButton = () => {
    const {theme, setTheme} = useContext(ThemeContext);

    return  (
        <div>

            <ButtonToggle onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}> Toggle Theme </ButtonToggle>
 
        </div>
        )
}

