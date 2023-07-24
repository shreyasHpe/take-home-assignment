import React from "react";
import { Box, Grommet, Heading } from "grommet";

const NotFoundPage = () => {
  return (
    <Grommet full>
      <Box fill justify="center">
        <Heading level="1" size="large" textAlign="center" color="black">
          Oops! User Not Found
        </Heading>
      </Box>
    </Grommet>
  );
};

export default NotFoundPage;
