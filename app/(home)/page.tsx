'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { CopyBlock } from '@/app/components/copy-block';
import ComponentGallery from '@/app/components/component-gallery';

export default function HomePage() {
  const [diagramMode, setDiagramMode] = useState<'Production' | 'Development'>('Production');

  return (
    <main className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section - Dark Theme */}
      <section className="relative w-full bg-slate-950 border-b border-white/10 overflow-hidden">

        {/* 1. Full Width Background Effects */}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="h-full w-full" aria-hidden="true">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"></div>

        {/* Spinning React Logo Watermark (Positioned absolutely to the right) */}
        <svg className="absolute -right-20 top-20 h-[600px] w-[600px] text-cyan-500/5 animate-[spin_60s_linear_infinite] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="12" cy="12" r="2"></circle>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"></ellipse>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"></ellipse>
          <ellipse cx="12" cy="12" rx="10" ry="4.5"></ellipse>
        </svg>

        {/* 2. Main Content Container */}
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sm font-medium text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.2)] animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              The Ultimate Vibe Coding Stack
            </div>

            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight pb-2 leading-tight text-white drop-shadow-lg">
              React + .NET
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 animate-gradient-x pb-2">
                Templates
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
              Ultimate .NET 10 React Templates for <span className="text-cyan-400 font-bold">Vibe Coded UIs</span>
              <br className="hidden md:block" />
              running on <span className="text-sky-400 font-bold">robust and scalable .NET backends</span>.
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <Link
                href="/docs"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 transition-all duration-200 bg-cyan-400 rounded-full hover:bg-cyan-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
              >
                Start Building
                <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </Link>
              <Link
                href="/docs/templates/react-static"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-transparent border-2 border-slate-600 hover:border-cyan-400/50 rounded-full hover:bg-slate-800 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 shadow-sm"
              >
                Explore Templates
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Feature Grid / Footer (Full Width Strip) */}
        <div className="relative border-t border-white/5 bg-white/[0.02] backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-y-8 py-10 sm:grid-cols-3 sm:gap-x-8 lg:gap-x-12">

              {/* Feature 1 */}
              <div className="relative pl-14">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-cyan-400 font-mono text-xs font-bold">01</span>
                  </div>
                  AI Ready
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-400">
                  Start from well-known React templates tuned for rich, data-driven and AI-generated user interfaces.
                </dd>
              </div>

              {/* Feature 2 */}
              <div className="relative pl-14">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-cyan-400 font-mono text-xs font-bold">02</span>
                  </div>
                  End-to-end Type Safety
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-400">
                  From C# DTOs in .NET to TypeScript DTOs in React for confident refactors without context switching.
                </dd>
              </div>

              {/* Feature 3 */}
              <div className="relative pl-14">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-cyan-400 font-mono text-xs font-bold">03</span>
                  </div>
                  Zero-Ambiguity APIs
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-400">
                  Consistent API integrations eliminates guesswork, giving AI the perfect context to generate accurate implementations.
                </dd>
              </div>

            </dl>
          </div>
        </div>

      </section>

      {/* Body Content - Light/Default Theme */}
      <div className="flex-1 w-full bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-4 py-24 space-y-24">

          {/* Architecture Benefits */}
          <div className="grid md:grid-cols-2 gap-12 text-left items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                The Best of Both Worlds
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                .NET React Templates unite <strong>React, Tailwind CSS & TypeScript</strong> with ServiceStack's powerful .NET backend—creating the ultimate
                environment for building sophisticated UIs at lightning speed. Experience true full-stack type safety with APIs that flow
                seamlessly from C# to TypeScript.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  { label: "Perfect Fusion", desc: "Seamless blend of React UIs with Razor Pages & .NET APIs" },
                  { label: "Type-Safe End-to-End", desc: "Shared DTOs between C# and TypeScript." },
                  { label: "AI-Friendly", desc: "Optimal React UIs, Zero ambiguity APIs. Maximum AI accuracy." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <strong className="text-foreground block">{item.label}</strong>
                      <span className="text-muted-foreground">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative group perspective-1000">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 p-8 text-center transform transition-transform duration-500 hover:rotate-y-12 hover:rotate-x-12">
                <div className="flex items-center justify-center gap-8 mb-6">
                  <div className="w-20 h-20 rounded-full bg-[#282c34] flex items-center justify-center shadow-lg ring-1 ring-white/10">
                    <span className="text-[#61DAFB] font-bold text-xl">React</span>
                  </div>
                  <div className="w-1 h-12 bg-slate-700 rounded-full" />
                  <div className="size-18 rounded-2xl bg-[#512BD4] flex items-center justify-center shadow-lg ring-1 ring-white/10">
                    <span className="px-4 text-white font-bold text-2xl">.NET</span>
                  </div>
                </div>
                <p className="text-2xl font-mono font-bold text-white">Seamlessly Integrated</p>
                <p className="text-sm text-slate-400 mt-2">Hot Reload • Typed APIs • AutoQuery</p>
              </div>
            </div>
          </div>

          {/* Template Showcase */}
          <div className="space-y-32">
            <TemplateSection
              title="Next.js RSC"
              description="The cutting edge of React. Leverage the full uncompromising power of Next.js React Server Components to access .NET APIs directly on the server, reducing bundle size and improving performance."
              href="/docs/templates/next-rsc"
              screenshot="https://github.com/ServiceStack/docs.servicestack.net/blob/main/MyApp/wwwroot/img/pages/react/next-rsc.webp?raw=true"
              diagram="https://github.com/ServiceStack/docs.servicestack.net/blob/main/MyApp/wwwroot/img/pages/react/info/next-rsc-prod.svg?raw=true"
              features={[
                "Server Components",
                "Hybrid Rendering",
                "Unified Proxy Architecture"
              ]}
              command="npx create-net next-rsc ProjectName"
              githubTemplate="https://github.com/new?template_name=nextjs&template_owner=NetCoreTemplates"
              diagramMode={diagramMode}
              setDiagramMode={setDiagramMode}
            />

            <TemplateSection
              title="Next.js Static"
              description="The ultimate solution for public-facing websites. Combines the SEO and performance of Static Site Generation (SSG) with a dynamic .NET API. Ideal for marketing sites, landing pages, blogs, and content-focused sites that benefit from SEO."
              href="/docs/templates/next-static"
              screenshot="https://github.com/ServiceStack/docs.servicestack.net/blob/main/MyApp/wwwroot/img/pages/react/next-static.webp?raw=true"
              diagram="https://github.com/ServiceStack/docs.servicestack.net/blob/main/MyApp/wwwroot/img/pages/react/info/next-static-prod.svg?raw=true"
              features={[
                "Static Export to /dist",
                "Served by ASP.NET Core Kestrel",
                "Zero Node.js in Production"
              ]}
              command="npx create-net next-static ProjectName"
              githubTemplate="https://github.com/new?template_name=nextjs-static&template_owner=NetCoreTemplates"
              reversed
              diagramMode={diagramMode}
              setDiagramMode={setDiagramMode}
            />

            <TemplateSection
              title="React Static"
              description="Minimal foundation for a classic Single Page Application (SPA) statically generated by Vite. Perfect for dashboards, internal tools, admin panels, and highly interactive apps where SEO isn't a priority."
              href="/docs/templates/react-static"
              screenshot="https://github.com/ServiceStack/docs.servicestack.net/blob/main/MyApp/wwwroot/img/pages/react/react-static.webp?raw=true"
              diagram="https://github.com/ServiceStack/docs.servicestack.net/blob/main/MyApp/wwwroot/img/pages/react/info/react-static-prod.svg?raw=true"
              features={[
                "Client-side Routing",
                "Lightning Fast Vite Dev Server",
                "Simple Deployment"
              ]}
              command="npx create-net react-static ProjectName"
              githubTemplate="https://github.com/new?template_name=react-static&template_owner=NetCoreTemplates"
              diagramMode={diagramMode}
              setDiagramMode={setDiagramMode}
            />
          </div>

        </div>
      </div>

      {/* Full Featured Templates Divider - Full Width Dark Section */}
      <section className="relative w-full bg-slate-950 border-y border-white/10 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="h-full w-full" aria-hidden="true">
            <defs>
              <pattern id="featured-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#featured-grid)" />
          </svg>
        </div>

        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-blue-600/20 blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sm font-medium text-cyan-300 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Reference Implementations
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Full Featured Templates
          </h2>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Full-featured .NET React Templates providing a good reference implementation for integrating several React features
            including <strong className="text-white">Blog</strong>, <strong className="text-white">MDX</strong>, <strong className="text-white">Todos</strong> and <strong className="text-white">shadcn/ui</strong> components alongside .NET features
            like <strong className="text-white">API Keys</strong>, <strong className="text-white">AI Chat</strong> &amp; <strong className="text-white">Swagger UI</strong>.
          </p>
        </div>
      </section>

      {/* Full Featured Templates Content */}
      <div className="flex-1 w-full bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-4 py-24 space-y-24">
          {/* Full Featured Template Showcase */}
          <div className="space-y-32">
            <TemplateSection
              title="Next.js"
              description="A comprehensive Next.js template showcasing the full power of integrating React with .NET. Features a complete Blog with MDX, Todos implementation, shadcn/ui components, API Keys management, AI Chat integration, and Swagger UI for API exploration."
              href="/docs/templates/nextjs"
              screenshot="https://github.com/ServiceStack/docs.servicestack.net/blob/main/MyApp/wwwroot/img/pages/react/nextjs.webp?raw=true"
              diagram="https://github.com/ServiceStack/docs.servicestack.net/blob/main/MyApp/wwwroot/img/pages/react/info/next-rsc-prod.svg?raw=true"
              features={[
                "Blog with MDX Support",
                "shadcn/ui Components",
                "API Keys & AI Chat",
                "OpenApi & Scalar UI",
              ]}
              command="npx create-net nextjs ProjectName"
              diagramMode={diagramMode}
              setDiagramMode={setDiagramMode}
            />

            <TemplateSection
              title="React SPA"
              description="A feature-rich React Single Page Application powered by Vite. Includes Blog functionality, Todos, shadcn/ui components, API Keys management, AI Chat capabilities, and Swagger UI - all integrated with a robust .NET backend."
              href="/docs/templates/react-spa"
              screenshot="https://github.com/ServiceStack/docs.servicestack.net/blob/main/MyApp/wwwroot/img/pages/react/react-spa.webp?raw=true"
              diagram="https://github.com/ServiceStack/docs.servicestack.net/blob/main/MyApp/wwwroot/img/pages/react/info/react-static-prod.svg?raw=true"
              features={[
                "Blog with MDX Support",
                "shadcn/ui Components",
                "API Keys & AI Chat",
                "OpenApi & Swagger UI",
              ]}
              command="npx create-net react-spa ProjectName"
              reversed
              diagramMode={diagramMode}
              setDiagramMode={setDiagramMode}
            />
          </div>

        </div>
      </div>

      {/* React Component Gallery Divider - Full Width Dark Section */}
      <section className="relative w-full bg-slate-950 border-y border-white/10 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="h-full w-full" aria-hidden="true">
            <defs>
              <pattern id="gallery-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gallery-grid)" />
          </svg>
        </div>

        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-blue-600/20 blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sm font-medium text-cyan-300 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            @servicestack/react
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            React Component Gallery
          </h2>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            @servicestack/react bridges the gap between your backend and frontend, delivering 
            production-grade React applications with minimal code and maximum capability. 
            With API-enabled validation bound forms you can focus on building features, not wiring forms.
          </p>
        </div>
      </section>

      <div className="flex-1 w-full bg-background text-foreground">
        <div className="max-w-6xl mx-auto px-4 space-y-24">

          <ReactComponentGallery />

          <PricingCallout />
        </div>
      </div>

    </main>
  );
}

function ReactComponentGallery() {
  return (
      <div className="mt-8 prose dark:prose-invert max-w-none">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-12">
          <Link href="https://react.servicestack.net/gallery/autoquerygrid" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">AutoQueryGrid</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Powerful data grid with built-in querying, filtering, and sorting capabilities.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/datagrid" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">DataGrid</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Flexible data grid component for displaying collections with custom rendering.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/autoform" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Auto Forms</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Automatically generated forms from your ServiceStack DTOs with validation.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/form-inputs" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Form Inputs</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Rich collection of form input components with built-in validation and styling.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/alerts" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Alerts</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Alert and notification components for displaying messages to users.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/modals" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Modals</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Modal dialogs and slide-over panels for focused user interactions.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/navigation" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Navigation</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Navigation components including Tabs, Breadcrumbs, NavList, and Buttons.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/formats" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Formats</h3>
            <p className="text-gray-600 dark:text-gray-400">
              PreviewFormat component for rendering data in different formats like currency, bytes, icons, and links.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/fileinput" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">FileInput</h3>
            <p className="text-gray-600 dark:text-gray-400">
              File upload component with support for single and multiple files, drag & drop, and managed uploads.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/taginput" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">TagInput</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tag input component for managing multiple values with autocomplete and validation.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/combobox" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Combobox</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Searchable dropdown component with support for objects, key-value pairs, and custom rendering.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/autocomplete" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Autocomplete</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Autocomplete input with single/multiple selection and custom item rendering.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/custom-autoforms" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Custom Auto Forms</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn how to create custom AutoQuery implementations for complex scenarios.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/markdown" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Markdown Editor</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Rich markdown editor with toolbar, keyboard shortcuts, and GitHub Flavored Markdown support.
            </p>
          </Link>

          <Link href="https://react.servicestack.net/gallery/custom-inputs" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Custom Inputs</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create custom input components that integrate seamlessly with AutoForm.
            </p>
          </Link>
        </div>
      </div>
  )
}

function PricingCallout() {
  return (
    <div className="relative max-w-4xl mx-auto mt-60 mb-32 rounded-3xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="h-full w-full" aria-hidden="true">
          <defs>
            <pattern id="pricing-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pricing-grid)" />
        </svg>
      </div>

      <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-blue-600/20 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 p-10 text-center">
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
          Simple, Transparent Pricing
        </h3>

        <div className="py-12">
          <Link
            href="https://servicestack.net/pricing"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-slate-900 transition-all duration-200 bg-cyan-400 rounded-full hover:bg-cyan-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
          >
            View Perpetual Pricing
            <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center max-w-3xl mx-auto">
          <Link href="https://servicestack.net/free" className="group flex-1 space-y-2 p-4 rounded-xl hover:bg-white/5 transition-colors">
            <div className="text-xl font-medium text-slate-400 group-hover:text-cyan-400 transition-colors">Individuals & OSS</div>
            <div className="text-4xl font-bold text-white tracking-tight">Free</div>
            <p className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors">Forever free for personal & open source</p>
          </Link>

          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-slate-700 to-transparent" />

          <Link href="https://servicestack.net/trial" className="group flex-1 space-y-2 p-4 rounded-xl hover:bg-white/5 transition-colors">
            <div className="text-xl font-medium text-slate-400 group-hover:text-cyan-400 transition-colors">Commercial</div>
            <div className="text-4xl font-bold text-white tracking-tight">30 Day</div>
            <p className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors">Risk-free trial for businesses</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

function TemplateSection({ title, description, href, screenshot, diagram, features, command, githubTemplate, reversed = false, diagramMode, setDiagramMode }: any) {
  const currentDiagram = diagram.replace('-prod.svg', diagramMode === 'Production' ? '-prod.svg' : '-dev.svg');

  return (
    <div className={`flex flex-col gap-16 ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
      <div className="flex-1 space-y-8 text-left">
        <Link href={href} className="group inline-block">
          <h3 className="text-4xl font-bold group-hover:text-primary transition-colors flex items-center gap-3">
            {title}
            <svg className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </h3>
        </Link>
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>

        <div className="bg-[#f9f9fb] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              Architecture
            </h4>
            <div className="flex bg-muted rounded-lg p-0.5 border border-border/50">
              <button
                onClick={() => setDiagramMode('Development')}
                className={`px-3 py-1 text-[10px] font-medium rounded-md transition-all ${diagramMode === 'Development' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Development
              </button>
              <button
                onClick={() => setDiagramMode('Production')}
                className={`px-3 py-1 text-[10px] font-medium rounded-md transition-all ${diagramMode === 'Production' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Production
              </button>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentDiagram} alt={`${title} Architecture`} className="w-full h-auto rounded dark:invert opacity-90 hover:opacity-100 transition-opacity" />
        </div>

        <ul className="space-y-3">
          {features.map((feature: string, i: number) => (
            <li key={i} className="flex items-center gap-3 text-base font-medium text-foreground/80">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="pt-4">
          <Link
            href={href}
            className="inline-flex items-center text-primary font-bold hover:underline decoration-2 underline-offset-4"
          >
            Read Documentation
          </Link>
        </div>
      </div>

      <div className="flex-1 w-full space-y-6">
        {command && (
          <CopyBlock className="w-full">
            {command}
          </CopyBlock>
        )}
        <Link href={href} className="block relative rounded-2xl overflow-hidden shadow-2xl border-4 border-muted/20 bg-muted group hover:border-primary/30 transition-colors duration-300">
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screenshot}
            alt={`${title} Screenshot`}
            className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
          />
        </Link>
        {githubTemplate && (
          <div className="mt-4 p-4 bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gray-900 dark:text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Jumpstart with Copilot</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Instantly scaffold a new App with this template using GitHub Copilot</p>
                <a
                  href={githubTemplate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#24292f] hover:bg-[#1b1f23] dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium rounded-md transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Create from Template
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
