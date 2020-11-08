import { useMediaQuery } from "@material-ui/core";

export const useMobile = (number = 470) =>
  useMediaQuery(`(max-width: ${number}px)`);
