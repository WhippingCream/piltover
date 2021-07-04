import { DefaultButton, Stack } from "@fluentui/react";

import { FC } from "react";
import Image from "next/image";
import MainTitle from "../MainTitle";
import giphy03 from "../../public/images/giphy-03.gif";
import { signIn } from "next-auth/client";

interface SignInWidgetProps {}

const SignInWidget: FC<SignInWidgetProps> = () => {
  return (
    <>
      <MainTitle />
      <Stack
        {...{
          tokens: { childrenGap: 15 },
          styles: {
            root: {
              paddingTop: "3vh",
              paddingBottom: "3vh",
              paddingLeft: "10vw",
              paddingRight: "10vw",
              textAlign: "left",
            },
          },
        }}
      >
        <Image src={giphy03} alt="main" />
      </Stack>
      <Stack
        horizontal
        horizontalAlign="center"
        tokens={{ childrenGap: 15 }}
        styles={{
          root: {
            paddingTop: "3vh",
            paddingLeft: "10vw",
            paddingRight: "10vw",
            textAlign: "left",
          },
        }}
      >
        <DefaultButton
          iconProps={{ iconName: "Signin", style: { color: "black" } }}
          style={{
            backgroundColor: "#FEE500",
            borderColor: "#000",
            color: "rgba(0,0,0,0.85)",
          }}
          onClick={() => {
            signIn("kakao", { callbackUrl: "/" });
          }}
        >
          카카오 계정으로 로그인
        </DefaultButton>
      </Stack>
    </>
  );
};

export default SignInWidget;
