import React from "react";

export const ColorModeContext = React.createContext({
    mode: "dark"
});

export default function ColorModeProvider(props) {
    return (
        <ColorModeContext.Provider value={{ mode: "dark" }}>
            {props.children}
        </ColorModeContext.Provider>
    )
}