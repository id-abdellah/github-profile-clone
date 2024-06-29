import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import "./sass/_Navbar.scss"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from "react";
import { UsernameContext } from "../features/context";
import { themeToggle, getCurrentTheme } from "../features/theme";

export default function Navbar() {
    const {
        usernameState: {
            username,
            updateUsername
        },
        pageState: {
            page,
            updatePage
        },
        followersState: {
            followersPage,
            updateFollowersPage
        },
        activeLiState: {
            currentActive,
            updateActiveLi
        },
        followingState: {
            followingPage,
            updateFollowingPage
        }
    } = useContext(UsernameContext);

    const [input, setInput] = useState("");

    const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

    // i took this code from chatGPT, it was very useful to listens to any change on theme attribut
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'theme') {
                    setCurrentTheme(getCurrentTheme());
                }
            });
        });

        observer.observe(document.body, { attributes: true });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <nav className="navbar">

            <div className="logo">Github<span>Clone</span></div>

            <div className="search-field">
                <div>
                    <input type="text" placeholder="searche username" onChange={(e) => {
                        setInput(e.target.value)
                    }} />
                    <div className="search-icon" onClick={() => {
                        if (input === "") return
                        updateUsername(input);
                        updatePage(prevPage => ({ ...prevPage, currentPage: 1 }));
                        updateFollowersPage(prevState => ({ ...prevState, currentPage: 1 }));
                        updateFollowingPage(prevState => ({ ...prevState, currentPage: 1 }));
                        updateActiveLi("repos")
                    }}>
                        <FontAwesomeIcon icon={faSearch} /> Searche
                    </div>
                </div>
                <div className="theme-controller" onClick={() => themeToggle()}>
                    <div className="light-theme" style={{ display: `${currentTheme === "light" ? "none" : "block"}` }}>
                        <FontAwesomeIcon icon={faSun} />
                    </div>
                    <div className="dark-theme" style={{ display: `${currentTheme === "light" ? "block" : "none"}` }}>
                        <FontAwesomeIcon icon={faMoon} />
                    </div>
                </div>
            </div>
        </nav>
    )
}