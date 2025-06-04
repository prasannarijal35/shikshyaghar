'use client';

import React, { useState, useRef } from 'react';
import { Blog } from '@/types/blogs';
import { IoClose } from 'react-icons/io5';
import { BiPencil } from 'react-icons/bi';
import Image from 'next/image';
import toast from 'react-hot-toast';
import defaultImage from '@/assets/bannerimages/banner1.jpg';

type Props = {
  closeModal: () => void;
  blog?: Blog;
  onSave: (updatedBlog: Blog) => void;
};

export default function AddBlogModal({ closeModal, blog, onSave }: Props) {
  const [formData, setFormData] = useState<Blog>(
    blog || {
      id: Date.now(),
      title: '',
      slug: '',
      category: '',
      image: '', // Will be set later
      description: '',
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'title'
        ? { slug: value.toLowerCase().replace(/\s+/g, '-') }
        : {}),
    }));
  };

  const chooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageChangeClick = () => {
    fileInputRef.current?.click();
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
    closeModal();
    toast.success(blog ? 'Blog updated' : 'Blog added');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-dark rounded-lg shadow-3xl p-6 w-full max-w-3xl relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {blog ? 'Edit' : 'Add'} Blog
          </h3>
          <button
            title="close"
            type="button"
            className="text-gray-500 hover:bg-gray-200 dark:text-gray-400 rounded-lg w-8 h-8 flex justify-center items-center hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Image upload and preview */}
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src={
                  typeof formData.image === 'string' && formData.image
                    ? formData.image
                    : defaultImage
                }
                alt="Blog"
                width={180}
                height={180}
                className="object-cover h-[180px] w-[180px] rounded-full border"
              />
              <div
                className="absolute bottom-0 right-4 bg-primary/70 text-white p-2 rounded-full cursor-pointer hover:bg-primary"
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

          {/* Image error */}
          {errors.image && (
            <p className="text-danger text-sm italic">{errors.image}</p>
          )}

          {/* Title */}
          <div>
            <label className="text-sm font-medium">Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full mt-1 px-4 py-2 border ${
                errors.title ? 'border-danger' : 'border-gray-300'
              } rounded-md focus:outline-none`}
            />
            {errors.title && (
              <p className="text-danger text-sm italic">{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium">Category *</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full mt-1 px-4 py-2 border ${
                errors.category ? 'border-danger' : 'border-gray-300'
              } rounded-md focus:outline-none`}
            />
            {errors.category && (
              <p className="text-danger text-sm italic">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full mt-1 px-4 py-2 border ${
                errors.description ? 'border-danger' : 'border-gray-300'
              } rounded-md focus:outline-none`}
            />
            {errors.description && (
              <p className="text-danger text-sm italic">{errors.description}</p>
            )}
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark"
            >
              {blog ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
