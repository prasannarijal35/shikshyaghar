"use client";

import { useState } from "react";
import { Blog } from "@/types/blogs";
import { blogs as initialBlogs } from "@/data/blog";
import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { AddBlogModal } from "@/components/adminpanel/blogmanager";
import { DeleteModal } from "../students";

export default function BlogManagerTable() {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlogForDelete, setSelectedBlogForDelete] =
    useState<Blog | null>(null);

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedBlog(null);
    setShowModal(true);
  };

  const handleSave = (updatedBlog: Blog) => {
    setBlogs((prev) =>
      prev.some((b) => b.id === updatedBlog.id)
        ? prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
        : [...prev, updatedBlog]
    );
    toast.success(`Saved blog "${updatedBlog.title}"`);
  };

  const handleDelete = () => {
    if (!selectedBlogForDelete) return;
    setBlogs((prev) => prev.filter((b) => b.id !== selectedBlogForDelete.id));
    toast.success(`Deleted "${selectedBlogForDelete.title}"`);
    setSelectedBlogForDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Blog Manager</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Blog
        </button>
      </div>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{blog.id}</td>
                <td className="py-3 px-4">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </td>
                <td className="py-3 px-4">{blog.title}</td>
                <td className="py-3 px-4">{blog.category}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="text-blue-600 hover:text-white hover:bg-blue-600 p-2 rounded transition"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBlogForDelete(blog);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-white hover:bg-red-600 p-2 rounded transition"
                      title="Delete"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <AddBlogModal
          blog={selectedBlog || undefined}
          closeModal={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        description={`Are you sure you want to delete "${selectedBlogForDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
