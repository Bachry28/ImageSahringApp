import React, { useState } from "react";
import { createcomment } from "../modules/fetch/comment";

const AddComment = ({ onClose, onAdd, postId, userId }) => {
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newComment = await createcomment(userId, postId, comment);
            onAdd(newComment);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2">
            <h1 className="text-5xl font-semibold">Comment</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">
                Add Your Comment
            </p>
            <div className="mt-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-2"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            placeholder="Write your comment here..."
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Add Comment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddComment;
