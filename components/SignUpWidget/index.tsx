import {
  Checkbox,
  DatePicker,
  DefaultButton,
  Dropdown,
  PrimaryButton,
  Separator,
  Stack,
  Text,
  TextField,
} from "@fluentui/react";
import { FC, useState } from "react";
import { signOut, useSession } from "next-auth/client";

import { DatePickerKrOptions } from "./locale-string.constants";
import { DateTime } from "luxon";
import MainTitle from "../MainTitle";
import { handler } from "../../lib/api-client";

interface SignUpWidgetProps {}

const SignUpWidget: FC<SignUpWidgetProps> = () => {
  const [session] = useSession();

  const [username, setUsername] = useState<string>();

  type Gender = "male" | "female" | null;
  const [genderDisabled, setGenderDisabled] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<Gender | undefined>(
    undefined
  );

  const [birthDisabled, setBirthDisabled] = useState<boolean>(false);
  const [selectedBirth, setSelectedBirth] = useState<Date | undefined>(
    undefined
  );

  const handleSubmit = async () => {
    interface Body {
      provider: string;
      memberId: string;
      username: string;
      gender?: "male" | "female";
      birth?: Date;
    }
    try {
      if (!session?.user?.oauth) {
        throw new Error("");
      }

      const body: Body = {
        provider: session?.user?.oauth?.provider,
        memberId: session?.user?.oauth?.userId,
        username: username as string,
      };

      if (selectedGender) {
        body.gender = selectedGender;
      }

      if (selectedBirth) {
        body.birth = selectedBirth;
      }

      await handler({
        method: "put",
        url: "/ornn-api/v1/auth/sign-up",
        data: body,
      });
      await signOut();
    } catch (error) {
      // notification.error({
      //   message: error.response.data.message,
      // });
    }
  };

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
        <Text variant="xLarge" style={{ textAlign: "center" }}>
          ???? ?????? ?????? ????
        </Text>
        <Separator />
        <TextField
          label="??????"
          required
          value={username}
          onChange={(event, newValue) => setUsername(newValue)}
        />
        <Text variant="medium" block nowrap>
          ????????????, ????????? ?????? ?????? ???????????? ????????????!
        </Text>

        <Separator />
        <Dropdown
          placeholder="????????? ????????? ?????????."
          label="??????"
          selectedKey={selectedGender}
          disabled={genderDisabled}
          onChange={(event, option) => setSelectedGender(option?.key as Gender)}
          options={[
            { key: "male", text: "??????" },
            { key: "female", text: "??????" },
          ]}
        />
        <Checkbox
          label="?????? ????????? ???????????? ????????????."
          checked={genderDisabled}
          onChange={(event, checked) => {
            setGenderDisabled(checked as boolean);

            if (checked) {
              setSelectedGender(null);
            }
          }}
        />
        <Separator />
        <DatePicker
          label="????????????"
          disabled={birthDisabled}
          // borderless
          {...{
            showGoToToday: false,
            highlightSelectedMonth: true,
            onSelectDate: setSelectedBirth as (
              date: Date | null | undefined
            ) => void,
            maxDate: DateTime.now().minus({ years: 20 }).toJSDate(),
            value: selectedBirth,
            ...DatePickerKrOptions,
          }}
        />
        <Checkbox
          label="???????????? ????????? ???????????? ????????????."
          checked={birthDisabled}
          onChange={(event, checked) => {
            setBirthDisabled(checked as boolean);

            if (checked) {
              setSelectedBirth(undefined);
            }
          }}
        />
      </Stack>
      <Stack
        horizontal
        horizontalAlign="end"
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
        <PrimaryButton
          iconProps={{ iconName: "IDBadge" }}
          onClick={() => handleSubmit()}
        >
          ?????? ??????
        </PrimaryButton>
        <DefaultButton
          iconProps={{ iconName: "Leave" }}
          onClick={() => signOut()}
        >
          ????????????
        </DefaultButton>
      </Stack>
    </>
  );
};

export default SignUpWidget;
