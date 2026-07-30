'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline';

interface ServicesPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceCategories = [
  {
    title: 'Design & Development',
    services: [
      {
        name: 'Website Design',
        description: 'Responsive Website Design',
        icon: GlobeAltIcon,
        href: '/services/web-development'
      },
      {
        name: 'Mobile App Development',
        description: 'Android App Development',
        icon: DevicePhoneMobileIcon,
        href: '/services/app-development'
      }
    ]
  },
  {
    title: 'Marketing Solution',
    services: [
      {
        name: 'Digital Marketing',
        description: 'Ad Campaign Management.',
        icon: MegaphoneIcon,
        href: '/services/seo-ads'
      }
    ]
  }
];

export default function ServicesPopup({ isOpen, onClose }: ServicesPopupProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 px-4 py-3">
                  <button
                    onClick={onClose}
                    className="absolute right-2.5 top-2.5 p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                  
                  <Dialog.Title className="text-lg font-bold text-white mb-0.5">
                    Our Services
                  </Dialog.Title>
                  <p className="text-[11px] text-teal-100">
                    Explore our comprehensive range of digital solutions
                  </p>
                </div>

                {/* Content */}
                <div className="px-4 py-3 bg-gradient-to-br from-gray-50 to-teal-50">
                  {/* Single Card with All Services */}
                  <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                    <div className="grid gap-2">
                      {serviceCategories.flatMap((category) => 
                        category.services.map((service, serviceIdx) => (
                          <Link
                            key={`${category.title}-${serviceIdx}`}
                            href={service.href}
                            onClick={onClose}
                            className="group flex items-start space-x-2 p-2 rounded-lg hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-teal-200"
                          >
                            {/* Icon */}
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <service.icon className="w-4 h-4 text-white" />
                              </div>
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-200 leading-tight">
                                {service.name}
                              </h4>
                              <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
                                {service.description}
                              </p>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>

                  {/* View All Services Button */}
                  <div className="mt-3 text-center">
                    <Link
                      href="/services"
                      onClick={onClose}
                      className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-semibold rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <span>View All Services</span>
                      <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
