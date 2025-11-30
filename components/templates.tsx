'use client';
import { cn } from 'fumadocs-ui/utils/cn';
import React, { useState, useMemo } from 'react';

export interface Template {
  repo: string;
  name: string;
  icon: string;
  tags: string[];
  demo: string;
  mix: string[];
}

export function template(
  repo: string,
  name: string,
  icon: string,
  tags?: string[],
  demo?: string,
  mix?: string[]
): Template {
  return {
    repo,
    name,
    icon,
    tags: tags ?? [],
    demo: demo ?? `${repo}.react-templates.net`,
    mix: mix ?? [],
  };
}

const Icons: Record<string, string> = {
  Razor: '<svg class="w-12 h-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M23.844 27.692a16.332 16.332 0 0 1-6.645 1.3q-6.364 0-10.013-3.243a11.3 11.3 0 0 1-3.649-8.9a13.716 13.716 0 0 1 3.785-9.898A12.716 12.716 0 0 1 16.9 3.008a11.676 11.676 0 0 1 8.425 3.006a9.994 9.994 0 0 1 3.142 7.533a10.187 10.187 0 0 1-2.318 7.114a7.532 7.532 0 0 1-5.817 2.547a2.613 2.613 0 0 1-1.845-.642a2.323 2.323 0 0 1-.764-1.6a4.9 4.9 0 0 1-4.148 2.243a4.6 4.6 0 0 1-3.507-1.479a5.706 5.706 0 0 1-1.384-4.063a9.913 9.913 0 0 1 2.2-6.357q2.2-2.763 4.8-2.763a5.063 5.063 0 0 1 4.256 1.716l.311-1.338h2.405l-2.081 9.08a10.716 10.716 0 0 0-.352 2.243q0 .972.744.972a4.819 4.819 0 0 0 3.877-2.047a8.93 8.93 0 0 0 1.621-5.681a7.98 7.98 0 0 0-2.675-6.175a9.887 9.887 0 0 0-6.919-2.432a10.6 10.6 0 0 0-8.158 3.467a12.066 12.066 0 0 0-3.2 8.495a9.561 9.561 0 0 0 3.06 7.573q3.06 2.7 8.586 2.7a13.757 13.757 0 0 0 5.675-1.054ZM19.466 12.25a3.977 3.977 0 0 0-3.6-1.716q-1.824 0-3.263 2.23a8.726 8.726 0 0 0-1.439 4.824q0 3.635 2.905 3.635a3.771 3.771 0 0 0 2.651-1.183a6.309 6.309 0 0 0 1.7-3.2Z"></path></svg>',
  Nextjs: '<svg class="w-12 h-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M0 7.5a7.5 7.5 0 1 1 11.697 6.216L4.907 4.21A.5.5 0 0 0 4 4.5V12h1V6.06l5.83 8.162A7.5 7.5 0 0 1 0 7.5ZM10 10V4h1v6h-1Z" clip-rule="evenodd"></path></svg>',
  NextjsNative: '<svg class="w-12 h-12 bg-white text-gray-900 rounded-full" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M386.399 35.508C217.06-64.061 1.885 57.55.012 253.882c-1.828 191.716 201.063 315.545 370.02 231.163L185.56 213.636v167.997c0 18.614-35.619 18.614-35.619 0V156.421c0-14.776 27.448-15.989 35.226-3.145L395.43 470.572c157.95-101.737 155.817-338.136-9.031-435.064zm-23.756 317.939L326.91 298.87V149.458c0-13.932 35.732-13.932 35.732 0v203.989z"></path></svg>',
  React: '<svg class="w-12 h-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10.11c1.03 0 1.87.84 1.87 1.89c0 1-.84 1.85-1.87 1.85c-1.03 0-1.87-.85-1.87-1.85c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7c-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86c.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5l-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47c.54.03 1.11.03 1.71.03c.6 0 1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7c.52.59 1.03 1.23 1.51 1.9c.82.08 1.63.2 2.4.36c.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86c-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63c2.54.75 4.37 1.99 4.37 3.68c0 1.69-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63c-1.46.84-3.45-.12-5.37-1.95c-1.92 1.83-3.91 2.79-5.38 1.95c-1.46-.84-1.62-3.05-1-5.63c-2.54-.75-4.37-1.99-4.37-3.68c0-1.69 1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63c1.47-.84 3.46.12 5.38 1.95c1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26c2.1-.63 3.28-1.53 3.28-2.26c0-.73-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26c-2.1.63-3.28 1.53-3.28 2.26c0 .73 1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16c-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7c.64-.35.83-1.82.32-3.96c-.77.16-1.58.28-2.4.36c-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16c.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9Z"></path></svg>',
  ReactNative: '<svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="-10.5 -9.45 21 18.9" fill="none"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>',
};

export const Index: Record<string, Template> = [
  template('nextjs', 'Next.js', 'Nextjs', ['next.js', 'featured']),
  template('next-static', 'Next.js Static', 'NextjsNative', ['next.js', 'static']),
  template('next-rsc', 'Next.js RSC', 'NextjsNative', ['next.js', 'rsc']),
  template('react-static', 'React Static', 'ReactNative', ['vite', 'static']),
  template('react-spa', 'React SPA', 'React', ['vite', 'featured']),
].reduce((acc, template) => {
  acc[template.repo] = template;
  return acc;
}, {} as Record<string, Template>);

interface TemplateSelectorProps {
  templates: Template[];
  hide?: string;
  className?: string;
}

function appendQueryString(url: string, params: Record<string, string>): string {
  const urlObj = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.append(key, value);
  });
  return urlObj.toString();
}

export default function TemplateSelector({ templates, hide, className }: TemplateSelectorProps) {
  const [project, setProject] = useState('MyApp');

  const projectZip = useMemo(() => (project || 'MyApp') + '.zip', [project]);

  const zipUrl = (templateRepo: string, mix?: string[]) =>
    appendQueryString(
      `https://account.servicestack.net/archive/${templateRepo}?Name=${project || 'MyApp'}`,
      mix?.length ? { mix: mix.join(',') } : {}
    );

  const isAlphaNumeric = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const c = e.key.charCodeAt(0);
    if (
      (c >= 65 && c <= 90) ||
      (c >= 97 && c <= 122) ||
      (c >= 48 && c <= 57) ||
      c === 95
    ) {
      return;
    }
    e.preventDefault();
  };

  const svgIcon = (icon: string) => Icons[icon] ?? Icons.ServiceStack;

  const gridColsClass =
    templates.length === 1
      ? 'grid-cols-1'
      : templates.length === 2
      ? 'grid-cols-1 sm:grid-cols-2 max-w-md mx-auto'
      : 'grid-cols-1 sm:grid-cols-3';

  return (
    <div className={cn('not-prose', className)}>
      <section className="w-full flex flex-col justify-center text-center">
        <div id="empty" className="mt-4 mb-2">
          <div className="flex justify-center mb-8">
            <div className="w-70">
              <input
                value={project}
                onChange={(e) => setProject(e.target.value)}
                onKeyPress={isAlphaNumeric}
                type="text"
                placeholder="Project Name"
                autoCorrect="off"
                spellCheck="false"
                className="mt-1 text-lg block w-full px-3 py-2 bg-white dark:bg-black border border-slate-300 dark:border-slate-700 rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>
      </section>
      <section className={`w-full flex grid gap-4 text-center ${gridColsClass}`}>
        {templates.map((template) => (
          <div key={template.repo} className="mb-2">
            <div className="flex justify-center text-center">
              <a
                className="archive-url hover:no-underline"
                href={zipUrl('NetCoreTemplates/' + template.repo, template.mix)}
              >
                <div
                  className="bg-white dark:bg-gray-800 px-4 py-4 mr-4 mb-4 rounded-lg shadow-lg text-center items-center justify-center hover:shadow-2xl dark:border-2 dark:border-pink-600 dark:hover:border-blue-600"
                  style={{ minWidth: '150px' }}
                >
                  <div className="text-center font-extrabold flex items-center justify-center mb-2">
                    <div
                      className="text-4xl text-blue-400 my-3"
                      dangerouslySetInnerHTML={{ __html: svgIcon(template.icon) }}
                    />
                  </div>
                  <div className="text-xl font-medium text-gray-700">{template.name}</div>
                  <div className="flex justify-center h-8">
                    {template.tags.map((tag) => (
                      <div key={tag} className="mr-1">
                        <span className="px-2 h-8 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-500 dark:text-blue-400 text-sm">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="archive-name px-4 pb-2 text-blue-600 dark:text-indigo-400">
                    {projectZip}
                  </span>
                  <div className="count mt-1 text-gray-400 text-sm"></div>
                </div>
              </a>
            </div>
            {template.demo && hide !== 'demo' && (
              <a href={'https://' + template.demo}>{template.demo}</a>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}