'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CopyBlock } from '@/app/components/copy-block';
import { Lightbox } from '@/components/image-lightbox';

interface Screenshot {
  file: string;
  title: string;
  desc: string;
  href: string;
}

const docs = '/docs/next-saas';

const groups: { name: string; tagline: string; shots: Screenshot[] }[] = [
  {
    name: 'Public Site',
    tagline: 'Marketing, pricing & sign up',
    shots: [
      { file: 'landing-hero', title: 'Product landing page', desc: 'A polished public product site ready to rebrand as your own.', href: `${docs}/getting-started/customize-the-product` },
      { file: 'pricing-page', title: 'Pricing', desc: 'Plans, prices and trials rendered from published plan versions.', href: `${docs}/features/plans-pricing-trials` },
      { file: 'signup-page', title: 'Sign up', desc: 'ASP.NET Core Identity registration, sign-in and account management.', href: `${docs}/security/authentication-and-accounts` },
      { file: 'stripe-checkout', title: 'Stripe Checkout', desc: 'Hosted checkout with trials, coupons and promotion codes.', href: `${docs}/features/billing-and-subscriptions` },
    ],
  },
  {
    name: 'Customer App',
    tagline: 'Everything your customers manage',
    shots: [
      { file: 'dashboard-overview', title: 'Organization dashboard', desc: 'Plan, usage, storage and trial status at a glance.', href: `${docs}/getting-started/project-tour` },
      { file: 'documents-manager', title: 'Documents', desc: 'Organization-scoped file storage with quota reservations.', href: `${docs}/features/file-storage` },
      { file: 'usage-analytics', title: 'Usage & quotas', desc: 'Real-time meters, allowances and usage analytics.', href: `${docs}/features/usage-analytics` },
      { file: 'billing-subscription', title: 'Plans & billing', desc: 'Upgrade, change billing period and open the Stripe Customer Portal.', href: `${docs}/features/billing-and-subscriptions` },
      { file: 'team-roles', title: 'Team & roles', desc: 'Invite members with Owner, Admin, Billing and Member roles.', href: `${docs}/features/organizations-and-members` },
      { file: 'api-keys-manager', title: 'API keys', desc: 'Organization-scoped API keys for programmatic access.', href: `${docs}/features/api-keys` },
      { file: 'audit-events', title: 'Audit log', desc: 'Who did what, when, for every sensitive organization change.', href: `${docs}/features/audit-logs` },
      { file: 'lifecycle-settings', title: 'Data lifecycle', desc: 'Data export, ownership transfer and delayed organization deletion.', href: `${docs}/features/data-lifecycle` },
    ],
  },
  {
    name: 'Operations Center',
    tagline: 'Run the business behind the product',
    shots: [
      { file: 'operations-center', title: 'Operations overview', desc: 'Commercial and operational health of the whole platform.', href: `${docs}/features/support-operations` },
      { file: 'customer-360', title: 'Customer 360', desc: 'Subscription, usage, members and exceptions for any customer.', href: `${docs}/features/support-operations` },
      { file: 'plan-editor', title: 'Plan editor', desc: 'Immutable plan versions with features, prices and quotas.', href: `${docs}/features/plans-pricing-trials` },
      { file: 'coupons-manager', title: 'Coupons', desc: 'Create coupons and promotion codes synced to Stripe.', href: `${docs}/features/coupons` },
      { file: 'platform-usage', title: 'Platform usage', desc: 'Usage analytics and quota pressure across all customers.', href: `${docs}/features/usage-analytics` },
      { file: 'operations-queue-failed-work', title: 'Failed work queues', desc: 'Inspect and recover failed webhooks, jobs and integrations.', href: `${docs}/operations/background-jobs-and-recovery` },
      { file: 'configuration-ownership', title: 'Platform settings', desc: 'See which settings are owned by configuration vs the database.', href: `${docs}/operations/configuration` },
    ],
  },
];

const allShots = groups.flatMap((g) => g.shots);
const src = (s: Screenshot) => `/img/next-saas/${s.file}.png`;

export function NextSaasGallery() {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const thumbs = useRef<HTMLDivElement>(null);

  const shot = allShots[index];
  const groupIndex = groups.findIndex((g) => g.shots.includes(shot));
  const prev = useCallback(() => setIndex((i) => (i - 1 + allShots.length) % allShots.length), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % allShots.length), []);
  const close = useCallback(() => setFullscreen(false), []);

  // keep the active thumbnail in view
  useEffect(() => {
    const el = thumbs.current?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    const strip = thumbs.current;
    if (el && strip) strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [index]);

  const arrow = 'absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-slate-950/70 p-2.5 text-white/80 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-slate-950 hover:text-white transition-opacity border border-white/10';

  return (
    <section className="relative w-full bg-slate-900 border-b border-white/10 overflow-hidden">
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-24">
        {/* Heading */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sm font-medium text-cyan-300">
            <span className="rounded-full bg-cyan-400 px-2 py-0.5 text-xs font-bold text-slate-900">NEW</span>
            Production SaaS Template
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Next <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600">SaaS</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Launch your <strong className="text-white">multi-tenant B2B SaaS</strong> on .NET 10, ServiceStack and Next.js 16.
            Teams, Stripe subscriptions, plans, quotas and an Operations Center are built in. Take the tour:
          </p>
        </div>

        {/* Group tabs */}
        <div className="mt-12 flex justify-center">
          <div role="tablist" className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
            {groups.map((g, i) => (
              <button
                key={g.name}
                role="tab"
                aria-selected={i === groupIndex}
                onClick={() => setIndex(allShots.indexOf(g.shots[0]))}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${i === groupIndex ? 'bg-cyan-400 text-slate-900' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
              >
                {g.name}
                <span className={`ml-2 text-xs ${i === groupIndex ? 'text-slate-700' : 'text-slate-500'}`}>{g.shots.length}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-sm text-slate-400">{groups[groupIndex].tagline}</p>

        {/* Stage */}
        <div className="mt-8 group relative">
          <div className="rounded-2xl border border-white/10 bg-slate-950 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
              <span className="size-3 rounded-full bg-red-400/70" />
              <span className="size-3 rounded-full bg-yellow-400/70" />
              <span className="size-3 rounded-full bg-green-400/70" />
              <span className="ml-3 truncate text-xs text-slate-500">{shot.title}</span>
              <span className="ml-auto text-xs text-slate-500 tabular-nums">{index + 1} / {allShots.length}</span>
            </div>
            <button type="button" onClick={() => setFullscreen(true)} aria-label={`View ${shot.title} fullscreen`} className="block w-full cursor-zoom-in bg-slate-100 aspect-[16/9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={shot.file} src={src(shot)} alt={shot.title} className="size-full object-contain" />
            </button>
          </div>
          <button type="button" aria-label="Previous screenshot" onClick={prev} className={`${arrow} left-3`}>
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button type="button" aria-label="Next screenshot" onClick={next} className={`${arrow} right-3`}>
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Caption */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{shot.title}</h3>
            <p className="text-slate-400">{shot.desc}</p>
          </div>
          <Link href={shot.href} className="shrink-0 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
            Read the guide →
          </Link>
        </div>

        {/* Thumbnails */}
        <div ref={thumbs} className="relative mt-6 flex gap-3 overflow-x-auto pb-3 snap-x [scrollbar-width:thin]">
          {allShots.map((s, i) => (
            <button
              key={s.file}
              type="button"
              data-index={i}
              onClick={() => setIndex(i)}
              aria-label={s.title}
              aria-current={i === index}
              className={`shrink-0 snap-start w-36 md:w-44 rounded-lg overflow-hidden border-2 transition-all ${i === index ? 'border-cyan-400 opacity-100' : 'border-transparent opacity-50 hover:opacity-90'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src(s)} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover object-top bg-slate-100" />
            </button>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 flex flex-col lg:flex-row items-center justify-center gap-6">
          <CopyBlock className="w-full lg:w-auto">
            npx create-net next-saas ProjectName
          </CopyBlock>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`${docs}/getting-started/overview`}
              className="inline-flex items-center justify-center px-6 py-3 font-bold text-slate-900 transition-all duration-200 bg-cyan-400 rounded-full hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
            >
              Get Started
            </Link>
            <Link
              href={docs}
              className="inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 border-2 border-slate-600 rounded-full hover:border-cyan-400/50 hover:bg-slate-800 hover:text-cyan-300"
            >
              Read the Docs
            </Link>
            <a
              href="https://github.com/NetCoreTemplates/next-saas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-3 font-medium text-slate-300 hover:text-white"
            >
              GitHub →
            </a>
          </div>
        </div>
      </div>

      {fullscreen && (
        <Lightbox
          image={{ src: src(shot), alt: shot.title, caption: `${shot.title} — ${shot.desc}` }}
          counter={`${index + 1} / ${allShots.length}`}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
