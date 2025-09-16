import { Blog } from "@/types/blogs";
import myAxios from "./apiServices";
const blogService = {
  getAllBlogs: async (): Promise<Blog[]> => {
    try {
      const response = await myAxios.get("/blogs");
      return response.data.data;
    } catch (err: any) {
      console.error("Get blogs error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Failed to fetch blogs");
    }
  },
  getBlogBySlug: async (slug: string): Promise<Blog> => {
    try {
      const response = await myAxios.get(`/blogs/slug/${slug}`);
      return response.data.data;
    } catch (err: any) {
      console.error(
        "Get blog by slug error:",
        err.response?.data || err.message
      );
      throw new Error(
        err.response?.data?.message || "Failed to fetch blog by slug"
      );
    }
  },
  createBlog: async (formData: FormData): Promise<Blog> => {
    try {
      const response = await myAxios.post("/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (err: any) {
      console.error("Create blog error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Failed to create blog");
    }
  },
  updateBlog: async (id: number, formData: FormData): Promise<Blog> => {
    try {
      const response = await myAxios.put(`/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    } catch (err: any) {
      console.error("Update blog error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Failed to update blog");
    }
  },
  deleteBlog: async (id: number): Promise<void> => {
    try {
      await myAxios.delete(`/blogs/${id}`);
    } catch (err: any) {
      console.error("Delete blog error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Failed to delete blog");
    }
  },
};
export default blogService;
