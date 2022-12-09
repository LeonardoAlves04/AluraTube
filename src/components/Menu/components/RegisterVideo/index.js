import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js"

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

const PROJECT_URL = "https://jupquzrprxlxzuvusaix.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1cHF1enJwcnhseHp1dnVzYWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAzNDQ5NDAsImV4cCI6MTk4NTkyMDk0MH0.mDO5abFfhKUBkQH5L8vKxyh_yKuGB6mLuGTkjLEjKqw"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

export default function RegisterVideo() {
    const formCadastro = useForm({ initialValues: { titulo: "VALORANT Champions Istanbul: Grande Final", url: "https://www.youtube.com/watch?v=epXxTChozbU" } });
    const [formVisivel, setFormVisivel] = React.useState(false);

    return (<StyledRegisterVideo>
        <button className="add-video" onClick={() => setFormVisivel(true)}>+</button>

        {formVisivel
            ? (
                <form onSubmit={(event) => {
                    event.preventDefault();

                    supabase.from("videos").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "jogos",
                    })
                        .then((oqueretornou) => {
                            console.log(oqueretornou);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
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
