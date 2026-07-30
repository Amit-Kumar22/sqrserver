"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { CalendarIcon, GlobeAltIcon, CodeBracketIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface Project {
  _id: string;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  category: string;
  status: 'completed' | 'ongoing' | 'planned';
  startDate: string;
  endDate?: string;
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const statusColors: Record<Project['status'], string> = {
  completed: 'bg-green-100 text-green-800',
  ongoing: 'bg-teal-100 text-teal-800',
  planned: 'bg-gray-100 text-gray-800',
};

export default function ProjectDetailsPage() {
  const params: any = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!params?.id) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${params.id}`);

        if (response.status === 404) {
          setNotFound(true);
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }

        const data = await response.json();
        setProject(data.project);
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params?.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-6">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/projects" className="btn-primary">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <Link href="/projects" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 mb-4">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{project.title}</h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>

              <p className="text-lg text-gray-600 mb-4">{project.description}</p>

              {/* Project Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  Started: {formatDate(project.startDate)}
                </div>
                {project.endDate && (
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Completed: {formatDate(project.endDate)}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 lg:mt-0">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <GlobeAltIcon className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <CodeBracketIcon className="w-4 h-4 mr-2" />
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-custom py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card-compact">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Overview</h2>
              <div className="prose prose-sm max-w-none text-gray-700">
                {project.detailedDescription.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-3">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Images */}
            {project.images && project.images.length > 0 && (
              <div className="card-compact mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Images</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.images.map((image, index) => (
                    <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Technologies */}
            <div className="card-compact">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-primary-50 text-primary-700 border border-primary-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="card-compact">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Details</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="text-sm text-gray-900 capitalize">{project.category.replace('-', ' ')}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="text-sm text-gray-900 capitalize">{project.status}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd className="text-sm text-gray-900">{formatDate(project.startDate)}</dd>
                </div>
                {project.endDate && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">End Date</dt>
                    <dd className="text-sm text-gray-900">{formatDate(project.endDate)}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-gray-500">Featured</dt>
                  <dd className="text-sm text-gray-900">{project.featured ? 'Yes' : 'No'}</dd>
                </div>
              </dl>
            </div>

            {/* Contact CTA */}
            <div className="card-compact bg-primary-50 border-primary-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interested in Similar Work?</h3>
              <p className="text-sm text-gray-700 mb-3">Let&apos;s discuss how we can help with your next project.</p>
              <Link href="/contact" className="btn-primary w-full justify-center">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}