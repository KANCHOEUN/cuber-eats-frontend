import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import nuberLogo from "../images/uber-eats.svg";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/LoginMutation";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data: LoginMutation) => {
    const { ok, token } = data.login;
    if (ok) {
      console.log(token);
      isLoggedInVar(true);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center mt-8 md:mt-24">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-4">
        <img src={nuberLogo} alt="nuberLogo" className="w-48 mb-9 md:mb-16" />
        <h3 className="w-full font-medium text-left text-3xl">Welcome back</h3>
        <span className="w-full text-left mt-8 mb-1">
          {"Sign in with your email address and password."}
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className={
              errors.email?.message
                ? "input focus:border-red-400"
                : "input focus:border-gray-600"
            }
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: 10,
            })}
            type="password"
            placeholder="Password"
            className={
              errors.password?.message
                ? "input focus:border-red-400"
                : "input focus:border-gray-600"
            }
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage={"Password must be more than 10 chars"} />
          )}
          <Button canClick={isValid} loading={loading} actionText={"Login"} />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div className="mt-4">
          {"New to Nuber? "}
          <Link to="/create-account" className="text-primary hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
