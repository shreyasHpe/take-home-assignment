import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Network, Star } from "grommet-icons";
import {
  Anchor,
  Box,
  Card,
  CardBody,
  CardFooter,
  Data,
  DataSearch,
  DataTable,
  Grid,
  Grommet,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  Text,
  Tag,
  Toolbar,
} from "grommet";
import axios from "axios";
import NotFoundPage from "./NotFound";

const theme = {
  global: {
    colors: {
      brand: "#228BE6",
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
  },
};

const CardTemplate = ({ repoDetails }) => {
  return (
    <Card
      width="large"
      onClick={() => {
        window.open(repoDetails.html_url, "_self");
      }}
    >
      <CardBody pad="medium" height="small">
        <Box direction="row" gap="small" justify="between">
          <Heading level={4} margin="none">
            {repoDetails.name}
          </Heading>
          <Tag
            style={{ textTransform: "capitalize" }}
            name={repoDetails.visibility}
            size="xsmall"
          />
        </Box>
        <Paragraph fill margin={{ bottom: "none" }} size="small">
          {repoDetails.description
            ? repoDetails.description
            : "No description found."}
        </Paragraph>
      </CardBody>
      <CardFooter
        pad={{ horizontal: "medium", vertical: "small" }}
        background="background-contrast"
      >
        <Box direction="row" gap="small">
          {repoDetails.language ? (
            <Tag name={repoDetails.language} size="small" />
          ) : (
            <></>
          )}
        </Box>
        <Box direction="row" gap="medium">
          <Box direction="row" gap="xsmall" align="center">
            <Network size="small" />
            <Text size="small">{repoDetails.forks_count}</Text>
          </Box>
          <Box direction="row" gap="xsmall" align="center">
            <Star size="small" color="accent-4" />
            <Text size="small">{repoDetails.stargazers_count}</Text>
          </Box>
        </Box>
      </CardFooter>
    </Card>
  );
};

const UserRepos = () => {
  const { username } = useParams();
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);
  const [pageNo, setPageNo] = useState(2);

  const personal_token =
    "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";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${personal_token}`,
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };

    const fetchUserRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos?page=1`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${personal_token}`,
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        setRepos(response.data);
      } catch (error) {
        setRepos(null);
      }
    };

    fetchUser();
    fetchUserRepos();
  }, [username]);

  const onMore = () => {
    const fetchExtraUserRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos?page=${pageNo}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${personal_token}`,
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        setRepos((prevItems) => [...prevItems, ...response.data]);
      } catch (error) {
        setRepos(null);
        console.log(error);
      }
    };

    setTimeout(() => {
      fetchExtraUserRepos();
      setPageNo((prevPageNo) => prevPageNo + 1);
    }, 500);
  };

  if (!repos) {
    return <NotFoundPage />;
  }

  if (repos.length === 0) {
    return (
      <Grommet theme={theme} full>
        <Page>
          <PageContent align="center">
            <PageHeader title="Welcome to Grommet!" />
            <Text>No repositories found for this user.</Text>
          </PageContent>
        </Page>
      </Grommet>
    );
  }

  const columns = [
    {
      header: "",
      property: "",
      size: "large",
      render: (data) => {
        return <CardTemplate repoDetails={data} />;
      },
    },
  ];

  return (
    <Grommet theme={theme} full>
      <Page>
        <PageContent align="center">
          <Heading level={3}>
            Hello <Anchor label={user.name || username} href={user.html_url} />!
          </Heading>
          <Grid columns="xlarge" gap="large" pad={{ bottom: "large" }}>
            <Data data={repos}>
              <Toolbar align="end">
                <DataSearch placeholder="Search repositories..." />
              </Toolbar>
              <DataTable columns={columns} onMore={() => onMore()} />
            </Data>
          </Grid>
        </PageContent>
      </Page>
    </Grommet>
  );
};

export default UserRepos;
