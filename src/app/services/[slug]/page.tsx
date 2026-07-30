'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  PaintBrushIcon,
  ShareIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  SparklesIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import {
  CodeBracketIcon as CodeBracketIconSolid,
  DevicePhoneMobileIcon as DevicePhoneMobileIconSolid,
  ComputerDesktopIcon as ComputerDesktopIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  PaintBrushIcon as PaintBrushIconSolid,
  ShareIcon as ShareIconSolid
} from '@heroicons/react/24/solid';

const servicesData = [
  {
    name: 'Web Development',
    slug: 'web-development',
    shortDescription: 'Modern, responsive websites that drive results',
    longDescription: 'Transform your digital presence with our cutting-edge web development services. We create stunning, high-performance websites that not only look beautiful but also deliver exceptional user experiences and drive business growth.',
    icon: CodeBracketIcon,
    iconSolid: CodeBracketIconSolid,
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'Responsive Websites – Modern, mobile-friendly designs that adapt seamlessly to any device',
      'E-commerce Platforms – Powerful online stores with secure payment integration',
      'Business Websites – Professional web presence that drives growth',
      'Custom Web Applications – Tailored solutions for unique business needs',
      'Website Maintenance – Regular updates, security patches, and technical support to keep your site running smoothly'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS'],
    benefits: [
      'Mobile-first responsive design',
      'SEO-optimized structure',
      'Fast loading speeds',
      'Secure and scalable architecture',
      'Easy content management',
      'Analytics integration',
      'Regular maintenance & updates',
      'Backup & disaster recovery'
    ]
  },
  {
    name: 'App Development',
    slug: 'app-development',
    shortDescription: 'Native and cross-platform mobile solutions',
    longDescription: 'Bring your ideas to life with powerful mobile applications. We develop native and cross-platform apps that deliver seamless experiences across all devices, helping you reach your audience wherever they are.',
    icon: DevicePhoneMobileIcon,
    iconSolid: DevicePhoneMobileIconSolid,
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'Android Apps – Native Android App Development with Fast & Secure Performance, Scalable Mobile Solutions, and Play Store Ready Apps',
      'iOS Apps – Premium iPhone Applications with Smooth User Experience, High-Speed Performance, and Secure Apple Ecosystem Apps',
      'Cross-Platform Solutions – One Codebase for All Platforms using React Native & Flutter Apps with Faster Development Process and Cost-Effective Mobile Solutions',
      'UI/UX Focused Design – Modern & Clean Interfaces with User-Centric Design Approach, Interactive User Experience, and Responsive & Intuitive Layouts',
      'App Maintenance – Regular Updates & Bug Fixes, Performance Monitoring, Security Enhancements, and 24/7 Technical Support',
      'API Integration – Payment Gateway Integration, Third-Party API Services, Cloud Connectivity, and Real-Time Data Sync',
      'App Testing & QA – Manual & Automated Testing, Bug Detection & Fixing, Performance Optimization, and Device Compatibility Testing',
      'Deployment & Support – App Store Deployment, Play Store Publishing, Continuous Monitoring, and Post-Launch Support'
    ],
    technologies: ['React Native',  'REST APIs'],
    benefits: [
      'Native performance',
      'Offline functionality',
      'Push notifications',
      'App store optimization',
      'Regular updates and maintenance',
      'Cross-platform compatibility',
      'Real-time data sync',
      'Cloud integration'
    ]
  },
  {
    name: 'iOS Apps',
    slug: 'ios-apps',
    shortDescription: 'Premium Apple ecosystem applications',
    longDescription: 'Create premium iOS applications that leverage the full power of Apple&apos;s ecosystem. Our team specializes in building elegant, high-performance apps that meet Apple&apos;s stringent quality standards.',
    icon: ComputerDesktopIcon,
    iconSolid: ComputerDesktopIconSolid,
    gradient: 'from-green-600 to-emerald-600',
    features: [
      'Swift Development – Native iOS apps built with Apple&apos;s latest technologies',
      'SwiftUI Interfaces – Modern, declarative UI framework for stunning interfaces',
      'App Store Optimization – Complete guidance for successful app launches',
      'Apple Watch Integration – Extend your app to wearable devices'
    ],
    technologies: ['Swift', 'SwiftUI', 'UIKit', 'Core Data', 'CloudKit', 'Xcode'],
    benefits: [
      'Native iOS performance',
      'Apple design guidelines',
      'App Store approval support',
      'iCloud synchronization',
      'Apple Watch support',
      'Regular iOS updates'
    ]
  },
  {
    name: 'SEO & Ads',
    slug: 'seo-ads',
    shortDescription: 'Digital marketing and search optimization',
    longDescription: 'Boost your online visibility and drive targeted traffic with our comprehensive SEO and advertising services. We help businesses rank higher in search results and run effective ad campaigns that deliver real ROI.',
    icon: ChartBarIcon,
    iconSolid: ChartBarIconSolid,
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'Search Engine Optimization (SEO) – Higher Google Search Rankings with Keyword & Content Optimization, On-Page & Technical SEO, and Organic Traffic Growth',
      'Google Ads Management – High-Converting Ad Campaigns with Targeted Audience Reach, ROI-Focused Marketing, and PPC Campaign Optimization',
      'Social Media Advertising – Facebook & Instagram Ads with Brand Awareness Campaigns, Audience Engagement Strategies, and Lead Generation Marketing',
      'Analytics & Reporting – Real-Time Performance Tracking, Campaign Data Analysis, Monthly Performance Reports, and Conversion & Traffic Insights',
      'Content Marketing – SEO-Friendly Content Creation, Blog & Article Marketing, Website Content Strategy, and Audience Engagement Content',
      'Email Marketing – Personalized Email Campaigns, Customer Retargeting, Promotional Email Automation, and Lead Nurturing Strategies',
      'Local SEO Services – Google Business Optimization, Local Search Visibility, Maps & Location SEO, and Local Lead Generation',
      'Conversion Optimization – Landing Page Optimization, Better User Engagement, Funnel Performance Improvement, and Higher Conversion Rates'
    ],
    technologies: ['Google Analytics', 'Google Ads', 'Facebook Ads', 'Meta Business', 'SEMrush', 'Ahrefs', 'Mailchimp', 'Google Search Console'],
    benefits: [
      'Increased organic traffic',
      'Higher search rankings',
      'Better conversion rates',
      'Detailed analytics',
      'ROI tracking',
      'Brand awareness',
      'Lead generation',
      'Customer retargeting'
    ]
  },
  {
    name: 'E-commerce',
    slug: 'ecommerce',
    shortDescription: 'Complete online store solutions',
    longDescription: 'Launch and grow your online business with our comprehensive e-commerce solutions. We build powerful, scalable online stores that provide seamless shopping experiences and drive sales.',
    icon: ShoppingCartIcon,
    iconSolid: ShoppingCartIconSolid,
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'Custom E-commerce Platforms – Tailored online stores that match your brand',
      'Payment Gateway Integration – Secure payment processing with multiple options',
      'Inventory Management – Efficient stock tracking and order management',
      'Mobile Commerce – Optimized shopping experience for mobile devices'
    ],
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Magento', 'Next.js Commerce'],
    benefits: [
      'Secure payment processing',
      'Inventory management',
      'Order tracking',
      'Customer accounts',
      'Product reviews',
      'Marketing integration'
    ]
  },
  {
    name: 'Android Apps',
    slug: 'android-apps',
    shortDescription: 'Native Android development',
    longDescription: 'Reach billions of Android users with powerful, feature-rich mobile applications. We develop native Android apps that take full advantage of the platform&apos;s capabilities and Google&apos;s latest technologies.',
    icon: DevicePhoneMobileIcon,
    iconSolid: DevicePhoneMobileIconSolid,
    gradient: 'from-green-600 to-emerald-600',
    features: [
      'Kotlin Development – Modern Android apps with the latest language features',
      'Material Design – Beautiful, intuitive interfaces following Google&apos;s guidelines',
      'Play Store Publishing – Complete support for app submission and updates',
      'Android SDK Integration – Leverage the full power of the Android platform'
    ],
    technologies: ['Kotlin', 'Java', 'Android Studio', 'Jetpack Compose', 'Firebase', 'Material Design'],
    benefits: [
      'Native Android performance',
      'Material Design UI',
      'Play Store optimization',
      'Google services integration',
      'Wide device compatibility',
      'Regular Android updates'
    ]
  },
  {
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    shortDescription: 'Beautiful and functional user experiences',
    longDescription: 'Create delightful user experiences that keep customers engaged. Our UI/UX design services focus on understanding your users and crafting intuitive, beautiful interfaces that drive satisfaction and conversions.',
    icon: PaintBrushIcon,
    iconSolid: PaintBrushIconSolid,
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'User Research – Understanding your users to create better experiences',
      'Wireframing & Prototyping – Interactive mockups before development begins',
      'Visual Design – Stunning interfaces that capture your brand identity',
      'Usability Testing – Ensuring your product is intuitive and user-friendly'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer'],
    benefits: [
      'User-centered design',
      'Improved usability',
      'Higher conversion rates',
      'Brand consistency',
      'Accessibility compliance',
      'Design systems'
    ]
  },
  {
    name: 'Social Media',
    slug: 'social-media',
    shortDescription: 'Social media management and marketing',
    longDescription: 'Build and engage your community with strategic social media management. We help brands create compelling content, grow their audience, and turn followers into customers across all major social platforms.',
    icon: ShareIcon,
    iconSolid: ShareIconSolid,
    gradient: 'from-green-600 to-emerald-600',
    features: [
      'Content Strategy – Engaging content plans that resonate with your audience',
      'Community Management – Building and nurturing your online community',
      'Social Media Analytics – Track performance and optimize your strategy',
      'Influencer Partnerships – Connect with influencers to expand your reach'
    ],
    technologies: ['Hootsuite', 'Buffer', 'Sprout Social', 'Meta Business Suite', 'LinkedIn Ads', 'Twitter Ads'],
    benefits: [
      'Increased engagement',
      'Brand awareness',
      'Community growth',
      'Content calendar',
      'Performance analytics',
      'Crisis management'
    ]
  }
];

// Technology icon mapping
const getTechIcon = (tech: string) => {
  const techName = tech.toLowerCase();
  
  if (techName.includes('react')) {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9.85 0c.3-.53.62-1 .91-1.47-.54-.03-1.11-.03-1.71-.03-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L12.54 12l-.81 1.5c-.3.53-.62 1-.91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47L16.77 12z" fill="currentColor"/>
      </svg>
    );
  } else if (techName.includes('next')) {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-1.7044-2.6125-1.7143-2.6091v2.543c0 2.1283-.0026 2.5523-.0306 2.5523-.0188 0-.0877.0148-.1547.033a1.4127 1.4127 0 01-.3584.0445h-.2817l-.1546-.068a.8326.8326 0 01-.2064-.172l-.0493-.1056.0053-4.7031.0067-4.7055.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517z"/>
      </svg>
    );
  } else if (techName.includes('node')) {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
      </svg>
    );
  } else if (techName.includes('mongo')) {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296 4.604-3.254 4.291-11.375zm-5.336 7.23c0-2.21.715-4.284 1.925-5.932.715 3.133.45 6.96-.96 9.273-1.11-1.027-1.752-2.466-1.752-4.01z"/>
      </svg>
    );
  } else if (techName.includes('postgre')) {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5594 14.7228a.5269.5269 0 00-.0563-.1191c-.139-.2632-.4768-.3418-.7403-.1779a7.1446 7.1446 0 01-.7403.3448c-.2858.1161-.5745.2293-.8633.3357a13.9969 13.9969 0 01-1.3216.4535c-.2915.0838-.5974.1572-.9048.2229a6.6555 6.6555 0 01-.5558.0939c-.2688.0386-.5288.0649-.7946.0649-.6809 0-.947-.0649-.947-.0649s.6242-.1018 1.0524-.1649c.6494-.0954 1.2846-.2477 1.8981-.4535.2973-.1003.5917-.2092.8633-.3357.2853-.1309.5673-.2721.8281-.4535.139-.0954.2695-.1909.3919-.2922.1339-.1106.2393-.2468.3067-.3965.0508-.1181.0735-.2468.0649-.3762-.0104-.1689-.0588-.3315-.1425-.4825a1.1201 1.1201 0 00-.5047-.5598c-.2393-.1309-.5047-.2058-.7746-.2263a3.3718 3.3718 0 00-.5832-.0059c-.2031.0059-.4062.0234-.6094.0527-.4124.0586-.8193.1572-1.2178.2865-.4.1309-.7888.2865-1.1455.4711-.3623.1865-.6979.4092-.9872.6622-.2969.2559-.5548.5482-.7659.8687-.2085.3205-.3623.6685-.4535 1.0349-.0883.3648-.1224.7385-.1048 1.1121.0146.3794.0674.7573.1571 1.1268.0898.3705.2208.7326.3623 1.0861.1444.3501.3164.6871.5156 1.0026s.4149.6093.6562.8979c.2383.2842.4974.5453.7715.7813.2727.2373.5585.4535.8545.6622.2974.2117.6053.4092.9106.6152.3052.2024.6209.3823.9409.5613.6445.3633 1.3096.6827 1.9833.9644.6709.2788 1.3594.5088 2.0564.6871.3501.0899.7046.1664 1.0578.2331.3533.0659.7111.1181 1.0723.1561.3575.0381.7179.0649 1.0752.0659.3589.0015.7179-.0234 1.0723-.0659.3632-.0415.7222-.1181 1.0752-.2331.3559-.1181.7074-.2614 1.0519-.4359.3476-.1763.6816-.3823.9975-.6182.3174-.2373.6108-.5062.8759-.7998.2673-.2953.5057-.6152.7148-.9525.2119-.3373.3915-.6929.5419-1.0578.1519-.3633.2788-.7402.3755-1.1268.1003-.3866.1659-.7827.1918-1.1856.0264-.4045-.0015-.8155-.0835-1.2178-.0835-.4062-.2291-.8111-.4359-1.1975zm-9.8393 0.3623c.1785-.0586.3501-.1309.5047-.2144.3091-.1689.5687-.3969.7715-.6622.2058-.2653.3501-.5673.4315-.8979.0845-.3345.1003-.6826.0513-1.0173-.0469-.3374-.1494-.6709-.2949-.9814a2.4168 2.4168 0 00-.6563-.8105 2.5811 2.5811 0 00-.947-.5156c-.3633-.1181-.7544-.1572-1.1404-.1064-.3857.0498-.7544.1914-1.0752.4149-.3208.2234-.5892.5156-.7944.8535-.2051.3379-.3433.7148-.3999 1.1063-.0586.3901-.0425.7871.0527 1.1726.0923.3857.2612.7529.4902 1.0752.2291.3223.5156.5977.8399.8105.3242.2129.6914.3618 1.0752.4315.3867.0718.7871.0513 1.1595-.0527z"/>
      </svg>
    );
  } else if (techName.includes('tailwind')) {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    );
  } else if (techName.includes('swift')) {
    return <span className="text-xl">🍎</span>;
  } else if (techName.includes('kotlin')) {
    return <span className="text-xl">📱</span>;
  } else if (techName.includes('flutter')) {
    return <span className="text-xl">🎯</span>;
  } else if (techName.includes('firebase')) {
    return <span className="text-xl">🔥</span>;
  } else {
    // Default icon for technologies without specific icons
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    );
  }
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/services" className="text-emerald-600 hover:text-emerald-700 font-medium">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = service.iconSolid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/50">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${service.gradient} overflow-hidden ${(service.slug === 'web-development' || service.slug === 'app-development' || service.slug === 'seo-ads') ? 'min-h-[300px]' : 'min-h-[240px]'} shadow-2xl`}>
        {/* Background Image - For Web Development, App Development & SEO/Ads */}
        {(service.slug === 'web-development' || service.slug === 'app-development' || service.slug === 'seo-ads') && (
          <div className="absolute inset-0 z-0">
            <Image
              src={service.slug === 'web-development' ? '/webhero.png' : service.slug === 'app-development' ? '/mobile.png' : '/seo.png'}
              alt={`${service.name} Background`}
              fill
              className="object-cover object-center"
              priority
            />
            {/* Subtle Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/50 via-teal-900/30 to-teal-900/50"></div>
          </div>
        )}
        
        {/* Animated Background - Only for other services */}
        {service.slug !== 'web-development' && service.slug !== 'app-development' && service.slug !== 'seo-ads' && (
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-32 -translate-y-32 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-32 translate-y-32 animate-pulse delay-1000"></div>
          </div>
        )}

        {/* Content */}
        <div className="container-custom py-6 md:py-8 relative z-10">
          {/* Back Button */}
          <Link 
            href="/services" 
            className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors group text-sm"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Services</span>
          </Link>

          <div className="max-w-4xl">
            {/* Text Content */}
            <div>
              {/* Icon */}
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <IconComponent className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
                {service.name}
              </h1>

              {/* Description */}
              <p className="text-sm lg:text-base text-white/90 leading-relaxed mb-5">
                {service.longDescription}
              </p>

              {/* CTA Button */}
              <Link 
                href="/contact" 
                className="inline-flex items-center px-5 py-2.5 bg-white text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <RocketLaunchIcon className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-white py-8 md:py-10">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What We <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>Offer</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => {
                const [title, description] = feature.split(' – ');
                return (
                  <div key={index} className="bg-white hover:bg-green-50 p-4 rounded-lg border border-gray-100 hover:border-green-300 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center mr-3 mt-0.5`}>
                        <CheckCircleIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 mb-1.5">{title}</h3>
                        {description && (
                          <p className="text-gray-600 group-hover:text-green-700 text-xs leading-relaxed transition-colors duration-300">{description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Website Design & Maintenance Highlight - Only for Web Development */}
      {service.slug === 'web-development' && (
        <section className="relative bg-gradient-to-br from-teal-50 via-emerald-50 to-white py-8 md:py-10">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg border border-teal-100 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Content Side */}
                  <div className="p-6 md:p-8">
                    <div className="inline-flex items-center px-3 py-1.5 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold mb-4">
                      <SparklesIcon className="w-4 h-4 mr-1.5" />
                      Featured Service
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Website Design & 
                      <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"> Maintenance</span>
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      We don&apos;t just build websites—we keep them running at peak performance. From stunning designs to ongoing maintenance, we ensure your digital presence stays fresh, secure, and optimized.
                    </p>

                    <div className="space-y-2.5">
                      <div className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Regular security updates & patches</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Performance optimization & monitoring</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Content updates & backup management</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">24/7 technical support</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="relative h-full min-h-[320px] md:min-h-0">
                    <Image
                      src="/service.png"
                      alt="Website Design & Maintenance"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* App Development Featured Section */}
      {service.slug === 'app-development' && (
        <section className="relative bg-gradient-to-br from-purple-50 via-teal-50 to-white py-8 md:py-10">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Content Side */}
                  <div className="p-6 md:p-8">
                    <div className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-4">
                      <SparklesIcon className="w-4 h-4 mr-1.5" />
                      Featured Service
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Mobile App 
                      <span className="bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent"> Development</span>
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      Transform your ideas into powerful mobile experiences. We build native and cross-platform apps that engage users, deliver seamless performance, and drive business growth across iOS and Android.
                    </p>

                    <div className="space-y-2.5">
                      <div className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Native iOS & Android development</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Cross-platform solutions (React Native)</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">App Store & Play Store deployment</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Ongoing maintenance & updates</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="relative h-full min-h-[320px] md:min-h-0">
                    <Image
                      src="/mobile.jpg"
                      alt="Mobile App Development"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SEO & Digital Marketing Featured Section */}
      {service.slug === 'seo-ads' && (
        <section className="relative bg-gradient-to-br from-orange-50 via-yellow-50 to-white py-8 md:py-10">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Content Side */}
                  <div className="p-6 md:p-8">
                    <div className="inline-flex items-center px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold mb-4">
                      <SparklesIcon className="w-4 h-4 mr-1.5" />
                      Featured Service
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Digital Marketing &
                      <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent"> SEO Services</span>
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      Grow your online presence and reach your target audience effectively. Our data-driven digital marketing strategies combine SEO, paid advertising, and social media to deliver measurable results and maximize ROI.
                    </p>

                    <div className="space-y-2.5">
                      <div className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Search engine optimization (SEO)</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Google Ads & social media campaigns</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Content marketing & email campaigns</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Analytics & performance tracking</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="relative h-full min-h-[320px] md:min-h-0">
                    <Image
                      src="/digital.png"
                      alt="Digital Marketing & SEO"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technologies Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-teal-50 py-8 md:py-10">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Technologies We <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>Use</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-3">
              {service.technologies.map((tech, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2.5 px-4 py-3 bg-white hover:bg-green-50 rounded-lg border border-gray-100 hover:border-green-300 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                    {getTechIcon(tech)}
                  </div>
                  <span className="font-semibold text-gray-700 text-sm group-hover:text-green-600 transition-colors duration-300">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative bg-white py-8 md:py-10">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Key <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>Benefits</span>
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {service.benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center p-3 bg-white hover:bg-green-50 rounded-lg border border-gray-100 hover:border-green-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <CheckCircleIcon className={`w-5 h-5 text-green-500 group-hover:text-green-500 mr-2.5 flex-shrink-0 transition-colors duration-300`} />
                  <span className="text-gray-700 group-hover:text-green-700 font-medium text-sm transition-colors duration-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className={`relative bg-gradient-to-r ${service.gradient} py-8 md:py-10`}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <SparklesIcon className="w-10 h-10 text-white/80 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base text-white/90 mb-6 leading-relaxed">
              Let&apos;s discuss how our {service.name.toLowerCase()} services can help transform your business.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link 
                href="/contact" 
                className="inline-flex items-center px-5 py-2.5 bg-white text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Contact Us</span>
                <ArrowLeftIcon className="w-4 h-4 ml-2 rotate-180" />
              </Link>
              <Link 
                href="/services" 
                className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30"
              >
                <span>View All Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
