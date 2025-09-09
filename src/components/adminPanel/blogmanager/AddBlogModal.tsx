'use client';

import React, { useState, useRef } from 'react';
import { Blog } from '@/types/blogs';
import { IoClose } from 'react-icons/io5';
import { BiPencil } from 'react-icons/bi';
import Image from 'next/image';
import toast from 'react-hot-toast';
import defaultImage from '@/assets/bannerimages/banner1.jpg';
import blogService from '@/services/blogServices';

type Props = {
  closeModal: () => void;
  blog?: Blog;
  onSave: (blog: Blog) => void;
};

export default function AddBlogModal({ closeModal, blog, onSave }: Props) {
  const [formData, setFormData] = useState<Partial<Blog>>(blog || {
    title: '',
    slug: '',
    category: '',
    image: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(blog?.image || null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' ? { slug: value.toLowerCase().replace(/\s+/g, '-') } : {})
    }));
  };

  const chooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChangeClick = () => fileInputRef.current?.click();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title?.trim()) newErrors.title = "Title is required";
    if (!formData.category?.trim()) newErrors.category = "Category is required";
    if (!formData.description?.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const payload = new FormData();
      payload.append('title', formData.title!);
      payload.append('category', formData.category!);
      payload.append('description', formData.description!);
      if (selectedFile) payload.append('image', selectedFile);

      const savedBlog = blog?.id
        ? await blogService.updateBlog(blog.id, payload)
        : await blogService.createBlog(payload);

      onSave(savedBlog);
      toast.success(blog ? 'Blog updated' : 'Blog added');
      closeModal();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-dark rounded-lg shadow-3xl p-6 w-full max-w-3xl relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{blog ? 'Edit' : 'Add'} Blog</h3>
          <button
            type="button"
            className="text-gray-500 hover:bg-gray-200 rounded-lg w-8 h-8 flex justify-center items-center"
            onClick={closeModal}
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src={preview || defaultImage}
                alt="Blog"
                width={180}
                height={180}
                className="object-cover h-[180px] w-[180px] rounded-full border"
              />
              <div
                className="absolute bottom-0 right-4 bg-primary/70 text-white p-2 rounded-full cursor-pointer"
                onClick={handleImageChangeClick}
              >
                <BiPencil />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={chooseImage}
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label>Title *</label>
            <input
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className={`w-full mt-1 px-4 py-2 border ${errors.title ? 'border-danger' : 'border-gray-300'} rounded-md`}
            />
            {errors.title && <p className="text-danger text-sm">{errors.title}</p>}
          </div>

          {/* Category */}
          <div>
            <label>Category *</label>
            <input
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              className={`w-full mt-1 px-4 py-2 border ${errors.category ? 'border-danger' : 'border-gray-300'} rounded-md`}
            />
            {errors.category && <p className="text-danger text-sm">{errors.category}</p>}
          </div>

          {/* Description */}
          <div>
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              className={`w-full mt-1 px-4 py-2 border ${errors.description ? 'border-danger' : 'border-gray-300'} rounded-md`}
            />
            {errors.description && <p className="text-danger text-sm">{errors.description}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
              {blog ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
