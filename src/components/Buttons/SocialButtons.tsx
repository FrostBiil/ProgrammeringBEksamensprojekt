import { Button, ButtonProps, Group } from '@mantine/core';
import { GithubIcon } from "@mantinex/dev-icons";
import classes from "./SocialButton.module.css";

export function GithubButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Button
      {...props}
      leftSection={<GithubIcon style={{ width: "1rem", height: "1rem" }} />}
      className={classes.githubButton}
    />
  );
}

function SocialButtons() { 
  return (
    <Group justify="center" p="md">
      <GithubButton>Login with GitHub</GithubButton>
    </Group>
  );
}

export default SocialButtons
