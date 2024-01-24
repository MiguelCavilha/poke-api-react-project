import React, { useContext } from "react"
import { ThemeContext } from "../../contexts/toggler"

export const ButtonToggle = (props) => {


    const {theme} = useContext(ThemeContext)

    return (
        <button {...props}
        style={{color: theme.color, backgroundColor: theme.background}} />
    )
}
