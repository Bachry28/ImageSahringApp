import { instance } from "../axios/index";

async function getAllcomment() {
  try {
    const response = await instance.get("/comment");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getCommentByPostId(post_id) {
  try {
      const response = await instance.get(`/comment/post/${post_id}`);
      return response.data;
  } catch (error) {
      throw new Error(error.response.data.message || "Something went wrong");
  }
}

  async function createcomment(user_id, post_id, comment) {
    try {
      const response = await instance.post('/comment', {user_id, post_id, comment});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Something went wrong');
    }
  }

  async function updatecomment(comment_id, user_id, post_id, comment) {
    try {
      const response = await instance.put(`/comment/${comment_id}/update`, { user_id, post_id, comment});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Something went wrong');
    }
  }
  
  async function deletecomment(id) {
    try {
      const response = await instance.delete(`/comment/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Something went wrong');
    }
  }

  export{getAllcomment, getCommentByPostId, createcomment, updatecomment,deletecomment}