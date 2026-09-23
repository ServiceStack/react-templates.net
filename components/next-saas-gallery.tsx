'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Building2, ChartColumn, CreditCard, Gauge, Headset, ScrollText, type LucideIcon } from 'lucide-react';
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

const highlights: { icon: LucideIcon; label: string }[] = [
  { icon: Building2, label: 'Multi-tenant orgs' },
  { icon: CreditCard, label: 'Stripe subscriptions' },
  { icon: Gauge, label: 'Plans & quotas' },
  { icon: ChartColumn, label: 'Usage metering' },
  { icon: ScrollText, label: 'Audit logs' },
  { icon: Headset, label: 'Operations Center' },
];

const autoplayMs = 5000;

const allShots = groups.flatMap((g) => g.shots);
const src = (s: Screenshot) => `/img/next-saas/${s.file}.png`;

export function NextSaasGallery() {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const thumbs = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  const shot = allShots[index];
  const groupIndex = groups.findIndex((g) => g.shots.includes(shot));
  const prev = useCallback(() => { setAutoplay(false); setIndex((i) => (i - 1 + allShots.length) % allShots.length); }, []);
  const next = useCallback(() => { setAutoplay(false); setIndex((i) => (i + 1) % allShots.length); }, []);
  const go = (i: number) => { setAutoplay(false); setIndex(i); };
  const close = useCallback(() => setFullscreen(false), []);
  const playing = autoplay && inView && !hovering && !fullscreen;

  // auto-advance the tour (driven by the progress bar) while visible, until the user takes over
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAutoplay(false);
    const el = stage.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // keep the active thumbnail in view
  useEffect(() => {
    const el = thumbs.current?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    const strip = thumbs.current;
    if (el && strip) strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [index]);

  const arrow = 'absolute top-1/2 -translate-y-1/2 z-10 rounded-full border border-slate-200 bg-white/95 p-2.5 text-slate-700 shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-sky-600 hover:border-sky-300 transition-opacity';

  return (
    <section className="relative w-full overflow-hidden border-b border-slate-200 bg-gradient-to-b from-sky-50 via-white to-white">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
        style={{ backgroundImage: 'linear-gradient(to right, rgb(148 163 184 / 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.18) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[48rem] max-w-full rounded-full bg-sky-200/50 blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-24">
        {/* Heading */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-1.5 py-1 pr-4 text-sm font-medium text-sky-700 shadow-sm">
            <span className="rounded-full bg-sky-600 px-2 py-0.5 text-xs font-bold text-white">NEW</span>
            Production SaaS Template
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
            Next <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600">SaaS</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Launch your <strong className="text-slate-900">multi-tenant B2B SaaS</strong> on .NET 10, ServiceStack and Next.js 16.
            Teams, Stripe subscriptions, plans, quotas and an Operations Center are built in. Take the tour:
          </p>
          <ul className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {highlights.map((h) => (
              <li key={h.label} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
                <h.icon className="size-4 text-sky-600" />
                {h.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Group tabs */}
        <div className="mt-12 flex justify-center">
          <div role="tablist" className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            {groups.map((g, i) => (
              <button
                key={g.name}
                role="tab"
                aria-selected={i === groupIndex}
                onClick={() => go(allShots.indexOf(g.shots[0]))}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${i === groupIndex
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
              >
                {g.name}
                <span className={`ml-2 text-xs ${i === groupIndex ? 'text-sky-100' : 'text-slate-400'}`}>{g.shots.length}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-sm text-slate-500">{groups[groupIndex].tagline}</p>

        {/* Stage */}
        <div ref={stage} className="mt-8 group relative" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-sky-300/50 via-blue-300/30 to-indigo-300/50 blur-3xl pointer-events-none"></div>
          <div className="relative rounded-2xl bg-gradient-to-br from-sky-300 via-slate-200 to-indigo-300 p-px shadow-2xl shadow-slate-400/40">
          <div className="relative rounded-[15px] bg-white overflow-hidden">
            <div className="relative flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-yellow-400" />
              <span className="size-3 rounded-full bg-green-400" />
              <span className="ml-3 truncate text-xs font-medium text-slate-500">{shot.title}</span>
              <span className="ml-auto text-xs text-slate-400 tabular-nums">{index + 1} / {allShots.length}</span>
              <button
                type="button"
                onClick={() => setAutoplay((a) => !a)}
                aria-label={autoplay ? 'Pause tour' : 'Play tour'}
                className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
              >
                {autoplay
                  ? <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h3v14H7zM14 5h3v14h-3z" /></svg>
                  : <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
              </button>
              {/* autoplay progress */}
              {autoplay && (
                <span
                  key={index}
                  className={`absolute inset-x-0 -bottom-px h-0.5 origin-left bg-gradient-to-r from-sky-500 to-indigo-500 animate-gallery-progress ${playing ? '' : '[animation-play-state:paused]'}`}
                  style={{ animationDuration: `${autoplayMs}ms` }}
                  onAnimationEnd={() => setIndex((i) => (i + 1) % allShots.length)}
                />
              )}
            </div>
            <button type="button" onClick={() => setFullscreen(true)} aria-label={`View ${shot.title} fullscreen`} className="block w-full cursor-zoom-in bg-white aspect-[16/9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={shot.file} src={src(shot)} alt={shot.title} className="size-full object-contain" />
            </button>
          </div>
          </div>
          <button type="button" aria-label="Previous screenshot" onClick={prev} className={`${arrow} left-3`}>
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button type="button" aria-label="Next screenshot" onClick={next} className={`${arrow} right-3`}>
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Caption */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">{shot.title}</h3>
            <p className="text-slate-600">{shot.desc}</p>
          </div>
          <Link href={shot.href} className="shrink-0 text-sm font-semibold text-sky-600 hover:text-sky-700">
            Read the guide →
          </Link>
        </div>

        {/* Thumbnails */}
        <div ref={thumbs} className="relative mt-6 flex gap-3 overflow-x-auto px-1 pt-1 pb-3 snap-x [scrollbar-width:thin]">
          {allShots.map((s, i) => (
            <button
              key={s.file}
              type="button"
              data-index={i}
              onClick={() => go(i)}
              aria-label={s.title}
              aria-current={i === index}
              className={`shrink-0 snap-start w-36 md:w-44 rounded-lg overflow-hidden border bg-white transition-all ${i === index
                ? 'border-sky-500 ring-2 ring-sky-500/30 shadow-md'
                : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300 hover:shadow-sm'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src(s)} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover object-top" />
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
              className="inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-sky-600 rounded-full shadow-sm hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-500/30"
            >
              Get Started
            </Link>
            <Link
              href={docs}
              className="inline-flex items-center justify-center px-6 py-3 font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-300 rounded-full shadow-sm hover:border-sky-400 hover:text-sky-700"
            >
              Read the Docs
            </Link>
            <a
              href="https://github.com/NetCoreTemplates/next-saas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-3 font-medium text-slate-600 hover:text-slate-900"
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
