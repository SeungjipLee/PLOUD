import React from 'react';

const PostItem = ({ post }) => {
  return (
    <tr>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.author}</td>
      <td>{post.likes}</td>
      <td>{post.views}</td>
      <td>{post.date}</td>
    </tr>
  );
};

export default PostItem;