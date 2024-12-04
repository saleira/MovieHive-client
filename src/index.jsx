import { createRoot } from "react-dom/client";

//Import statement to indicate that you need to bundle './index.scss'
import "./index.scss";

//Main component (will enventually use all the others)
const MovieHiveApplication = () => {
    return (
        <div className="movie-hive">
            <div>Good morning</div>
        </div>
    );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MovieHiveApplication/>);