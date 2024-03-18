import { Button, ButtonProps, Group } from '@mantine/core';
import { GithubIcon } from "@mantinex/dev-icons";
import { Api } from '../../utils/api';

export function GithubButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return (
    <Button
      color='#fff' 
      bg={'dark'}
      {...props}
      leftSection={<GithubIcon style={{ width: "1rem", height: "1rem" }} />}
    />
  );
}

const handleLogin = async () => {
  // Api.login() vil redirecte til den side hvor brugeren var da funktionen blev kaldt
  Api.login();
};

function SocialButtons() { 
  return (
    <Group justify="center" p="md">
      <GithubButton onClick={handleLogin}>Login with GitHub</GithubButton>
    </Group>
  );
}

export default SocialButtons
