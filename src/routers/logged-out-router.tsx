import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    console.log("can not create account");
  };

  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        {errors.email?.message && (
          <span className="font-bold text-red-400 block">
            {errors.email?.message}
          </span>
        )}
        <div>
          <input
            {...register("email", {
              required: "This is required",
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
            name="email"
            type="email"
            placeholder="email"
          />
        </div>
        <div>
          <input
            {...register("password", { required: true })}
            name="password"
            type="password"
            placeholder="password"
            required
          />
        </div>
        <button className="bg-green-600 text-white">Submit</button>
      </form>
    </div>
  );
};
