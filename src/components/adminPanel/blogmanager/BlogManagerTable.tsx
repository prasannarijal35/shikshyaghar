'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import blogService from '@/services/blogServices';
import AddBlogModal from './AddBlogModal';
import DeleteModal from './DeleteModal';
import { Blog } from '@/types/blogs';

export default function BlogManagerTable() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>(undefined);
  const [selectedBlogForDelete, setSelectedBlogForDelete] = useState<Blog | null>(null);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllBlogs();
      setBlogs(data);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to fetch blogs');
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
    setBlogs(prev =>
      prev.some(b => b.id === blog.id)
        ? prev.map(b => (b.id === blog.id ? blog : b))
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
      setBlogs(prev => prev.filter(b => b.id !== selectedBlogForDelete.id));
      toast.success(`Deleted "${selectedBlogForDelete.title}"`);
      setSelectedBlogForDelete(null);
      setShowDeleteModal(false);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to delete blog');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-primary font-semibold">Blog Manager</h1>
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-white hover:text-primary border border-primary transition"
        >
          Add Blog
        </button>
      </div>

      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-4 text-left text-[15px] font-medium">ID</th>
                <th className="py-4 px-4 text-left text-[15px] font-medium">Image</th>
                <th className="py-4 px-4 text-left text-[15px] font-medium">Title</th>
                <th className="py-4 px-4 text-left text-[15px] font-medium">Category</th>
                <th className="py-4 px-4 text-left text-[15px] font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-base">
              {blogs.map((blog, idx) => (
                <tr key={blog.id} className="border-t hover:bg-primary/10">
                  <td className="py-5 px-4">{idx + 1}</td>
                  <td className="py-5 px-4">
                    {blog.image ? (
                      <Image
                        src={blog.image.startsWith('http') ? blog.image : `/${blog.image}`}
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
                  <td className="py-5 px-4">{blog.title}</td>
                  <td className="py-5 px-4">{blog.category}</td>
                  <td className="py-5 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 rounded-md text-primary hover:bg-primary/20 hover:text-primary-dark transition"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(blog)}
                      className="p-2 rounded-md text-red-600 hover:bg-red-600 hover:text-white transition"
                      title="Delete"
                    >
                      <FaTrashAlt size={16} />
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
        <DeleteModal
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
