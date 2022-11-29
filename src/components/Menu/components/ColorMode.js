import React from "react";

export const ColorModeContext = React.createContext({
    mode: "",
    setMode: () => { alert("Você precisa me configurar primeiro!") }
});

export default function ColorModeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode);
    return (
        <ColorModeContext.Provider value={{ mode: props.initialMode }}>
            {props.children}
        </ColorModeContext.Provider>
    )
}