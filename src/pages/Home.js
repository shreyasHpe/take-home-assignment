import React, { useState } from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  Grommet,
  Heading,
  TextInput,
} from "grommet";
import { useNavigate } from "react-router-dom";
import { GLOBAL_THEME } from "../constants";

const Home = () => {
  const [githubUsername, setGithubUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/${githubUsername}`);
  };

  return (
    <Grommet theme={GLOBAL_THEME} full>
      <Box fill justify="center">
        <Heading
          level="2"
          textAlign="center"
          color="brand"
          alignSelf="center"
          margin={{ bottom: "large" }}
        >
          To get started with the application, either add the GitHub username
          you want to list repositories for directly to the URL or enter the
          username in the input field below.
        </Heading>
        <Box alignSelf="center" width="medium">
          <Form onReset={() => setGithubUsername({})} onSubmit={handleSubmit}>
            <FormField>
              <TextInput
                placeholder="Enter github username..."
                value={githubUsername}
                onChange={(v) => setGithubUsername(v.target.value)}
              />
            </FormField>
            <Box direction="row" gap="medium">
              <Button type="submit" primary label="Submit" />
              <Button type="reset" label="Reset" />
            </Box>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

export default Home;
