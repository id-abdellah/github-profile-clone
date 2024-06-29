import { useContext, useEffect, useState } from "react";
import "../sass/_ReposSection.scss"
import { UsernameContext } from "../../features/context";
import useFetch, { BASE_URL } from "../../hooks/useFetch";
import { faCode, faCodeFork, faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoRetrievedData from "../NoRetrievedData";
import Loader from "../Loader";
import Pagination from "../Pagination";

export default function Repos() {
    const {
        usernameState: {
            username,
            updateUsername
        },
        pageState: {
            page,
            updatePage
        }
    } = useContext(UsernameContext);

    const { data, isLoading, error } = useFetch(`${BASE_URL}/users/${username}/repos?page=${page.currentPage}&per_page=30`);


    if (!isLoading && data.length === 0) {
        return <NoRetrievedData message="Doesn't have any repositories yet." />
    }

    return (
        <>
            <div className="repos-content">
                {
                    !isLoading
                        ?
                        data.map(repoData => {
                            return <RepoStructure {...repoData} key={Math.random()} />
                        })
                        :
                        <Loader type="repos" />
                }
            </div>
            {
                !isLoading &&
                <Pagination page={page} updatePage={updatePage} />
            }
        </>
    )
}

/***************************
    Repo card structure
****************************/


function RepoStructure({ name: repoName, html_url: repoURL, description, language, watchers, forks, visibility, stargazers_count: stars }) {
    return (
        <a href={repoURL} target="_blank" className="repo-card">
            <div className="row">
                <div className="sub-row">
                    <span className="repo_name">{repoName}</span>
                    <span className="vis">{visibility}</span>
                </div>
                <div className="sub-row">
                    <p className="description">
                        {
                            description
                        }
                    </p>
                </div>
            </div>
            <div className="row">
                <ul className="repo-stats">
                    {
                        language &&
                        <li className="language">
                            <span><FontAwesomeIcon icon={faCode} /></span>
                            <span>{language}</span>
                        </li>
                    }
                    <li className="stars">
                        <span><FontAwesomeIcon icon={faStar} /></span>
                        <span>{stars}</span>
                    </li>
                    <li className="forks">
                        <span><FontAwesomeIcon icon={faCodeFork} /></span>
                        <span>{forks}</span>
                    </li>
                    <li className="watchers">
                        <span><FontAwesomeIcon icon={faEye} /></span>
                        <span>{watchers}</span>
                    </li>
                </ul>
            </div>
        </a>
    )
}