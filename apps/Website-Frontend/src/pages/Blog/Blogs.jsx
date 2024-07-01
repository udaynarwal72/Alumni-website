import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Navbar";
import Footer from "../../components/footer"; // Corrected import
import Cookies from "js-cookie";
import "../../styles/Blogs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import API_URL from "../../helpers/ApiKey";

const Blogs = () => {
    const { blogId } = useParams();
    const [blogData, setBlogData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [isLikedByUser, setIsLikedByUser] = useState(false);
    const [commentError, setCommentError] = useState(null);

    const fetchBlogData = async () => {
        try {
            const blogResponse = await axios.get(`${API_URL}/api/v1/blog/single/${blogId}`);
            if (blogResponse.data && blogResponse.data.data) {
                const blog = blogResponse.data.data;
                setBlogData(blog);
                setLikeCount(blog.likes.length);
                // const userId = userData._id;
                // setIsLikedByUser(blog.likes.includes(userId));
            } else {
                console.error("Unexpected response format:", blogResponse.data);
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
            setError("Failed to load blog data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, [blogId]);

    const handleLikeToggle = async () => {
        const url = `http://localhost:3000/api/v1/blog/${isLikedByUser ? 'unlike' : 'like'}/${blogId}`;
        const method = isLikedByUser ? 'delete' : 'post';

        // Optimistic UI update
        setLikeCount(prevCount => prevCount + (isLikedByUser ? -1 : 1));
        setIsLikedByUser(!isLikedByUser);

        try {
            await axios[method](url, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("user-accessToken")}`,
                },
            });
        } catch (error) {
            // Revert optimistic UI update if the request fails
            setLikeCount(prevCount => prevCount + (isLikedByUser ? 1 : -1));
            setIsLikedByUser(isLikedByUser);
            console.error("Error toggling like:", error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const postComment = async (e) => {
        e.preventDefault();
        const comment = e.target.blog_comment.value;
        const data = { user_response: comment };

        try {
            await axios.post(`http://localhost:3000/api/v1/blog/comment/${blogId}`, data, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("user-accessToken")}`,
                },
            });
            e.target.blog_comment.value = "";
            fetchBlogData(); // Fetch blog data again to update comments
        } catch (error) {
            console.error("Error posting comment:", error);
            setCommentError("Failed to post comment. Please try again.");
        }
    };

    const removeComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/blog/comment/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("user-accessToken")}`,
                },
            });
            setBlogData((prevData) => ({
                ...prevData,
                comments: prevData.comments.filter((comment) => comment._id !== commentId),
            }));
        } catch (error) {
            console.error("Error removing comment:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <NavBar />
            <div className="bg-gray-100 min-h-screen">
                <div className="mx-auto p-5 bg-white max-w-4xl ">
                    <div className="flex items-center mb-4">
                        <div className="flex items-center font-dmsans">
                            <img src={blogData.blog_createdBy?.avatar} alt="User profile" className="rounded-full w-12 h-12 mr-4" />
                            <div>
                                <span className="font-bold">~{blogData.blog_createdBy?.username}</span>
                                <span className="ml-2">{formatDate(blogData.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <img src={blogData.blogImage} alt="Blog cover" className="w-full rounded-lg" />
                    </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-4 font-dmserif">{blogData.blog_title}</h1>
                        </div>
                    <div className="mb-4 font-dmsans">{blogData.blog_body}</div>
                    <div className="mb-4">
                        <div className="flex font-dmsans flex-wrap items-center space-x-2">
                            {blogData.blog_tags && blogData.blog_tags.map((tag, index) => (
                                <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4 flex">
                        <div className="mr-4 flex justify-start">
                            <div className="">
                                <FontAwesomeIcon icon={faComment} />
                            </div>
                            <span style={{marginLeft:"-3em"}}>{blogData.comments?.length || 0}</span>
                        </div>
                        <div className="flex items-center">
                            <div className="cursor-pointer mr-2" onClick={handleLikeToggle}>
                                <FontAwesomeIcon icon={faThumbsUp} className={`text-xl ${isLikedByUser ? 'text-blue-500' : 'text-gray-500'}`} />
                            </div>
                            <span style={{marginLeft:"-3.5em"}}>{likeCount}</span>
                        </div>
                    </div>
                    <div className="">
                        <div className="font-bold text-sm">Responses ({blogData.comments?.length || 0})</div>
                        <form onSubmit={postComment} className="flex-col items-end justify-center">
                            <input
                                type="text"
                                id="res"
                                className="w-full p-2 border rounded "
                                name="blog_comment"
                                placeholder="Write a comment..."
                            />
                            <button type="submit" className="bg-[#1F7A8C] text-white mt-2 px-5 py-2 rounded-lg text-sm font-semibold">
                                Submit
                            </button>
                            {commentError && <div className="text-red-500">{commentError}</div>}
                        </form>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Previous comments</h3>
                            {blogData.comments?.map((comment, index) => (
                                <div className="border p-4 rounded mb-4" key={index}>
                                    <div className="flex items-start mb-2">
                                        <img src={comment.createdBy?.avatar} alt="Commenter avatar" className="rounded-full w-8 h-8 mr-4" />
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold">{comment.createdBy?.username}</span>
                                                <span>{formatDate(comment.createdAt)}</span>
                                            </div>
                                            {comment.createdBy?._id === Cookies.get("user-id") && (
                                                <button onClick={() => removeComment(comment._id)} className="text-red-500">Remove</button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="comment-body">{comment.text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Blogs;
