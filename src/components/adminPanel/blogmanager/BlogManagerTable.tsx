"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import blogService from "@/services/blogServices";
import AddBlogModal from "./AddBlogModal";
import { Blog } from "@/types/blogs";
import { DeleteConfirmationModal } from "@/components/common";
import { FiTrash2 } from "react-icons/fi";
import {
  BookOpen,
  FileText,
  PenTool,
  Plus,
  Sparkles,
  Edit,
  ImageIcon,
} from "lucide-react";

export default function BlogManagerTable() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>(undefined);
  const [selectedBlogForDelete, setSelectedBlogForDelete] =
    useState<Blog | null>(null);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllBlogs();
      setBlogs(data);
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAdd = () => {
    setSelectedBlog(undefined);
    setShowModal(true);
  };

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleSave = (blog: Blog) => {
    setBlogs((prev) =>
      prev.some((b) => b.id === blog.id)
        ? prev.map((b) => (b.id === blog.id ? blog : b))
        : [blog, ...prev]
    );
    toast.success(`Saved blog "${blog.title}"`);
    setShowModal(false);
    setSelectedBlog(undefined);
  };

  const handleDeleteClick = (blog: Blog) => {
    setSelectedBlogForDelete(blog);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedBlogForDelete) return;
    try {
      await blogService.deleteBlog(selectedBlogForDelete.id);
      setBlogs((prev) => prev.filter((b) => b.id !== selectedBlogForDelete.id));
      toast.success(`Deleted "${selectedBlogForDelete.title}"`);
      setSelectedBlogForDelete(null);
      setShowDeleteModal(false);
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete blog");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Enhanced Header */}
      <div className="flex justify-between items-center mb-8 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog Manager
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Create and manage your content with style
            </p>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Blog</span>
            <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </button>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">
              Loading your amazing content...
            </p>
          </div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[500px] px-6 py-12 relative">
          {/* Animated Icon Container */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <FileText className="w-16 h-16 text-blue-500" />
            </div>
            {/* Floating decorative icons */}
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center animate-bounce shadow-md">
              <PenTool className="w-5 h-5 text-purple-500" />
            </div>
            <div
              className="absolute -bottom-3 -left-3 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center animate-bounce shadow-md"
              style={{ animationDelay: "0.5s" }}
            >
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-6 max-w-lg">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              No Blogs Yet
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Your blog collection is waiting to be filled with amazing content.
              Start your journey by creating your first masterpiece!
            </p>

            {/* Call to Action Button */}
            <button
              onClick={handleAdd}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <PenTool className="w-5 h-5 mr-3" />
              Create Your First Blog
            </button>
          </div>

          {/* Background Decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-100 rounded-full opacity-30 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/3 w-24 h-24 bg-indigo-100 rounded-full opacity-30 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Image
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Title
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Category
                  </th>
                  <th className="py-4 px-6 text-right font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blogs.map((blog, idx) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-blue-50/50 transition-all duration-200 group"
                  >
                    <td className="py-6 px-6 text-gray-900 font-medium">
                      {idx + 1}
                    </td>
                    <td className="py-6 px-6 text-center">
                      {blog.image ? (
                        <div className="flex justify-center">
                          <Image
                            src={
                              blog.image.startsWith("http")
                                ? blog.image
                                : `/${blog.image}`
                            }
                            alt={blog.title}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-lg object-cover shadow-md group-hover:shadow-lg transition-shadow duration-200"
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shadow-md">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="py-6 px-6">
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-left">
                        {blog.title}
                      </div>
                    </td>
                    <td className="py-6 px-6 text-center">
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                        {blog.category}
                      </span>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="flex items-center px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(blog)}
                          className="flex items-center px-3 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <AddBlogModal
          blog={selectedBlog}
          closeModal={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Confirm Deletion"
          description={`Are you sure you want to delete "${selectedBlogForDelete?.title}"? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </main>
  );
}
