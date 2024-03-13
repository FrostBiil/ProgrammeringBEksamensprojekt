import { List, ThemeIcon, rem, useMantineTheme } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { MouseEvent, useState } from "react";
import React from "react";

/**  { items: [] , heading: string} **/
interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListComponent({ items, heading, onSelectItem }: Props) {
  const theme = useMantineTheme();

  // Funktion vs. Variabel? Vi kan give funktioner parametre, og give forskellige fejlbeskeder afhængig af, hvad der er givet som parameter.
  const getMessage = () => {
    return items.length === 0 && <p>No items found</p>; // && vs. ? - hvad er forskellen? && er en logisk operator, der returnerer den anden værdi, hvis den første er sand, ellers returnerer den den første værdi. ? er en ternær operator, der returnerer den anden værdi, hvis den første er sand, ellers returnerer den tredje værdi.
  };

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {getMessage()}
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck style={{ width: 16, height: 16 }} />
          </ThemeIcon>
        }
      >
        {items.map((item, index) => (
          <List.Item
            key={item}
            onClick={() => {
              handleClick(index);
              onSelectItem(item);
            }}
            style={{
              cursor: "pointer",
              backgroundColor:
                index === selectedIndex ? theme.colors.gray[1] : "transparent",
              borderRadius: theme.radius.md,
              padding: theme.spacing.xs,
              transition: "background-color 150ms ease",
              "&:hover": {
                backgroundColor: theme.colors.gray[2],
              },
            }}
          >
            {item}
          </List.Item>
        ))}
      </List>
    </>
  );
}

export default ListComponent;
