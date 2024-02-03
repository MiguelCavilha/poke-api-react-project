import React, { useContext } from "react"
import { ThemeContext } from "../../contexts/toggler"
import styled from "styled-components"
import imageDayNight from "../../assets/images/toggler.png"

export const ButtonToggle = (props) => {


    const {theme} = useContext(ThemeContext)

    return (
        <Button {...props}
        style={{color: theme.color, backgroundColor: theme.background}}>  
            <Img src={imageDayNight} alt="toggle" />
         </Button>

    )
}


const Img = styled.img`
              width: 50px;
              height: 50px;
              

`

const Button = styled.button`
              border: none;
              cursor: pointer;
`