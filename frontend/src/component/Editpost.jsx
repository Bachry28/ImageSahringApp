import React, { useEffect, useState } from "react";
import { updatePost} from "../modules/fetch/post";

  const UpdateForm = ({ postId, onAdd, onClose, userId }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("post_id", postId);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      const postUpdating = await updatePost(postId, formData);
      onAdd(postUpdating);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to update post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          cols="50"
          className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700">
          Image:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          required
          accept="image/*"
          className="border py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Post"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
