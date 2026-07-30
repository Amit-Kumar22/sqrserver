'use client';

import { useState, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { PlusIcon, XMarkIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ProjectFormData {
  title: string;
  description: string;
  detailedDescription: string;
  technologies: { value: string }[];
  category: string;
  subcategory: string;
  status: 'completed' | 'ongoing' | 'planned';
  startDate: string;
  endDate?: string;
  demoUrl?: string;
  githubUrl?: string;
  externalUrl?: string;
  featured: boolean;
  images: string[];
}

interface ProjectFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<boolean>;
  onCancel: () => void;
  isEditing?: boolean;
}

const categories = [
  { value: 'it-solutions', label: 'IT Solutions' },
  { value: 'research-development', label: 'Research & Development' },
];

const subcategories = {
  'it-solutions': [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile Apps' },
    { value: 'desktop-app', label: 'Desktop Apps' },
    { value: 'cloud-solutions', label: 'Cloud Solutions' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'system-integration', label: 'System Integration' },
    { value: 'other', label: 'Other' },
  ],
  'research-development': [
    { value: 'ai-ml', label: 'AI & Machine Learning' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'iot', label: 'Internet of Things' },
    { value: 'cybersecurity', label: 'Cybersecurity Research' },
    { value: 'other', label: 'Other' },
  ],
};

const statusOptions = [
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'planned', label: 'Planned' },
];

export default function ProjectForm({ initialData, onSubmit, onCancel, isEditing = false }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [dragActive, setDragActive] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      detailedDescription: initialData?.detailedDescription || '',
      technologies: initialData?.technologies?.map((tech: string) => ({ value: tech })) || [{ value: '' }],
      category: initialData?.category || 'it-solutions',
      subcategory: initialData?.subcategory || 'web-development',
      status: initialData?.status || 'ongoing',
      startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '',
      endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '',
      demoUrl: initialData?.demoUrl || '',
      githubUrl: initialData?.githubUrl || '',
      externalUrl: initialData?.externalUrl || '',
      featured: initialData?.featured || false,
      images: initialData?.images || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'technologies',
  });

  const watchStatus = watch('status');
  const watchCategory = watch('category');

  // File upload handlers
  const uploadImage = useCallback(async (file: File) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const newImages = [...images, data.url];
        setImages(newImages);
        setValue('images', newImages);
        toast.success('Image uploaded successfully!');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  }, [images, setValue]);

  const removeImage = async (index: number, imageUrl: string) => {
    try {
      // Extract filename from URL
      const filename = imageUrl.split('/').pop();
      if (filename) {
        await fetch(`/api/upload?filename=${filename}`, {
          method: 'DELETE',
        });
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }

    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue('images', newImages);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(uploadImage);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      Array.from(e.dataTransfer.files).forEach(uploadImage);
    }
  }, [uploadImage]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleFormSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    
    try {
      // Transform data for API
      const projectData = {
        ...data,
        technologies: data.technologies.map(tech => tech.value).filter(tech => tech.trim() !== ''),
        endDate: data.endDate || undefined,
        demoUrl: data.demoUrl || undefined,
        githubUrl: data.githubUrl || undefined,
        externalUrl: data.externalUrl || undefined,
        images: images,
      };
      
      const success = await onSubmit(projectData);
      
      if (success) {
        toast.success(
          isEditing ? 'Project updated successfully!' : 'Project created successfully!'
        );
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card-compact">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {isEditing ? 'Edit Project' : 'Add New Project'}
      </h2>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="label-text">Project Title *</label>
            <input
              type="text"
              id="title"
              {...register('title', {
                required: 'Project title is required',
                maxLength: {
                  value: 100,
                  message: 'Title must be less than 100 characters',
                },
              })}
              className="input-field"
              placeholder="Enter project title"
            />
            {errors.title && (
              <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="category" className="label-text">Category *</label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className="input-field"
              onChange={(e) => {
                // Reset subcategory when category changes
                const newCategory = e.target.value as keyof typeof subcategories;
                setValue('subcategory', subcategories[newCategory]?.[0]?.value || '');
              }}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="subcategory" className="label-text">Subcategory *</label>
            <select
              id="subcategory"
              {...register('subcategory', { required: 'Subcategory is required' })}
              className="input-field"
            >
              {(subcategories[watchCategory as keyof typeof subcategories] || []).map((subcategory) => (
                <option key={subcategory.value} value={subcategory.value}>
                  {subcategory.label}
                </option>
              ))}
            </select>
            {errors.subcategory && (
              <p className="text-red-600 text-xs mt-1">{errors.subcategory.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="status" className="label-text">Status *</label>
            <select
              id="status"
              {...register('status', { required: 'Status is required' })}
              className="input-field"
            >
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-600 text-xs mt-1">{errors.status.message}</p>
            )}
          </div>
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="label-text">Short Description *</label>
          <textarea
            id="description"
            rows={2}
            {...register('description', {
              required: 'Description is required',
              maxLength: {
                value: 200,
                message: 'Description must be less than 200 characters',
              },
            })}
            className="input-field resize-none"
            placeholder="Brief project description (max 200 characters)"
          />
          {errors.description && (
            <p className="text-red-600 text-xs mt-1">{errors.description.message}</p>
          )}
        </div>
        
        {/* Detailed Description */}
        <div>
          <label htmlFor="detailedDescription" className="label-text">Detailed Description *</label>
          <textarea
            id="detailedDescription"
            rows={6}
            {...register('detailedDescription', {
              required: 'Detailed description is required',
            })}
            className="input-field resize-none"
            placeholder="Comprehensive project description with technical details, challenges, solutions, etc."
          />
          {errors.detailedDescription && (
            <p className="text-red-600 text-xs mt-1">{errors.detailedDescription.message}</p>
          )}
        </div>
        
        {/* Technologies */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label-text">Technologies Used *</label>
            <button
              type="button"
              onClick={() => append({ value: '' })}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded hover:bg-primary-200"
            >
              <PlusIcon className="w-3 h-3 mr-1" />
              Add Technology
            </button>
          </div>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  {...register(`technologies.${index}.value`, {
                    required: index === 0 ? 'At least one technology is required' : false,
                  })}
                  className="input-field flex-1"
                  placeholder="e.g. React, Node.js, MongoDB"
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {errors.technologies?.[0]?.value && (
            <p className="text-red-600 text-xs mt-1">{errors.technologies[0].value.message}</p>
          )}
        </div>
        
        {/* Dates */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="startDate" className="label-text">Start Date *</label>
            <input
              type="date"
              id="startDate"
              {...register('startDate', { required: 'Start date is required' })}
              className="input-field"
            />
            {errors.startDate && (
              <p className="text-red-600 text-xs mt-1">{errors.startDate.message}</p>
            )}
          </div>
          
          {watchStatus === 'completed' && (
            <div>
              <label htmlFor="endDate" className="label-text">End Date</label>
              <input
                type="date"
                id="endDate"
                {...register('endDate')}
                className="input-field"
              />
            </div>
          )}
        </div>
        
        {/* URLs */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="demoUrl" className="label-text">Demo URL</label>
            <input
              type="url"
              id="demoUrl"
              {...register('demoUrl')}
              className="input-field"
              placeholder="https://demo.example.com"
            />
          </div>
          
          <div>
            <label htmlFor="githubUrl" className="label-text">GitHub URL</label>
            <input
              type="url"
              id="githubUrl"
              {...register('githubUrl')}
              className="input-field"
              placeholder="https://github.com/username/repo"
            />
          </div>
          
          <div>
            <label htmlFor="externalUrl" className="label-text">External Project URL</label>
            <input
              type="url"
              id="externalUrl"
              {...register('externalUrl')}
              className="input-field"
              placeholder="https://client-website.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              Link to the live project website
            </p>
          </div>
        </div>
        
        {/* Project Images */}
        <div>
          <label className="label-text">Project Images</label>
          <p className="text-sm text-gray-500 mb-3">
            Upload images to showcase your project (Max 5MB per image, JPEG/PNG/WebP/GIF)
          </p>
          
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Drag and drop images here, or{' '}
                <label className="cursor-pointer text-primary-600 hover:text-primary-500">
                  browse to upload
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </p>
              {uploadingImage && (
                <p className="text-sm text-primary-600">
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                  Uploading...
                </p>
              )}
            </div>
          </div>

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Uploaded Images ({images.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Project image ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index, image)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            {...register('featured')}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
            Featured Project (will be highlighted on the website)
          </label>
        </div>
        
        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Update Project' : 'Create Project'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}