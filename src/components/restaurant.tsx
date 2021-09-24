import React from "react";

interface IRestaurantProps {
  id: string;
  name: string;
  coverImg: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  name,
  coverImg,
  categoryName,
}) => (
  <div className="flex flex-col">
    <div
      style={{ backgroundImage: `url(${coverImg})` }}
      className="bg-cover bg-center py-28 mb-2"
    ></div>
    <h3 className="text-lg font-medium font-uber">{name}</h3>
    <span className="border-t mt-2 py-2 border-gray-300 border-opacity-70">
      {categoryName}
    </span>
  </div>
);
