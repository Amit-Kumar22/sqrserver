import { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  stats?: string[];
  cta?: ReactNode;
}

export default function PageHeader({ eyebrow, title, description, stats, cta }: PageHeaderProps) {
  return (
    <section className="relative bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
              {eyebrow}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {title}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            {description}
          </p>

          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-x-8 gap-y-2 mt-7 pt-6 border-t border-gray-100">
              {stats.map((stat) => (
                <div key={stat} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                  {stat}
                </div>
              ))}
            </div>
          )}

          {cta && <div className="flex flex-wrap gap-3 mt-7">{cta}</div>}
        </div>
      </div>
    </section>
  );
}
