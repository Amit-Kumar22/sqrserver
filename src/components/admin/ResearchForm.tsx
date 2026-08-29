'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Plus as PlusIcon, X as XMarkIcon } from 'lucide-react';

interface ResearchFormData {
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: { value: string }[];
  published: boolean;
  author: string;
}

interface ResearchFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<boolean>;
  onCancel: () => void;
  isEditing?: boolean;
}

const categories = [
  { value: 'artificial-intelligence', label: 'Artificial Intelligence' },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'iot', label: 'Internet of Things' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'cloud-computing', label: 'Cloud Computing' },
  { value: 'other', label: 'Other' },
];

export default function ResearchForm({ initialData, onSubmit, onCancel, isEditing = false }: ResearchFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResearchFormData>({
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      summary: initialData?.summary || '',
      category: initialData?.category || 'artificial-intelligence',
      tags: initialData?.tags?.map((tag: string) => ({ value: tag })) || [{ value: '' }],
      published: initialData?.published || false,
      author: initialData?.author || '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const handleFormSubmit = async (data: ResearchFormData) => {
    setIsSubmitting(true);
    
    try {
      // Transform data for API
      const researchData = {
        ...data,
        tags: data.tags.map(tag => tag.value).filter(tag => tag.trim() !== ''),
      };
      
      const success = await onSubmit(researchData);
      
      if (success) {
        toast.success(
          isEditing ? 'Research updated successfully!' : 'Research created successfully!'
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
        {isEditing ? 'Edit Research Content' : 'Add New Research Content'}
      </h2>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="label-text">Research Title *</label>
            <input
              type="text"
              id="title"
              {...register('title', {
                required: 'Research title is required',
                maxLength: {
                  value: 150,
                  message: 'Title must be less than 150 characters',
                },
              })}
              className="input-field"
              placeholder="Enter research title"
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
            <label htmlFor="author" className="label-text">Author *</label>
            <input
              type="text"
              id="author"
              {...register('author', { required: 'Author is required' })}
              className="input-field"
              placeholder="Author name"
            />
            {errors.author && (
              <p className="text-red-600 text-xs mt-1">{errors.author.message}</p>
            )}
          </div>
        </div>
        
        {/* Summary */}
        <div>
          <label htmlFor="summary" className="label-text">Summary *</label>
          <textarea
            id="summary"
            rows={3}
            {...register('summary', {
              required: 'Summary is required',
              maxLength: {
                value: 300,
                message: 'Summary must be less than 300 characters',
              },
            })}
            className="input-field resize-none"
            placeholder="Brief research summary (max 300 characters)"
          />
          {errors.summary && (
            <p className="text-red-600 text-xs mt-1">{errors.summary.message}</p>
          )}
        </div>
        
        {/* Content */}
        <div>
          <label htmlFor="content" className="label-text">Research Content *</label>
          <textarea
            id="content"
            rows={12}
            {...register('content', {
              required: 'Research content is required',
            })}
            className="input-field resize-none"
            placeholder="Full research content, findings, methodology, conclusions, etc."
          />
          {errors.content && (
            <p className="text-red-600 text-xs mt-1">{errors.content.message}</p>
          )}
        </div>
        
        {/* Tags */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label-text">Tags</label>
            <button
              type="button"
              onClick={() => append({ value: '' })}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded hover:bg-primary-200"
            >
              <PlusIcon className="w-3 h-3 mr-1" />
              Add Tag
            </button>
          </div>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  {...register(`tags.${index}.value`)}
                  className="input-field flex-1"
                  placeholder="e.g. machine learning, deep learning, neural networks"
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
        </div>
        
        {/* Published Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            {...register('published')}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-2 text-sm text-gray-700">
            Publish immediately (will be visible on the website)
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
              isEditing ? 'Update Research' : 'Create Research'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}