import { useContext } from "react";
import "../sass/_FollowersSection.scss"
import useFetch, { BASE_URL } from "../../hooks/useFetch";
import { UsernameContext } from "../../features/context";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoRetrievedData from "../NoRetrievedData";
import Loader from "../Loader";
import Pagination from "../Pagination";

export default function Followers() {
    const {
        usernameState: {
            username,
            updateUsername
        },
        followersState: {
            followersPage,
            updateFollowersPage
        }
    } = useContext(UsernameContext);

    const { data, isLoading, error } = useFetch(`${BASE_URL}/users/${username}/followers?page=${followersPage.currentPage}&per_page=30`);

    if (!isLoading && data.length === 0) {
        return <NoRetrievedData message="Doesn't have any Followers yet." />
    }

    return (
        <>
            <div className="followers-content">
                {
                    !isLoading
                        ?
                        data.map(followerData => {
                            return <FollowerCardStructure fData={followerData} key={Math.random()} />
                        })
                        :
                        <Loader type="followers" />
                }
            </div>
            {
                !isLoading &&
                <Pagination page={followersPage} updatePage={updateFollowersPage} />
            }
        </>
    )
}


/**************************
 * 
 * Followers Card Structure
 * 
***************************/


export function FollowerCardStructure({ fData: { avatar_url: avatar, login } }) {
    const {
        usernameState: {
            username,
            updateUsername
        },
        activeLiState: {
            currentActive,
            updateActiveLi
        }
    } = useContext(UsernameContext);

    return (
        <div className="follower-card">

            <div className="follower-infos">
                <div className="follower_pic">
                    <img src={avatar} alt="" />
                </div>
                <div className="follower_username">{login}</div>
            </div>

            <button onClick={() => {
                updateActiveLi("repos")
                updateUsername(login)
            }}>
                <FontAwesomeIcon icon={faLink} />
            </button>
        </div>
    )
}



/**************************
 * 
 * This code below was in place of "Pagination" component
 * 
***************************/

/*
<div className="pagination">
                    <div className="prev-arrow" blocked={followersPage.currentPage === 1 ? "true" : "false"} onClick={(e) => {
                        if (followersPage.currentPage === 1) return;
                        updateFollowersPage(prevPage => {
                            return { ...prevPage, currentPage: prevPage.currentPage - 1 }
                        })
                    }}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>

                    <div className="page">{followersPage.currentPage} / {followersPage.maxPages}</div>

                    <div className="next-arrow" blocked={followersPage.currentPage === followersPage.maxPages ? "true" : "false"} onClick={(e) => {
                        if (followersPage.currentPage === followersPage.maxPages) return;
                        updateFollowersPage(prevPage => {
                            return { ...prevPage, currentPage: prevPage.currentPage + 1 }
                        })
                    }}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                </div>
*/