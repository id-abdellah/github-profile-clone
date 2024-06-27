import { createContext, useEffect, useState } from "react";
import useFetch, { BASE_URL } from "./hooks/useFetch";
import Navbar from "./components/Navbar";
import { UsernameContext } from "./features/context";
import "./App.scss"
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";


export default function App() {
  const [userName, setUserName] = useState("id-abdellah");
  const [page, setPage] = useState({ currentPage: 1 });
  const [activeLi, setActiveLi] = useState("repos");
  const [followersPagination, setFollowersPagination] = useState({ currentPage: 1 })
  const [followingPagination, setFollowingPagination] = useState({ currentPage: 1 })

  return (
    <UsernameContext.Provider value={{
      "usernameState": {
        username: userName,
        updateUsername: setUserName,
      },
      "pageState": {
        page: page,
        updatePage: setPage
      },
      "followersState": {
        followersPage: followersPagination,
        updateFollowersPage: setFollowersPagination
      },
      "followingState": {
        followingPage: followingPagination,
        updateFollowingPage: setFollowingPagination
      },
      "activeLiState": {
        currentActive: activeLi,
        updateActiveLi: setActiveLi
      }
    }}>
      <div className="container">
        <Navbar />


        <main>
          <LeftSidebar />
          <RightSidebar />
        </main>


      </div>
    </UsernameContext.Provider>
  )
}