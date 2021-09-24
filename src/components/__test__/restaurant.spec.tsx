import { render } from "@testing-library/react";
import React from "react";
import { Restaurant } from "../restaurant";

describe("<Restaurant />", () => {
  it("renders OK with props", () => {
    const { getByText, container } = render(
      <Restaurant
        id="1"
        name="nameTest"
        coverImg="coverImgTest"
        categoryName="categoryTest"
      />
    );
    getByText("nameTest");
    getByText("categoryTest");
  });
});
