import React from "react";
import PostForm from "./PostForm";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
const classes = {
  div: "bg-white border rounded-lg overflow-hidden",
  header: "bg-gray-300 text-gray-700 py-3 px-4",
  h2: "text-sm font-semibold"
};
const GET_POST = gql`
  query GetPosts($id: uuid!) {
    posts_by_pk(id: $id) {
      id
      createdAt
      body
      title
    }
  }
`;
const UPDATE_POST = gql`
  mutation UpdatePost($id: uuid!, $body: String!, $title: String!) {
    update_posts(
      where: { id: { _eq: $id } }
      _set: { body: $body, title: $title }
    ) {
      returning {
        title
        body
      }
    }
  }
`;
function EditPost() {
  const { id } = useParams();
  const history = useHistory();
  const { loading, data } = useQuery(GET_POST, { variables: { id } });
  const [updatePost, { loading: loading2, error }] = useMutation(UPDATE_POST, {
    onCompleted: () => history.push("/")
  });

  if (loading) return <div>loading...</div>;
  function onSave({ title, body }) {
    updatePost({ variables: { title, body, id } });
  }
  console.log(data);
  return (
    <div className={classes.div}>
      <header className={classes.header}>
        <h2 className={classes.h2}>Edit Post</h2>
      </header>
      <PostForm
        post={data.posts_by_pk}
        onSave={onSave}
        loading={loading2}
        error={error}
      />
    </div>
  );
}

export default EditPost;
