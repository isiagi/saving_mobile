import { Button, styled, Spinner } from "tamagui";
import React from "react";

const CustomButton = styled(Button, {
  backgroundColor: "#589E23", // Change this to your desired color
  borderRadius: 8,
});

const ButtonUi = ({ title, isLoading }) => {
  return (
    <CustomButton size="$5" icon={isLoading ? () => <Spinner /> : undefined}>
      {title}
    </CustomButton>
  );
};

export default ButtonUi;
