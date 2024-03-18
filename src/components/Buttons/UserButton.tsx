import React, { forwardRef, useContext } from "react";
import { UnstyledButton, Group, Avatar, Text, rem } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./UserButton.module.css";
import { AuthContext } from "../../contexts/AuthProvider";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => {
    const { user } = useContext(AuthContext);

    return (
      <UnstyledButton
        ref={ref}
        p={"md"}
        color={"text"}
        display={"block"}
        w={"100%"}
        {...others}
      >
        <Group>
          <Avatar src={user?.photo || image} radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {user?.displayName}
            </Text>

            <Text c="dimmed" size="xs">
              {user?.email}
            </Text>
          </div>

          {icon || <IconChevronRight size="1rem" />}
        </Group>
      </UnstyledButton>
    );
  }
);

export default UserButton;
