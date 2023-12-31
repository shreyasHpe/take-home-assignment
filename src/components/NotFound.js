import React from "react";
import { Box, Grommet, Heading } from "grommet";
import { GLOBAL_THEME } from "../constants";

const NotFound = () => {
  return (
    <Grommet theme={GLOBAL_THEME} full>
      <Box fill justify="center">
        <Heading
          level="2"
          size="large"
          textAlign="center"
          color="brand"
          alignSelf="center"
        >
          Oops! User Not Found
        </Heading>
      </Box>
    </Grommet>
  );
};

export default NotFound;
