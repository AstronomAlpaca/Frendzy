import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserPostForm from "./UserPostForm";
import userEvent from "@testing-library/user-event";

test("<userPostForm /> updates parent state and calls onSubmit", async () => {
  const createPost = jest.fn();
  const user = userEvent.setup();

  render(<UserPostForm createPost={createPost} />);

  const input = screen.getByRole("textbox");
  const sendButton = screen.getByText("Save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(createPost.mock.calls).toHaveLength(1);
  expect(createPost.mock.calls[0][0].content).toBe("testing a form...");
});
