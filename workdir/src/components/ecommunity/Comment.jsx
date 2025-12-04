import { motion } from "framer-motion";
import { useState } from "react";

export default function Comment({ open, onClose, post, onAddComment }) {
    const [newComment, setNewComment] = useState("");

    if (!open || !post) return null;

    const handleSend = () => {
        if (!newComment.trim()) return;
        onAddComment(newComment);
        setNewComment("");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-end justify-center z-[999]"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                exit={{ y: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-xl p-5 rounded-t-2xl shadow-xl"
            >
                <p className="font-bold text-lg mb-3">Komentar</p>

                {/* Post Preview */}
                <div className="flex gap-3 mb-4">
                    <img src={post.avatar} className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-semibold">{post.user}</p>
                        <p className="text-sm text-gray-600">{post.content}</p>
                    </div>
                </div>

                {/* Comment List */}
                <div className="max-h-56 overflow-y-auto mb-3">
                    {(post.commentList || []).map((c, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                            <div className="w-8 h-8 bg-gray-300 rounded-full" />
                            <div className="bg-gray-100 p-2 rounded-xl text-sm max-w-[80%]">
                                {c.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Comment */}
                <div className="flex gap-2">
                    <input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Tulis komentar..."
                        className="flex-1 border rounded-full px-3 py-2 text-sm focus:ring-[color:var(--main-color)] focus:outline-none"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-[color:var(--main-color)] text-white px-4 py-2 rounded-full text-sm"
                    >
                        Kirim
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
