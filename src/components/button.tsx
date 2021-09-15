import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    type="submit"
    className={`btn ${
      canClick
        ? "bg-primary hover:bg-secondary"
        : "bg-disabled pointer-events-none"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
