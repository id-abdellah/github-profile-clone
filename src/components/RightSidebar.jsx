import { useContext, useState } from "react";
import "./sass/_RightSidebar.scss"
import Repos from "./rightSide comps/Repos";
import Following from "./rightSide comps/Following";
import Followers from "./rightSide comps/Followers";
import { UsernameContext } from "../features/context";


export default function RightSidebar() {
    const {
        "activeLiState": {
            currentActive,
            updateActiveLi
        }
    } = useContext(UsernameContext)

    return (
        <div className="right-sidebar">
            <div className="wrapper">
                <ul className="sections">
                    <li className={currentActive === "repos" ? "active" : ""} onClick={() => updateActiveLi("repos")}>Repositories</li>
                    <li className={currentActive === "followers" ? "active" : ""} onClick={() => updateActiveLi("followers")}>Followers</li>
                    <li className={currentActive === "following" ? "active" : ""} onClick={() => updateActiveLi("following")}>Following</li>
                </ul>

                <div className="sections-content">
                    {
                        currentActive === "repos"
                            ?
                            <Repos />
                            : currentActive === "followers"
                                ?
                                <Followers />
                                : currentActive === "following"
                                    ?
                                    <Following />
                                    : ""
                    }
                </div>
            </div>
        </div>
    )
}