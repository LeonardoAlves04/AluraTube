import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (event) => {
            console.log(event.target)
            const value = event.target.value;
            const name = event.target.name
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

const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

export default function RegisterVideo() {
    const formCadastro = useForm({ initialValues: { titulo: "Cazemiro Copa", url: "https://www.youtube.com/@CazeTV" } });
    const [formVisivel, setFormVisivel] = React.useState(true);

    return (<StyledRegisterVideo>
        <button className="add-video" onClick={() => setFormVisivel(true)}>+</button>

        {formVisivel
            ? (
                <form onSubmit={(event) => {
                    event.preventDefault();
                    console.log(formCadastro.values);
                    setFormVisivel(false);
                    formCadastro.clearForm();
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>

                        <input placeholder="Título do vídeo"
                            name="titulo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange}
                        />
                        <input placeholder="URL"
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange}
                        />

                        <button type="submit">Cadastrar</button>

                    </div>
                </form>
            ) : false
        }
    </StyledRegisterVideo >)
}
