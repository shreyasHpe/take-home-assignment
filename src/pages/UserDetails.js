import React from "react";
import { useParams } from "react-router-dom";
import {
  Anchor,
  Avatar,
  Data,
  DataFilter,
  DataFilters,
  DataSearch,
  DataTable,
  Grid,
  Grommet,
  Header,
  Nav,
  Page,
  PageContent,
  Text,
  Toolbar,
} from "grommet";
import { Hpe } from "grommet-icons";
import { GLOBAL_THEME } from "../constants";
import { useUserData, useUserRepoData } from "../hooks";
import NotFound from "../components/NotFound";
import Loader from "../components/Loader";
import RepoDetailsCard from "../components/RepoDetailsCard";

const UserDetails = () => {
  const { username } = useParams();
  const { userData } = useUserData(username);
  const { repos, loadMore } = useUserRepoData(username);

  const columns = [
    {
      header: "",
      property: "",
      size: "large",
      render: (data) => {
        return <RepoDetailsCard repoDetails={data} />;
      },
    },
  ];

  if (repos === -1) {
    return <Loader />;
  }

  if (!repos) {
    return <NotFound />;
  }

  return (
    <Grommet theme={GLOBAL_THEME} full>
      <Page>
        <Header background="white" pad="small" border={"bottom"}>
          <Hpe color="brand" size="large" />
          <Nav direction="row">
            <Text alignSelf="center" size="medium">
              Hello,{" "}
              <Anchor
                label={userData.name || username}
                href={userData.html_url}
              />
              !
            </Text>
            <Avatar src={userData.avatar_url} />
          </Nav>
        </Header>
        <PageContent align="center">
          <Text alignSelf="center" size="xlarge" margin={{ top: "large" }}>
            List of Repositories
          </Text>
          {repos.length === 0 ? (
            <Text>No repositories found for this user.</Text>
          ) : (
            <Grid columns="xlarge" gap="large">
              <Data data={repos} margin="large">
                <Toolbar
                  justify="between"
                  border={"bottom"}
                  pad={{
                    left: "medium",
                    right: "medium",
                  }}
                >
                  <DataSearch placeholder="Search repositories..." />
                  <DataFilters drop>
                    <DataFilter property="language" />
                  </DataFilters>
                </Toolbar>
                <DataTable
                  columns={columns}
                  onMore={loadMore}
                  pad={{
                    bottom: "medium",
                    top: "small",
                    left: "medium",
                    right: "medium",
                  }}
                />
              </Data>
            </Grid>
          )}
        </PageContent>
      </Page>
    </Grommet>
  );
};

export default UserDetails;
