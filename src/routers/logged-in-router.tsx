import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Restaurants } from "../pages/client/restaurants";
import { meQuery } from "../__generated__/meQuery";

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Switch>
        {data.me.role === "Client" && ClientRoutes}
        <Redirect from="/login" to="/" />
      </Switch>
    </BrowserRouter>
  );
};
