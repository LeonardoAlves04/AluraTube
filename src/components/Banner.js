import config from "../config.json";
import react from "react"

function Banner(props) {
    return (
        <div>
            {config.banner}
        </div>
    )
}


export default Banner 