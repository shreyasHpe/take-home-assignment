import React from "react";
import { Box, Grommet, Heading } from "grommet";
import { GLOBAL_THEME } from "../constants";

const Home = () => {
  return (
    <Grommet theme={GLOBAL_THEME} full>
      <Box fill justify="center">
        <Heading level="2" textAlign="center" color="brand" alignSelf="center">
          To begin using the application, simply provide the GitHub username you
          wish to list repositories for in the URL.
        </Heading>
      </Box>
    </Grommet>
  );
};

export default Home;
