import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    return {
        values,
        handleChange: (event) => {
            const value = event.target.value;
            const name = event.target.name
            setValues({
                ...values,
                [name]: value,
            });
        }
    };
};

export default function RegisterVideo() {
    const formCadastro = useForm({ initialValues: { titulo: "Apex Legends", url: "https://ApexLegends" } });
    const [formVisivel, setFormVisivel] = React.useState(true);

    return (<StyledRegisterVideo>
        <button className="add-video" onClick={() => setFormVisivel(true)}>+</button>

        {formVisivel ? (
            <form onSubmit={(event) => {
                event.preventDefault();
                console.log(values);
            }}>

                <div>
                    <button className="close-modal" onClick={() => setFormVisivel(false)}>
                        X
                    </button>

                    <input placeholder="Título do vídeo"
                        value={formCadastro.values.titulo}
                        name="titulo"
                        onChange={formCadastro.handleChange}
                    />
                    <input placeholder="URL"
                        value={formCadastro.values.url}
                        name="url"
                        onChange={formCadastro.handleChange}
                    />

                    <button type="submit" onClick={() => setFormVisivel(false)}>Cadastrar</button>

                </div>
            </form>
        ) : false
        }
    </StyledRegisterVideo >)
}
