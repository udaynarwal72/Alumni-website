import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/BlogSection.css";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import BlogSlider from "../components/BlogSlider/BlogSlider";
import BlogSectionCard from "../components/Blog-section-card/BlogSectionCard";

const BlogSection = () => {
    const [blogData, setBlogData] = useState([]); // Initial state as an empty array
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const getBlogData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/blog/bulk');
                console.log("this is response",response.data.data)
                if (Array.isArray(response.data.data)) {
                    setBlogData(response.data.data);
                } else {
                    console.error("Unexpected response format:", response.data);
                    setError("Unexpected response format");
                }
                console.log("yo",blogData)
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setError(error.message);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };
        getBlogData();
    }, []);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = blogData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(blogData.length / itemsPerPage);

    return (
        <div>
            <NavBar />
            <div className="parent-blog-section">
                <div className="blog-section-slider">
                    <div><h1 className="trending">Trending Blogs</h1></div>
                    <BlogSlider />
                    <div><h1 className="RecentPosts">Recent Posts</h1></div>
                </div>
                <div className="section-content">
                    <div className="main-content">
                        {loading && <p>Loading...</p>}
                        {error && <p>Error loading blogs. Please try again later.</p>}
                        {Array.isArray(currentItems) && currentItems.map((blogItem, index) => (
                            <BlogSectionCard key={index} data={blogItem} />
                        ))}
                    </div>
                    <div className="side-bar">
                        <section>
                            <div className="side-search">
                                <h2 className="section-title">Search</h2>
                                <form>
                                    <input type="text" name="search-term" className="text-input-blog" placeholder="Search...." />
                                </form>
                            </div>
                        </section>
                        <section>
                            <div className="section-topics">
                                <h2 className="section-title">Topics</h2>
                                <ul>
                                    <li><a href="#">Technology</a></li>
                                    <li><a href="#">Statistics</a></li>
                                    <li><a href="#">Fiction</a></li>
                                    <li><a href="#">Inspiration</a></li>
                                    <li><a href="#">Shayaris</a></li>
                                    <li><a href="#">Stories</a></li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button 
                            key={index} 
                            onClick={() => handlePageChange(index + 1)} 
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BlogSection;
