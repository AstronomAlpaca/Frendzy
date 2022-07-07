import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import UserPost from "./UserPost";

test("renders content", () => {
  const userPost = {
    content: "Component testing is done with react-testing-library",
  };

  render(<UserPost content={userPost}></UserPost>);

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();
});

// todo: user-library and read:
// https://fullstackopen.com/en/part5/testing_react_apps
