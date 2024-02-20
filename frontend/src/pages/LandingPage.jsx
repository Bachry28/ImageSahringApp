import React, { useState, useEffect } from 'react';
import { getAllpost } from '../modules/fetch/post';

function LandingPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    getAllpost()
      .then((result) => {
        if (result && result.posts) {
          setData(result.posts);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch posts', error);
        setError('Failed to fetch posts');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Landing Page</h1>
      <div>
        {data.length === 0 ? (
          <p>No posts available</p>
        ) : (
          data.map((post) => (
            <div key={post.post_id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <img src={`http://localhost:8000/post/${post.image}`} alt={post.title} />
              {/* Add more post details as needed */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LandingPage;
