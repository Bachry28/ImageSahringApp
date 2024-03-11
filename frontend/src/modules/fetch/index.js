import { instance } from '../axios/index';
//ganti endpoint berdasarkan pembagian modul backend masing masing :D

// Function for register user endpoint
async function registerUser(formDataregisteruser) {
    try {
      const response = await instance.post('/register', formDataregisteruser, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Something went wrong');
    }
  }
  

// Function for login user endpoint
async function loginUser(username, password) {
  try {
    const response = await instance.post('/login', { username, password });
    return {
      message: response.data.message,
      token: response.data.token,
      userId: response.data.userId // Accessing userId from response data
    };
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function getSpecificUser(user_id){
  try{
    const response = await instance.get(`user/${user_id}`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong')
  }
}


export { registerUser, loginUser, getSpecificUser };