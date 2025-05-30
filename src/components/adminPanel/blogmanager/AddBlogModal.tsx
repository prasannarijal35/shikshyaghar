'use client';

import React, { useState } from 'react';
import { Blog } from '@/types/blogs';
import { IoClose } from 'react-icons/io5';
import { BiPencil } from 'react-icons/bi';
import Image from 'next/image';
import toast from 'react-hot-toast';

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
      image: '',
      description: '',
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChangeClick = () => {
    fileInputRef.current?.click();
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.image.trim()) newErrors.image = 'Image is required';
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
    <div className="relative z-50 p-2 w-full max-w-3xl mt-100">
      <div className="bg-white dark:bg-dark rounded-lg shadow-3xl">
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
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

        {/* Modal Body */}
        <div className="p-4 md:p-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={formData.image || '/default-image.jpg'}
                  alt="Blog"
                  width={180}
                  height={180}
                  className="object-cover h-[180px] w-[180px] rounded-full border border-gray-300 dark:border-gray-500"
                />
                <div
                  className="absolute bottom-0 right-5 bg-primary/70 text-white p-2 rounded-full cursor-pointer hover:bg-primary"
                  onClick={handleImageChangeClick}
                >
                  <BiPencil />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={chooseImage}
              />
            </div>
            {errors.image && (
              <p className="text-danger text-sm italic">{errors.image}</p>
            )}

            <div>
              <label className="text-sm font-medium text-hardgray dark:text-lightgray">
                Title *
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={validate}
                placeholder="Blog title"
                className={`w-full mt-1 px-4 py-2 border ${
                  errors.title ? 'border-danger' : 'border-gray-300'
                } rounded-md focus:outline-none`}
              />
              {errors.title && (
                <p className="text-danger text-sm italic">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-hardgray dark:text-lightgray">
                Category *
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                onBlur={validate}
                placeholder="Category"
                className={`w-full mt-1 px-4 py-2 border ${
                  errors.category ? 'border-danger' : 'border-gray-300'
                } rounded-md focus:outline-none`}
              />
              {errors.category && (
                <p className="text-danger text-sm italic">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-hardgray dark:text-lightgray">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={validate}
                placeholder="Enter blog content..."
                rows={4}
                className={`w-full mt-1 px-4 py-2 border ${
                  errors.description ? 'border-danger' : 'border-gray-300'
                } rounded-md focus:outline-none`}
              />
              {errors.description && (
                <p className="text-danger text-sm italic">
                  {errors.description}
                </p>
              )}
            </div>

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
    </div>
  );
}
