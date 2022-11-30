import React from "react";
import { StyledRegisterVideo } from "./styles";

export default function RegisterVideo() {
    const [formVisivel, setFormVisivel] = React.useState(false)
    return (<StyledRegisterVideo>
        <button className="add-video" onClick={() => setFormVisivel(true)}>+</button>
        {formVisivel ? (
            <form>
                <div>
                    <button className="close-modal">
                        X
                    </button>
                    <input className="input" placeholder="Título do vídeo"></input>
                    <input className="input" placeholder="URL"></input>
                    <button type="submit" onClick={() => setFormVisivel(false)}>Cadastrar</button>
                </div>
            </form>
        ) : false}
    </StyledRegisterVideo >)
}
