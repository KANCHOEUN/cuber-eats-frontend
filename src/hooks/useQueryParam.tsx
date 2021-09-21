import { useLocation } from "react-router";

export const useQueryParam = (param: string) => {
  return new URLSearchParams(useLocation().search).get(param);
};
