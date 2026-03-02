import React, { useContext } from "react"
import { ThemeContext } from "../../contexts/toggler"
import styled, { keyframes } from "styled-components"
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

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  transition: transform 0.3s ease;
`

const Button = styled.button`
  border: none;
  cursor: pointer;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 255, 255, 0.3);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
    
    ${Img} {
      animation: ${rotate} 0.6s ease;
    }
  }

  &:active {
    transform: scale(0.95);
  }
`