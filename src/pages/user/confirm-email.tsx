import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router";
import { useMe } from "../../hooks/useMe";
import { useQueryParam } from "../../hooks/useQueryParam";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();

  const onCompleted = (data: verifyEmail) => {
    const { ok } = data.verifyEmail;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });

      history.push("/");
    }
  };

  const [verifyEmail, { loading: verifyingEmail }] = useMutation<
    verifyEmail,
    verifyEmailVariables
  >(VERIFY_EMAIL_MUTATION, {
    onCompleted,
  });
  const code = useQueryParam("code") || "";

  useEffect(() => {
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <Helmet>
        <title>Verify Email | Cuber Eats</title>
      </Helmet>
      <h2 className="text-xl mb-2 font-semibold">Confirming Email...</h2>
      <h4 className="text-gray-600 text-base">
        Please wait, don't close this page.
      </h4>
    </div>
  );
};
