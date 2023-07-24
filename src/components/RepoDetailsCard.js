import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Paragraph,
  Text,
  Tag,
} from "grommet";
import { Network, Star } from "grommet-icons";

const RepoDetailsCard = ({ repoDetails }) => {
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

export default RepoDetailsCard;
