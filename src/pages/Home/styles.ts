import { Card, createStyles, makeStyles } from "@material-ui/core";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  width: 275px;
`;

export const useStyles = makeStyles(() =>
  createStyles({
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, 420px)",
      gridColumnGap: "14px",
      gridRowGap: "40px",
      width: "100%",
      marginTop: "28px",
      justifyItems: "stretch",
      justifyContent: "space-evenly",
    },
  })
);
