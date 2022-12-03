import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (event) => {
            console.log(event.target)
            const value = event.target.value;
            const name = event.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

export default function RegisterVideo() {
    const formCadastro = useForm({ initialValues: { titulo: "Apex Legends", url: "https://ApexLegends" } });
    const [formVisivel, setFormVisivel] = React.useState(true);

    return (<StyledRegisterVideo>
        <button className="add-video" onClick={() => setFormVisivel(true)}>+</button>

        {formVisivel ? (
            <form onSubmit={(event) => {
                event.preventDefault();
                console.log(formCadastro.values);
                setFormVisivel(false);
                formCadastro.clearForm();
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
