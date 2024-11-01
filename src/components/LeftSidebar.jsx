import { useContext, useEffect, useState } from "react";
import useFetch, { BASE_URL } from "../hooks/useFetch";
import "./sass/_LeftSidebar.scss"
import { UsernameContext } from "../features/context";
import { faArrowUpRightFromSquare, faBuilding, faGlobe, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function LeftSidebar() {
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
        followingState: {
            followingPage,
            updateFollowingPage
        }
    } = useContext(UsernameContext);

    const { data, isLoading, error } = useFetch(BASE_URL + "/users/" + username);

    useEffect(() => {
        if (!isLoading) {
            const max = Math.ceil(data.public_repos / 30);
            const maxFollowersPages = Math.ceil(data.followers / 30);
            const maxFollowingPages = Math.ceil(data.following / 30);
            updatePage(prevState => ({ ...prevState, maxPages: max }));
            updateFollowersPage(prevState => ({ ...prevState, maxPages: maxFollowersPages }));
            updateFollowingPage(prevState => ({ ...prevState, maxPages: maxFollowingPages }))
        }
    }, [data])

    return (
        <div className="left-sidebar">
            {
                isLoading === true
                    ?
                    <div>Loading ...</div>
                    :
                    <div className="wrapper">
                        <div className="pic">
                            <img src={data.avatar_url} alt="" />
                        </div>
                        <div className="name">
                            {data.name}
                        </div>
                        <div className="bio">
                            {data.bio}
                        </div>
                        <div className="github-profile">
                            <a href={data.html_url} target="_blank">
                                <span><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></span> See on Github
                            </a>
                        </div>
                        <div className="infos">
                            {
                                data.location &&
                                <div className="location">
                                    <span><FontAwesomeIcon icon={faLocationDot} /></span> {data.location}
                                </div>
                            }
                            {
                                data.company &&
                                <div className="company">
                                    <span><FontAwesomeIcon icon={faBuilding} /></span> {data.company}
                                </div>
                            }
                            {
                                data.blog &&
                                <div className="blog">
                                    <span><FontAwesomeIcon icon={faGlobe} /></span>
                                    <a href={"https://" + data.blog} target="_blank">{data.blog}</a>
                                </div>
                            }
                            {
                                data.twitter_username &&
                                <div className="twitter">
                                    <span><FontAwesomeIcon icon={faTwitter} /></span>
                                    <a href={`https://x.com/${data.twitter_username}`} target="_blank">@{data.twitter_username}</a>
                                </div>
                            }
                        </div>
                        <div className="stats">
                            <div className="repos">
                                <span>{data.public_repos}</span>
                                <span>Repos</span>
                            </div>
                            <div className="followers">
                                <span>{Intl.NumberFormat("en", { notation: "compact" }).format(data.followers)}</span>
                                <span>Followers</span>
                            </div>
                            <div className="following">
                                <span>{data.following}</span>
                                <span>following</span>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}