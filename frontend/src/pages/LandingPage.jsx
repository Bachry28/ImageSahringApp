import React, { useState, useEffect } from 'react';
import { getAllpost, getpostById, deletePost } from '../modules/fetch/post';
import { getSpecificUser } from '../modules/fetch/index';
import { FaArrowAltCircleRight, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Addpost from '../component/NewPost';
import UpdateForm from '../component/Editpost';

function LandingPage() {
  const [data, setData] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null); // Menambahkan state untuk menyimpan id pos yang dipilih
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchData();
    fetchUser();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getAllpost();
      if (result && result.posts) {
        setData(result.posts);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Failed to fetch posts', error);
      setError('Failed to fetch posts');
    }
  };

  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      console.log("User ID from local storage:", userId);
      
      if (!userId) {
        console.log("User ID not found in local storage");
        return;
      }
  
      const userData = await getSpecificUser(userId);
      console.log("User Data:", userData);
  
      if (userData && userData.user) {
        setUser(userData.user);
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const editRow = async (post_id) => {
    try {
      console.log("Post ID:", post_id);
      const post = await getpostById(post_id);
      console.log("Post:", post);
      setSelectedPostId(post.post.post_id);
      console.log("Selected Post ID:", selectedPostId);
      setShowUpdateForm(true);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  

  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  const deleteRow = (post_id) => {
    deletePost(post_id)
      .then((response) => {
        console.log(response);
        fetchData();
      })
      .catch((error) => {
        console.error('Failed to delete product', error);
      });
  };
  
  const handleAddPost = (newPost) => {
    setData([...data, newPost]);
  };
  
  const toggleAddPost = () => {
    setShowAddPost(!showAddPost);
  }
  
  const handleAddComment = (postId, comment) => {
    console.log("Adding comment:", comment);
    setComment("");
  };



  return (
    <div className="container mx-auto rounded-xl px-4 mt-4 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Image App</h1>
      {user && (
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold mb-2 text-bg-slate-200" >Welcome {user.username}</h2>
          <img src={`http://localhost:8000/upload/${user.foto}`} alt={user.foto} className="rounded-md mx-auto max-w-full h-auto" />
        </div>
      )}
      {showAddPost && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Post</h3>
            <Addpost userId={user?.user_id} onClose={toggleAddPost} onAdd={handleAddPost} />
          </div>
        </div>
      )}

{showUpdateForm && selectedPostId && ( // Menampilkan UpdatePost jika showUpdatePost true dan selectedPostId tidak null
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Post</h3>
            <UpdateForm postId={selectedPostId} onClose={toggleUpdateForm} userId={user?.user_id} /> {/* Mengirimkan postId dan userId */}
          </div>
        </div>
      )}    
                
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={toggleAddPost}>New Post</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8">
        {data.length === 0 ? (
          <p>No posts available</p>
        ) : (
          data.map((post, index) => (
            <div key={`${post.post_id}-${index}`} className="bg-white bg-opacity-60 rounded-lg shadow-md p-4 mt-2 mb-6 px-20">
              <header className='text-center text-2xl'>Title</header>
              <h2 className="text-xl font-semibold mb-4 text-center">{post.title}</h2>
              <header className='text-center text-2xl'>Description</header>
              <p className="text-gray-700 mb-4 text-center">{post.description} </p>
              <img src={`http://localhost:8000/post/upload/${post.image}`} alt={post.title} className="w-full rounded-md" />
              <div className="flex space-x-4 mt-4 mr-2">
                <FaPencilAlt className="text-blue-500 text-2xl cursor-pointer" onClick={() => editRow(post.post_id)} />
                <FaTrashAlt className="text-red-500 text-2xl cursor-pointer" onClick={() => deleteRow(post.post_id)}/>
              </div>
              <div className="mt-4 flex items-center">
                <input type="text" placeholder="Your comment..." className="border border-gray-300 rounded-md px-4 py-2 mr-2" value={comment} onChange={(e) => setComment(e.target.value)} />
                <FaArrowAltCircleRight className="text-blue-200 text-2xl cursor-pointer" onClick={() => handleAddComment(post.post_id, comment)} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LandingPage;
