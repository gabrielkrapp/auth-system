import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const StyledStack = styled(Stack)(() => ({
  position: "fixed",
  top: 30,
  right: 30,
  zIndex: 1000,
  animation: "fadeIn 0.5s",

  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
}));

interface AlertProps {
  message: string;
}

export const AlertError: React.FC<AlertProps> = ({ message }) => {
  return (
    <StyledStack spacing={2}>
      <Alert variant="filled" severity="error">
        {message}
      </Alert>
    </StyledStack>
  );
};

export const AlertSucces: React.FC<AlertProps> = ({ message }) => {
  return (
    <StyledStack spacing={2}>
      <Alert variant="filled" severity="success">
        {message}
      </Alert>
    </StyledStack>
  );
};
