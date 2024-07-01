import { useNavigate } from "react-router";

const BlogSectionCard = ({ data }) => {
    const navigate = useNavigate();
    const { blog_title, blog_body, blogImage, blog_tags, blog_createdBy, createdAt, _id } = data;

    // Function to limit the blog body to 20 words
    const truncateText = (text, limit) => {
        const words = text.split(' ');
        return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
    };
    const redirectBlog = () => {
        navigate(`/blogpage/${_id}`);
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <div className="p-4 m-4 bg-white shadow-md rounded-lg flex flex-col md:flex-row">
            <div className="md:w-2/3 p-4">
                <div className="flex items-center">
                    <img
                        src={blog_createdBy.avatar}
                        className="w-12 h-12 rounded-full mr-4"
                        alt="Author"
                    />
                    <div>
                        <p className="text-gray-700">@{blog_createdBy.username}</p>
                        <span className="text-gray-500 text-sm">{formatDate(createdAt)}</span>
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl text-left font-bold text-gray-900">{blog_title}</h2>
                </div>
                <div className="mb-4 text-gray-700">
                    {truncateText(blog_body, 50)}
                </div>
                <div className="flex flex-wrap items-center space-x-2 mb-4">
                    {blog_tags?.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{tag}</span>
                    ))}
                </div>
                {/* <button
                    onClick={redirectBlog}
                    className="bg-[#1F7A8C] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Read More
                </button> */}
            </div>
            <div className="md:w-1/3">
                <img
                    src={blogImage}
                    alt="Blog"
                    className="w-full h-48 object-cover rounded-lg"
                />
            </div>
        </div>
    );
};

export default BlogSectionCard;
