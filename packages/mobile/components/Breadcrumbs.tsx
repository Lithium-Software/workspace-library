import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

const StyledView = styled(View)`
  flex-direction: row;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  max-width: 100%;
`;

const BreadcrumbItem = ({ title, action }: { title: string; action: any }) => (
  <Text onPress={action}>{title}</Text>
);

const BreadcrumbSeparator = ({ separator }: { separator: string }) => (
  <Text>{separator}</Text>
);

const BreadcrumbCollapser = () => (
  <Text
    onPress={() => console.log("ESTO VA A ABRIR LA NAVEGACIÓN EN UN MODAL")}
  >
    ...
  </Text>
);

const Breadcrumbs = ({
  separator,
  items,
}: {
  separator: string;
  items: { title: string; action: any }[];
}) => {
  let breadcrumbs = items.map(({ title, action }) => (
    <BreadcrumbItem title={title} action={action} />
  ));

  const max = 2;

  const totalItems = breadcrumbs.length;
  const lastIndex = totalItems - 1;

  if (totalItems > max) {
    breadcrumbs = [
      breadcrumbs[0],
      <BreadcrumbCollapser />,
      breadcrumbs[lastIndex],
    ];
  }

  let i = 1;
  while (i < breadcrumbs.length - 1) {
    breadcrumbs.splice(i, 0, <BreadcrumbSeparator separator={separator} />);
    i += 2;
  }

  return <StyledView>{breadcrumbs}</StyledView>;
};

export default Breadcrumbs;
