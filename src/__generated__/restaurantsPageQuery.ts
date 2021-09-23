/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantsPageQuery
// ====================================================

export interface restaurantsPageQuery_getCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  restaurantCount: number;
}

export interface restaurantsPageQuery_getCategories {
  __typename: "GetCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: restaurantsPageQuery_getCategories_categories[] | null;
}

export interface restaurantsPageQuery_getRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface restaurantsPageQuery_getRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: restaurantsPageQuery_getRestaurants_restaurants_category | null;
  address: string;
}

export interface restaurantsPageQuery_getRestaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: restaurantsPageQuery_getRestaurants_restaurants[] | null;
}

export interface restaurantsPageQuery {
  getCategories: restaurantsPageQuery_getCategories;
  getRestaurants: restaurantsPageQuery_getRestaurants;
}

export interface restaurantsPageQueryVariables {
  input: RestaurantsInput;
}
