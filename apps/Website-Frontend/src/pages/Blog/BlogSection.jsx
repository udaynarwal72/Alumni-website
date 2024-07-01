import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../../styles/BlogSection.css";
import NavBar from "../../components/Navbar";
import Footer from "../../components/footer";
import BlogSlider from "../../components/BlogSlider/BlogSlider";
import BlogSectionCard from "../../components/Blog-section-card/BlogSectionCard";

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 10;

    const fetchBlogs = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/blog/bulk');
            if (Array.isArray(response.data.data)) {
                setBlogs(response.data.data);
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (err) {
            setError("Error fetching blog data: " + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.blog_title.toLowerCase().includes(searchTerm)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <NavBar />
            <div className="parent-blog-section">
                <div className="blog-section-slider">
                    <h1 className="trending">Trending Blogs</h1>
                    <BlogSlider />
                    <h1 className="RecentPosts">Recent Posts</h1>
                </div>
                <div className="section-content">
                    <div className="main-content">
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {currentItems.map((blog, index) => (
                            <BlogSectionCard key={blog._id} data={blog} />
                        ))}
                    </div>
                    <div className="side-bar">
                        <section>
                            <div className="side-search">
                                <h2 className="section-title">Search</h2>
                                <form onSubmit={handleSearchSubmit}>
                                    <input
                                        type="text"
                                        name="search-term"
                                        onChange={handleSearch}
                                        className="text-input-blog"
                                        placeholder="Search..."
                                    />
                                </form>
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
};

export default BlogSection;
