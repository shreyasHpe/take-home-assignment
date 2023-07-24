import React from "react";
import { useParams } from "react-router-dom";
import {
  Anchor,
  Data,
  DataSearch,
  DataTable,
  Grid,
  Grommet,
  Heading,
  Page,
  PageContent,
  Text,
  Toolbar,
} from "grommet";
import { useUserData, useUserRepoData } from "../hooks";
import NotFound from "../components/NotFound";
import Loader from "../components/Loader";
import RepoDetailsCard from "../components/RepoDetailsCard";

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
    <Grommet theme={theme} full>
      <Page>
        <PageContent align="center">
          <Heading level={3}>
            Hello{" "}
            <Anchor
              label={userData.name || username}
              href={userData.html_url}
            />
            !
          </Heading>
          {repos.length === 0 ? (
            <Text>No repositories found for this user.</Text>
          ) : (
            <Grid columns="xlarge" gap="large" pad={{ bottom: "large" }}>
              <Data data={repos}>
                <Toolbar align="end">
                  <DataSearch placeholder="Search repositories..." />
                </Toolbar>
                <DataTable columns={columns} onMore={loadMore} />
              </Data>
            </Grid>
          )}
        </PageContent>
      </Page>
    </Grommet>
  );
};

export default UserDetails;
