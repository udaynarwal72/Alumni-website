
import Blog from "../../Schema/BlogSchema.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";


const createBlog = async (req, res) => {
    const blog = new Blog(req.body);
    try {
        await Blog.save();
        res.status(201).json(ApiResponse(201, {
            blog
        }, "Blog created successfully"));
    } catch (error) {
        res.status(400).json(new ApiError(400, error.message));
    }
};

const getAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(404).json(new ApiError(404, error.message));
    }
}

const blogDelete = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.blogId);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const putBlog = async (req, res) => {
    try {
        await Blog.findByIdAndUpdate(req.params.blogId, req.body);//Will have to update this line
        res.status(200).json({ message: "Blog updated successfully" });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export  {
    createBlog,
    blogDelete
};