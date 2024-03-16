import { instance } from "../axios/index";

async function getAllpost() {
  try {
    const response = await instance.get("/post");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getpostById(id) {
    try {
      const response = await instance.get(`/post/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
  }

  async function createpost(formDatapost) {
    try {
      const response = await instance.post('/post', formDatapost, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Something went wrong');
    }
  }
  

  async function updatePost(id, formDataupdate) {
    try {
        console.log('Post ID:', id); // Log the post ID before making the request
        const response = await instance.put(`/post/${id}`, formDataupdate, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
}
  
  async function deletePost(id) {
    try {
      const response = await instance.delete(`/post/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Something went wrong');
    }
  }

  export{getAllpost, getpostById, createpost, updatePost, deletePost}