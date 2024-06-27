import { useContext } from "react";
import { UsernameContext } from "../../features/context";
import NoRetrievedData from "../NoRetrievedData";
import "../sass/_FollowersSection.scss"
import Pagination from "../Pagination";
import Loader from "../Loader";
import { FollowerCardStructure } from "./Followers";
import useFetch, { BASE_URL } from "../../hooks/useFetch";

export default function Following() {
    const {
        usernameState: {
            username,
            updateUsername
        },
        followingState: {
            followingPage,
            updateFollowingPage
        }
    } = useContext(UsernameContext);

    const { data, isLoading, error } = useFetch(`${BASE_URL}/users/${username}/following?page=${followingPage.currentPage}&per_page=30`);

    if (!isLoading && data.length === 0) {
        return <NoRetrievedData message="Doesn't have any Followings yet." />
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
                <Pagination page={followingPage} updatePage={updateFollowingPage} />
            }
        </>
    )
}
