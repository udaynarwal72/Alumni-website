import "../styles/BlogSection.css"
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import BlogSlider from "../components/BlogSlider/BlogSlider";
import BlogSectionCard from "../components/Blog-section-card/BlogSectionCard";

const BlogSection= () =>{
    return(
        <div>
            <NavBar />
            <div className="parent-blog-section">
                <div className="blog-section-slider">
                    <div><h1 className="trending">Trending Blogs</h1></div>
                   <BlogSlider /> 
                   <div><h1 class="RecentPosts">Recent Posts</h1></div>
                </div>
                <div className="section-content">
                    <div className="main-content">
                         
                        <BlogSectionCard />
                        <BlogSectionCard />
                        <BlogSectionCard />
                        <BlogSectionCard />
                    </div>
                    <div className="side-bar">
                        
                            <section>
                            <div className="side-search">
                            <h2 className="section-title">Search</h2>
                            <form>
                                <input type="text" name="search-term" className="text-input-blog"
                                placeholder="Search...."></input>
                            </form>
                        </div>
                            </section>
                        <section>
                        <div className="section-topics">
                            <h2 className="section-title">Topics</h2>
                            <ul>
                                <li><a href="">Technology</a></li>
                                <li><a href="">Statistics</a></li>
                                <li><a href="">Fiction</a></li>
                                <li><a href="">Inspiration</a></li>
                                <li><a href="">Shayaris</a></li>
                                <li><a href="">Stories</a></li>
                            </ul>
                        </div>
                        </section>
                        
                        
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BlogSection;