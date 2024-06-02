import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllpost, getpostById, deletePost } from '../modules/fetch/post';
import { getCommentByPostId } from '../modules/fetch/comment';
import { getSpecificUser } from '../modules/fetch/index';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import AddPost from '../component/NewPost';
import UpdateForm from '../component/Editpost';
import AddComment from '../component/AddComment';

function LandingPage() {
  const [data, setData] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [commentUsers, setCommentUsers] = useState({});

  useEffect(() => {
    fetchData();
    fetchUser();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getAllpost();
      if (result && result.posts) {
        const postsWithComments = await Promise.all(
          result.posts.map(async (post) => {
            const comments = await fetchComment(post.post_id);
            console.log(`Comments for post ID ${post.post_id} successfully fetched:`, comments);
            const commentsWithUser = await Promise.all(
              comments.map(async (comment) => {
                const user = await fetchCommentUser(comment.user_id);
                return { ...comment, username: user.username };
              })
            );
            return { ...post, comments: commentsWithUser || [] };
          })
        );
        setData(postsWithComments);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Failed to fetch posts', error);
    }
  };

  const fetchComment = async (post_id) => {
    try {
      const comments = await getCommentByPostId(post_id);
      console.log(`Comments for post ID ${post_id} successfully fetched:`, comments);
      return comments.comments; // Ensure this returns the array of comments
    } catch (error) {
      console.error('Failed to fetch comments', error);
      return [];
    }
  };

  const fetchCommentUser = async (user_id) => {
    try {
      if (commentUsers[user_id]) {
        return commentUsers[user_id];
      }
      const userData = await getSpecificUser(user_id);
      setCommentUsers((prev) => ({ ...prev, [user_id]: userData.user }));
      return userData.user;
    } catch (error) {
      console.error('Failed to fetch user for comment', error);
      return { username: 'Unknown' };
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
      setSelectedPostId(post_id);
      console.log("Selected Post ID:", post_id);
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
        console.error('Failed to delete post', error);
      });
  };

  const handleAddPost = (newPost) => {
    setData((prevData) => [...prevData, newPost]);
  };
  

  const handleAddComment = (newComment) => {
    setData((prevData) =>
      prevData.map((post) =>
        post.post_id === newComment.post_id
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
    setShowAddComment(false); // Hide the add comment form after adding the comment
  };
  

  const toggleAddPost = () => {
    setShowAddPost(!showAddPost);
  };

  const toggleAddComment = (post_id) => {
    setSelectedPostId(post_id);
    setShowAddComment(!showAddComment);
  };

  const logout = () => {
    // Implement logout logic here
    // For example, clear user data from local storage
    localStorage.removeItem("user_id");
    // Redirect user to App page after logout
    navigate('/'); // Assuming the path to App page is '/'
  };

  return (
    <div className="container mx-auto">
      {user && (
        <button
          className="bg-white border border-black hover:border-blue-500 text-black font-bold py-2 px-4 rounded mt-8 mr-10"
          onClick={logout}
        >
          Logout
        </button>
      )}


    <div className="container mx-auto rounded-xl px-4 mt-4 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Image App</h1>
     
      {user && (
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold mb-2 text-bg-slate-200">Welcome {user.username}</h2>
          <img
            src={`http://localhost:8000/upload/${user.foto}`}
            alt={user.foto}
            className="rounded-full mx-auto max-w-full h-auto"
            style={{ width: '350px', height: '350px' }} // Adjust width and height as needed
          />
        </div>
      )}
      {showAddPost && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Post</h3>
            <AddPost userId={user?.user_id} onClose={toggleAddPost} onAdd={handleAddPost} />
          </div>
        </div>
      )}
      {showAddComment && selectedPostId && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Comment</h3>
            <AddComment onAdd={handleAddComment} postId={selectedPostId} userId={user?.user_id} onClose={() => setShowAddComment(false)} />
          </div>
        </div>
      )}
      {showUpdateForm && selectedPostId && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Post</h3>
            <UpdateForm postId={selectedPostId} onAdd={handleAddPost} onClose={toggleUpdateForm} userId={user?.user_id} />
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
              <header className="text-center text-2xl">Title</header>
              <h2 className="text-xl font-semibold mb-4 text-center">{post.title}</h2>
              <header className="text-center text-2xl">Description</header>
              <p className="text-gray-700 mb-4 text-center">{post.description}</p>
              <img
                src={`http://localhost:8000/post/upload/${post.image}`}
                alt={post.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="flex space-x-4 mt-4 mr-2">
                <FaPencilAlt className="text-blue-500 text-2xl cursor-pointer" onClick={() => editRow(post.post_id)} />
                <FaTrashAlt className="text-red-500 text-2xl cursor-pointer" onClick={() => deleteRow(post.post_id)} />
              </div>
              <div>
                <p className='text-red-500 text-left'>Your Comment</p>
                {post.comments.map((comment, index) => (
                  <div key={`${comment.comment_id}-${index}`} className="mb-2">
                    <p className="text-left text-black"><strong>{comment.username}:</strong> {comment.comment}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => toggleAddComment(post.post_id)}>Add Comment</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default LandingPage;
