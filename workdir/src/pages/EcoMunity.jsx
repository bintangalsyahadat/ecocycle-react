import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { FaHeart, FaRegHeart, FaRegComment, FaRegShareFromSquare, FaRetweet } from "react-icons/fa6";
import { motion } from "framer-motion";
import Comment from "../components/ecommunity/Comment";


export default function Ecomunnity() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            user: "EcoWarrior",
            avatar: "/images/user1.png",
            content: "Hari ini kami dengan rekan EcoCycle turun langsung ke lapangan bersama untuk bersih lingkungan ! 🌱✨",
            image: "/images/activities/activity1.webp",
            liked: false,
            likes: 12,
            comments: 3,
            repost: false,
        },
        {
            id: 2,
            user: "GreenHero",
            avatar: "/images/user2.png",
            content: "Baru selesai menanam 5 bibit pohon di halaman rumah 😄🍃",
            image: null,
            liked: true,
            likes: 40,
            comments: 5,
            repost: false,
        },
    ]);

    const [newPost, setNewPost] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [openComment, setOpenComment] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const handleOpenComment = (post) => {
        setSelectedPost(post);
        setOpenComment(true);
    };

    const handleAddComment = (text) => {
        const updated = posts.map((p) =>
            p.id === selectedPost.id
                ? {
                    ...p,
                    comments: p.comments + 1,
                    commentList: [...(p.commentList || []), { text }],
                }
                : p
        );

        setPosts(updated);

        // update selectedPost agar tampilan modal ikut update
        setSelectedPost((prev) => ({
            ...prev,
            comments: prev.comments + 1,
            commentList: [...(prev.commentList || []), { text }],
        }));
    };


    const handleLike = (id) => {
        setPosts((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
                    : p
            )
        );
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleAddPost = () => {
        if (!newPost.trim() && !imagePreview) return;

        const newItem = {
            id: Date.now(),
            user: "You",
            avatar: "/images/default-user.png",
            content: newPost,
            image: imagePreview || null,
            liked: false,
            likes: 0,
            comments: 0,
            repost: false,
        };

        setPosts([newItem, ...posts]);
        setNewPost("");
        setImagePreview(null);
    };

    const handleRepost = (post) => {
        const repost = {
            ...post,
            id: Date.now(),
            user: "You (Repost)",
            repost: true,
            liked: false,
            likes: 0,
        };
        setPosts([repost, ...posts]);
    };

    return (
        <div className="bg-[#F8F9FA] min-h-screen">
            <Navbar />

            <div className="max-w-xl mx-auto mt-4 px-3">

                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="sticky top-0 bg-white py-3 px-4 shadow-md rounded-xl mb-4"
                >
                    <h1 className="font-bold text-xl text-gray-800">Ecomunnity</h1>
                    <p className="text-sm text-gray-500">Bagikan kegiatan ramah lingkunganmu 💚</p>
                </motion.div>

                {/* Posting Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white shadow-md p-4 rounded-xl mb-4"
                >
                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Apa kegiatan hijau kamu hari ini?"
                        className="w-full border-none focus:ring-0 outline-none resize-none text-gray-700"
                    ></textarea>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mt-3">
                            <img
                                src={imagePreview}
                                className="rounded-xl max-h-60 object-cover"
                                alt="preview"
                            />
                        </div>
                    )}

                    <div className="flex justify-between items-center mt-3">
                        <label className="cursor-pointer text-[color:var(--main-color)] font-semibold">
                            Upload Foto
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>

                        <button
                            onClick={handleAddPost}
                            className="px-4 py-2 cursor-pointer bg-[color:var(--main-color)] text-white rounded-full font-semibold hover:opacity-90 transition"
                        >
                            Post
                        </button>
                    </div>
                </motion.div>

                {/* Timeline */}
                {posts.map((post) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white shadow-md rounded-xl p-4 mb-3"
                    >
                        {post.repost && (
                            <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                                <FaRetweet /> Repost dari {post.user}
                            </p>
                        )}

                        <div className="flex gap-3">
                            <img src={post.avatar} className="w-12 h-12 rounded-full object-cover" />

                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">{post.user}</p>
                                <p className="text-gray-600 mt-1">{post.content}</p>

                                {/* Image */}
                                {post.image && (
                                    <img
                                        src={post.image}
                                        className="rounded-xl mt-3 w-full max-h-80 object-cover"
                                    />
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-6 mt-3 text-gray-600 text-sm">

                                    {/* LIKE */}
                                    <button
                                        onClick={() => handleLike(post.id)}
                                        className="flex items-center gap-1 hover:text-red-500 transition"
                                    >
                                        <motion.div
                                            animate={{ scale: post.liked ? 1.3 : 1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {post.liked ? (
                                                <FaHeart className="text-red-500" />
                                            ) : (
                                                <FaRegHeart />
                                            )}
                                        </motion.div>
                                        {post.likes}
                                    </button>

                                    {/* COMMENT */}
                                    <div
                                        onClick={() => handleOpenComment(post)}
                                        className="flex items-center gap-1 hover:text-blue-500 transition cursor-pointer"
                                    >
                                        <FaRegComment />
                                        {post.comments}
                                    </div>


                                    {/* REPOST */}
                                    <div
                                        onClick={() => handleRepost(post)}
                                        className="flex items-center gap-1 hover:text-green-600 transition cursor-pointer"
                                    >
                                        <FaRetweet />
                                        Repost
                                    </div>

                                    {/* SHARE */}
                                    <div className="flex items-center gap-1 hover:text-green-600 transition cursor-pointer">
                                        <FaRegShareFromSquare />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <Comment
                open={openComment}
                onClose={() => setOpenComment(false)}
                post={selectedPost}
                onAddComment={handleAddComment}
            />
        </div>
    );
}
