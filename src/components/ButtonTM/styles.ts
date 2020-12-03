import { Button } from "@material-ui/core";
import styled from "styled-components/macro";

type StyleProps = {
  width?: string;
  height?: string;
};

export const StyledButton = styled(Button)`
  color: white;
  height: ${(p: StyleProps) => p.height || "30px"};
  width: ${(p: StyleProps) => p.width || "125px"};
`;
