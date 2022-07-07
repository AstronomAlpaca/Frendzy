import { useState } from "react";

const UserPostForm = (props) => {
  const [newPost, setNewPost] = useState("");

  const handleChange = (event) => {
    setNewPost(event.target.value);
  };

  const addPost = (event) => {
    event.preventDefault();
    props.createPost({
      content: newPost,
    });

    setNewPost("");
  };

  return (
    <div>
      <form onSubmit={addPost}>
        <input value={newPost} onChange={handleChange}></input>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserPostForm;
