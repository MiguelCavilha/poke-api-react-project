import { ButtonToggle } from "../button/button";
import { ThemeContext, themes } from "../../contexts/toggler";
import React, {useContext} from "react";
import { styled } from 'styled-components';




export const ThemeTogglerButton = () => {
    const {theme, setTheme} = useContext(ThemeContext);

    return  (
        <Div>

            <ButtonToggle onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}> Toggle Theme </ButtonToggle>
 
        </Div>
        )
}

const Div = styled.div`
          
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;


`