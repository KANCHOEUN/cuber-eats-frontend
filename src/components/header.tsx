import { UserIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import cuberLogo from "../images/uber-eats.svg";

interface IHeaderProps {
  email: string;
}

export const Header: React.FC<IHeaderProps> = ({ email }) => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-sm text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className="py-8">
        <div className="w-full px-7 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <img src={cuberLogo} alt="cuberLogo" className="w-36" />
          <span>
            <Link to="/my-profile" className="text-base flex">
              <UserIcon className="w-7" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
