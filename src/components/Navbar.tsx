import React, { useContext, useMemo } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import {
  ActionIcon,
  Avatar,
  Divider,
  Flex,
  useMantineTheme,
  Space,
  Tooltip,
} from "@mantine/core";
import {
  IconBuildingStore,
  IconBooks,
  IconUpload,
  IconAdjustmentsAlt,
  IconBrandGithub,
  IconLogout,
} from "@tabler/icons-react";
import { Api } from "../utils/api";

export function NavbarItem({
  icon,
  label,
  path,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  path: string;
  onClick?: () => void;
}) {
  return (
    <Tooltip label={label} position="right">
      <ActionIcon
        onClick={onClick}
        color="white"
        variant="light"
        size="xl"
        radius="xl"
        aria-label={label}
      >
        {icon}
      </ActionIcon>
    </Tooltip>
  );
}

export function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const theme = useMantineTheme();
  const navbarItems = useMemo(
    () => [
      { icon: <IconBuildingStore />, label: "Butik" },
      { icon: <IconBooks />, label: "Bibliotek"},
      { icon: <IconUpload />, label: "Opload" },
      { icon: <IconAdjustmentsAlt />, label: "Indstillinger" },
      { icon: <IconLogout />, label: "Log ud", onClick: () => logout() },
    ],
    [logout, user]
  );

  return (
    <Flex
      mih={"100%"}
      gap="md"
      justify="flex-start"
      align="center"
      direction="column"
      wrap="wrap"
      py="md"
      bg={theme.primaryColor}
    >
      {user ? (
        <Tooltip label={user?.displayName} position="right">
          <Avatar size="md" src={user?.photo} />
        </Tooltip>
      ) : (
        <NavbarItem
          icon={<IconBrandGithub />}
          label={"Sign In"}
          path={"#"}
          onClick={() => Api.login()}
        />
      )}

      <Divider w="50%" />

      {navbarItems.slice(0, navbarItems.length - 2).map((item, index) => (
        <NavbarItem icon={item.icon} label={item.label} path={item.label} />
      ))}

      <Space style={{ flexGrow: 1 }}></Space>

      <Divider w="50%" />

      {navbarItems
        .slice(navbarItems.length - 2, navbarItems.length)
        .map((item, index) => (
          <NavbarItem
            icon={item.icon}
            label={item.label}
            path={item.label}
            onClick={item.onClick}
          />
        ))}
    </Flex>
  );
}
