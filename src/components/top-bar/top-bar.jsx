import "./top-bar.scss"
import logo from "../../Img/moviehive-logo-transparent.svg";

export const TopBar = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#"><img id="MovieHive-logo"
                    src={logo} alt="MovieHive Logo"
                    draggable="false" height="30" /></a>

                <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
                data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <form class="d-flex align-items-center w-100 form-search">
                        <div class="input-group">
                            <input type="search" class="form-control" placeholder="Search" aria-label="Search" />
                        </div>
                        <a href="#!" class="text-white"><i class="fas fa-search ps-3"></i></a>
                    </form>

                    <ul class="navbar-nav ms-3">
                        <li class="nav-item me-3">
                            <a class="nav-link d-flex align-items-center" href="#!">Movies</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link d-flex align-items-center me-3" href="#!">Directors</a>
                        </li>
                        <li class="nav-item" style={{width: "65px"}}>
                            <a class="nav-link d-flex align-items-center" href="#!">Sign In</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};