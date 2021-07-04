import { FC } from "react";
import { Text } from "@fluentui/react";

interface IMainTitleProps {}

const MainTitle: FC<IMainTitleProps> = () => (
  <>
    <Text
      variant="xxLarge"
      style={{ fontFamily: "Comic Sans MS", fontWeight: "bolder" }}
      nowrap
      block
    >
      PILTOVER
    </Text>
    <Text
      variant="large"
      style={{ fontFamily: "Comic Sans MS", fontWeight: "bold" }}
      nowrap
      block
    >
      by Whipping Cream
    </Text>
  </>
);

export default MainTitle;
