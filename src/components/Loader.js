import React from "react";
import { Box, Grommet, Spinner, Text } from "grommet";

const LoaderPage = () => {
  return (
    <Grommet full>
      <Box fill justify="center" align="center" direction="row" gap="small">
        <Spinner
          border={[
            { side: "all", color: "background-contrast", size: "medium" },
            { side: "right", color: "brand", size: "medium" },
            { side: "top", color: "brand", size: "medium" },
            { side: "left", color: "brand", size: "medium" },
          ]}
        />
        <Text>Loading...</Text>
      </Box>
    </Grommet>
  );
};

export default LoaderPage;
