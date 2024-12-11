import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap";
import { TopBar } from "./components/top-bar/top-bar";

import "./index.scss";
import { Container } from "react-bootstrap";

const MovieHiveApplication = () => {
    return (
        <>
            <TopBar />
            <Container className="mt-6">
                <MainView />
            </Container>
        </>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<MovieHiveApplication />);