import { createContext, useState } from "react"



export const themes = {
    light: {
        color: '#2c3e50',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
},
    dark: {
        color: '#ecf0f1',
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
}

}

export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {

    const [theme, setTheme] = useState(themes.light)

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}


