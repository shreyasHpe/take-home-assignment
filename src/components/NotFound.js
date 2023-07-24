import React from "react";
import { Box, Grommet, Heading } from "grommet";
import { GLOBAL_THEME } from "../constants";

const NotFound = () => {
  return (
    <Grommet theme={GLOBAL_THEME} full>
      <Box fill justify="center">
        <Heading level="1" size="large" textAlign="center" color="black">
          Oops! User Not Found
        </Heading>
      </Box>
    </Grommet>
  );
};

export default NotFound;
