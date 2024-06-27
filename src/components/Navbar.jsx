import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun } from "@fortawesome/free-regular-svg-icons"
import "./sass/_Navbar.scss"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from "react";
import { UsernameContext } from "../features/context";

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
            </div>
        </nav>
    )
}