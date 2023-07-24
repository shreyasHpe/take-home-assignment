import { useState, useEffect } from "react";
import axios from "axios";
import { GITHUB_TOKEN } from "./constants";

export const useUserData = (username) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        setUserData(null);
      }
    };
    fetchUser();
  }, [username]);

  return { userData };
};

export const useUserRepoData = (username) => {
  const [repos, setRepos] = useState(-1);
  const [pageNo, setPageNo] = useState(2);

  useEffect(() => {
    const fetchUserRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos?page=1`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );
        setRepos(response.data);
      } catch (error) {
        setRepos(null);
      }
    };
    fetchUserRepos();
  }, [username]);

  const loadMore = () => {
    const fetchMoreUserRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos?page=${pageNo}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );
        setRepos((prevItems) => [...prevItems, ...response.data]);
      } catch (error) {
        setRepos(null);
      }
    };

    setTimeout(() => {
      fetchMoreUserRepos();
      setPageNo((prevPageNo) => prevPageNo + 1);
    }, 500);
  };

  return { repos, loadMore };
};
