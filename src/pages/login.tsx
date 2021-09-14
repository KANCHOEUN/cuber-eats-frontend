import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
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
    formState: { errors },
  } = useForm<ILoginForm>();

  const onCompleted = (data: LoginMutation) => {
    const { ok, token } = data.login;
    if (ok) {
      console.log(token);
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
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-md px-7 py-10 rounded-lg text-center">
        <h3 className="font-semibold text-2xl text-gray-800 pb-1">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-5">
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className={
              errors.email?.message
                ? "input focus:ring-red-400"
                : "input focus:ring-green-500"
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
                ? "input focus:ring-red-400"
                : "input focus:ring-green-500"
            }
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage={"Password must be more than 10 chars"} />
          )}
          <button
            type="submit"
            className="bg-green-500 w-full mt-6 mb-6 py-2 rounded-md self-end font-semibold text-white text-base hover:opacity-90"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};
