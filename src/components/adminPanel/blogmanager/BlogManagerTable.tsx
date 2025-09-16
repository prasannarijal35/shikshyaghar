"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import blogService from "@/services/blogServices";
import AddBlogModal from "./AddBlogModal";
import { Blog } from "@/types/blogs";
import { DeleteConfirmationModal } from "@/components/common";
import { FiTrash2 } from "react-icons/fi";

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-primary font-semibold">Blog Manager</h1>
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
        >
          Add Blog
        </button>
      </div>

      {loading ? (
        <p className="p-6 text-gray-500">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="p-6 text-gray-500">No blogs available.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">
                  ID
                </th>
                <th className="py-4 px-6 text-center font-semibold text-gray-700">
                  Image
                </th>
                <th className="py-4 px-6 text-center font-semibold text-gray-700">
                  Title
                </th>
                <th className="py-4 px-6 text-center font-semibold text-gray-700">
                  Category
                </th>
                <th className="py-4 px-6 text-right font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {blogs.map((blog, idx) => (
                <tr
                  key={blog.id}
                  className="hover:bg-primary/10 transition-colors"
                >
                  <td className="py-5 px-6 text-left">{idx + 1}</td>
                  <td className="py-5 px-6 text-center">
                    {blog.image ? (
                      <Image
                        src={
                          blog.image.startsWith("http")
                            ? blog.image
                            : `/${blog.image}`
                        }
                        alt={blog.title}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="py-5 px-6 text-center">{blog.title}</td>
                  <td className="py-5 px-6 text-center">{blog.category}</td>
                  <td className="py-5 px-6 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(blog)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  );
}
