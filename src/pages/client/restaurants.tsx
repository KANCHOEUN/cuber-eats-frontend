import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import bannerLeft from "../../images/banner-left.svg";
import bannerRight from "../../images/banner-right.svg";
import { Restaurant } from "../../components/restaurant";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";

const GET_RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    getCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    getRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        id
        name
        coverImg
        category {
          name
        }
        address
      }
    }
  }
`;

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(GET_RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  console.log(data?.getRestaurants);

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPreviousPageClick = () => setPage((current) => current - 1);

  return (
    <>
      {/* Banner */}
      <div className="block bg-banner relative w-full h-banner min-w-max">
        {/* Banner Image */}
        <div className="h-full relative flex justify-between z-0 flex-shrink-0">
          <img src={bannerLeft} className="h-full" alt="banner-left" />
          <img src={bannerRight} className="h-full" alt="banner-right" />
        </div>

        {/* Banner Input */}
        <form className="block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10">
          <h2 className="text-4xl font-semibold font-uber tracking-tight mb-11 text-center">
            Order your favorites with Cuber Eats
          </h2>
          <div className="flex flex-shrink-0 m-0 border-0">
            <div className="p-4 bg-white mr-4 flex flex-shrink-0 border-b-2 border-gray-100 focus-within:border-black transition-all duration-500">
              <LocationMarkerIcon className="w-6 h-6 mr-4" />
              <input
                type="search"
                placeholder="Enter restaurant name"
                className="w-input font-uber text-base placeholder-gray-500 font-medium input m-0 p-0 border-0"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white text-lg font-uber font-medium px-4 py-3 min-w-max border-0 hover:bg-opacity-90"
            >
              Find Food
            </button>
          </div>
        </form>
      </div>

      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8 pb-20">
          {/* Category */}
          <div className="max-w-screen-lg mx-auto flex justify-around">
            {data?.getCategories.categories?.map((category) => (
              <div className="flex flex-col group">
                <div
                  className="w-16 h-16 bg-cover rounded-full group-hover:bg-gray-100 cursor-pointer"
                  style={{ backgroundImage: `url(${category.coverImg})` }}
                ></div>
                <span className="capitalize text-base text-center font-semibold font-uber mt-1 cursor-pointer">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          {/* TODO: Filter */}
          {/* Restaurants */}
          <div className="grid grid-cols-3 gap-x-5 gap-y-10 mt-14">
            {data?.getRestaurants.restaurants?.map((restaurant) => (
              <Restaurant
                id={restaurant.id + ""}
                name={restaurant.name}
                coverImg={restaurant.coverImg}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center justify-items-center max-w-md mx-auto mt-10">
            {page > 1 ? (
              <ArrowLeftIcon
                onClick={onPreviousPageClick}
                className="w-6 justify-center cursor-pointer"
              />
            ) : (
              <div></div>
            )}
            <span className="mx-5">
              Page {page} of {data?.getRestaurants.totalPages}
            </span>
            {page !== data?.getRestaurants.totalPages ? (
              <ArrowRightIcon
                onClick={onNextPageClick}
                className="w-6 cursor-pointer"
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
