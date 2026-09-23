'use client';

import Link from 'next/link';
import { useCallback, useState, type ReactNode } from 'react';
import {
  Check, CreditCard, Download, FileText, KeyRound, LayoutDashboard, Maximize2, Package, Plug,
  Receipt, Rocket, Search, ShieldCheck, Tags, TriangleAlert, UserRound, Webhook, WifiOff, type LucideIcon,
} from 'lucide-react';
import { CopyBlock } from '@/app/components/copy-block';
import { Lightbox } from '@/components/image-lightbox';

const docs = '/docs/next-license';

/* ---------- Purchase → unlock flow ---------- */

const steps: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: CreditCard, title: 'Purchase', desc: 'Customer picks an offer and pays with Stripe Checkout' },
  { icon: Webhook, title: 'Fulfill', desc: 'Webhook confirms payment and signs an ES256 JWT' },
  { icon: UserRound, title: 'Deliver', desc: 'Customer copies the key from My licenses' },
  { icon: WifiOff, title: 'Unlock', desc: 'Your app verifies it offline and enables Pro' },
];

/* ---------- Build coverage demo ---------- */

const builds = [
  { version: '1.0', date: '2026-03-02' },
  { version: '1.4', date: '2026-09-21' },
  { version: '2.0', date: '2027-01-14' },
  { version: '2.3', date: '2027-03-10' },
  { version: '3.0', date: '2027-08-05' },
  { version: '3.2', date: '2028-01-19' },
];
const updatesThrough = '2027-03-21';
const cutoffAfter = builds.filter((b) => b.date <= updatesThrough).length - 1;
// cutoff sits halfway between the last covered and first uncovered build
const cutoffAt = (cutoffAfter + 0.5) / (builds.length - 1);

// illustrative token segments: header and payload are real base64url of the claims shown
const jwt = {
  header: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9',
  payload: 'eyJpc3MiOiJhY21lLXN0dWRpbyIsImF1ZCI6ImFjbWUtc3R1ZGlvIiwic3ViIjoiMTNhMjU4MTktM2VkOS00NDFmLThiY2QtNmE5NGVlNTZkYzAwIiwibmFtZSI6IkFsZXggTW9yZ2FuIiwib3JnYW5pemF0aW9uIjoiTm9ydGhzdGFyIFN0dWRpbyIsInNlYXRzIjozLCJlZGl0aW9uIjoiUHJvIn0',
  signature: 'q7Vd2kGm1xR0cN8wZpE4sYtB6aHfLj3uKo9WnXi5MvQe0rTyDcUgPb2Sl7AaFzOk1hJw4NmVxC8sRe6iYtLq3g',
};

/* ---------- Screenshots ---------- */

interface Screen {
  file: string;
  title: string;
  path: string;
  desc: string;
  href: string;
  icon: LucideIcon;
}

const groups: { name: string; screens: Screen[] }[] = [
  {
    name: 'Storefront & Account',
    screens: [
      { file: 'pricing', title: 'Pricing', path: '/pricing', icon: Tags, desc: 'Free, dated and Lifetime offers sold as one-time Stripe Checkout purchases.', href: `${docs}/getting-started/connect-stripe-sandbox` },
      { file: 'downloads', title: 'Downloads', path: '/download', icon: Download, desc: 'Published GitHub releases become platform download buttons, with a cached fallback.', href: `${docs}/features/releases-and-downloads` },
      { file: 'customer-licenses', title: 'My licenses', path: '/account', icon: KeyRound, desc: 'Copy or download the signed key, see update coverage, renew or upgrade to Lifetime.', href: `${docs}/features/customer-licenses` },
      { file: 'account-settings', title: 'Account settings', path: '/account', icon: UserRound, desc: 'Transfer licenses to another verified account and choose lifecycle emails.', href: `${docs}/features/transfers-and-preferences` },
    ],
  },
  {
    name: 'Operations Center',
    screens: [
      { file: 'operations-center', title: 'Overview', path: '/admin', icon: LayoutDashboard, desc: 'Active licenses, orders needing review, pending payments and a launch checklist.', href: `${docs}/features/operations-center` },
      { file: 'products-pricing', title: 'Products & pricing', path: '/admin/catalog', icon: Package, desc: 'Save prices, create the matching Stripe prices and approve offerings.', href: `${docs}/getting-started/connect-stripe-sandbox` },
      { file: 'releases', title: 'Releases', path: '/admin/releases', icon: Rocket, desc: 'Published GitHub releases with their notes and installer assets.', href: `${docs}/features/releases-and-downloads` },
      { file: 'licenses', title: 'Licenses', path: '/admin/licenses', icon: KeyRound, desc: 'Search, extend coverage, grant Lifetime updates or reissue any license.', href: `${docs}/features/operations-center` },
      { file: 'customer-lookup', title: 'Issue a license', path: '/admin/licenses', icon: Search, desc: 'Search registered customers and issue complimentary or replacement licenses.', href: `${docs}/features/operations-center` },
      { file: 'orders', title: 'Orders', path: '/admin/orders', icon: Receipt, desc: 'Search orders, open Stripe payments and review refunds and disputes.', href: `${docs}/features/operations-center` },
      { file: 'license-terms', title: 'License terms', path: '/admin/agreements', icon: FileText, desc: 'Publish license agreement versions with a live Markdown preview.', href: `${docs}/getting-started/connect-stripe-sandbox` },
      { file: 'integrations', title: 'Integrations', path: '/admin/settings', icon: Plug, desc: 'Stripe, webhook, signing key and GitHub configuration status at a glance.', href: `${docs}/operations/configuration` },
    ],
  },
];

const allScreens = groups.flatMap((g) => g.screens);
const src = (s: Screen) => `/img/next-license/${s.file}.png`;

export function NextLicenseShowcase() {
  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#07120c] text-white">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{ backgroundImage: 'radial-gradient(circle, rgb(190 242 100 / 0.18) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[28rem] w-[56rem] max-w-full rounded-full bg-emerald-500/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-lime-400/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 -left-40 h-96 w-96 rounded-full bg-emerald-600/15 blur-[120px] pointer-events-none"></div>
      {/* Key watermark */}
      <KeyRound className="absolute -left-24 top-24 size-[28rem] -rotate-12 text-lime-300/[0.03] pointer-events-none" strokeWidth={0.6} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
        {/* Heading */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/5 px-1.5 py-1 pr-4 text-sm font-medium text-lime-200 backdrop-blur">
            <span className="rounded-full bg-lime-300 px-2 py-0.5 text-xs font-bold text-emerald-950">NEW</span>
            Desktop Licensing Template
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Next <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-200 via-lime-300 to-emerald-400">License</span>
          </h2>
          <p className="text-lg md:text-xl text-emerald-100/70 max-w-3xl mx-auto leading-relaxed">
            Sell <strong className="text-white">perpetual, offline-verified licenses</strong> for your .NET and Electron desktop apps.
            Stripe Checkout, signed JWT license keys, GitHub-hosted downloads and an Operations Center,
            with no activation server to run.
          </p>
        </div>

        <FlowSteps />
        <LicenseDemo />
        <ScreenGallery />

        {/* Call to action */}
        <div className="mt-16 flex flex-col lg:flex-row items-center justify-center gap-6">
          <CopyBlock className="w-full lg:w-auto">
            npx create-net next-license ProjectName
          </CopyBlock>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`${docs}/getting-started/overview`}
              className="inline-flex items-center justify-center px-6 py-3 font-bold text-emerald-950 transition-all duration-200 bg-lime-300 rounded-full shadow-sm hover:bg-lime-200 hover:shadow-lg hover:shadow-lime-300/30"
            >
              Get Started
            </Link>
            <Link
              href={docs}
              className="inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-white/5 border border-white/15 rounded-full hover:border-lime-300/50 hover:text-lime-200"
            >
              Read the Docs
            </Link>
            <a
              href="https://github.com/NetCoreTemplates/next-license"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-3 font-medium text-emerald-100/60 hover:text-white"
            >
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowSteps() {
  return (
    <div className="relative mt-16">
      {/* animated connector */}
      <svg className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-2 w-3/4 md:block" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden="true">
        <line x1="0" y1="1" x2="100" y2="1" stroke="rgb(190 242 100 / 0.45)" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="animate-dash-flow motion-reduce:animate-none" />
      </svg>
      <ol className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <li key={s.title} className="flex flex-col items-center text-center">
            <div className="relative flex size-14 items-center justify-center rounded-2xl border border-lime-300/25 bg-[#0d1f15] shadow-lg shadow-black/40 ring-4 ring-[#07120c]">
              <s.icon className="size-6 text-lime-300" />
              <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-lime-300 font-mono text-[10px] font-bold text-emerald-950">{i + 1}</span>
            </div>
            <h3 className="mt-4 font-semibold">{s.title}</h3>
            <p className="mt-1 max-w-[14rem] text-sm text-emerald-100/60">{s.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function LicenseDemo() {
  const [build, setBuild] = useState(2);
  const [lifetime, setLifetime] = useState(false);
  const [lang, setLang] = useState<'csharp' | 'js'>('csharp');

  const buildDate = builds[build].date;
  const valid = lifetime || buildDate <= updatesThrough;

  return (
    <div className="mt-20">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-lime-300/80">Try it</p>
        <h3 className="mt-3 text-2xl md:text-3xl font-bold">One signed key. One local check.</h3>
        <p className="mt-3 text-emerald-100/60 max-w-2xl mx-auto">
          Licenses cover every build released on or before their update cutoff, forever. Pick a build or switch to Lifetime to see what your app decides.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* License key */}
        <Panel title="license.jwt" badge={<span className="font-mono text-[11px] text-emerald-100/50">ES256 · signed, not encrypted</span>}>
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/30 p-4">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-lime-200/10 to-transparent animate-shimmer motion-reduce:hidden pointer-events-none" />
            <p className="relative font-mono text-[12px] leading-relaxed break-all">
              <span className="text-rose-300">{jwt.header}</span>
              <span className="text-white/40">.</span>
              <span className="text-lime-300">{jwt.payload}</span>
              <span className="text-white/40">.</span>
              <span className="text-sky-300">{jwt.signature}</span>
            </p>
          </div>
          <div className="mt-3 flex gap-4 font-mono text-[11px] text-emerald-100/50">
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-rose-300" />header</span>
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-lime-300" />claims</span>
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-sky-300" />signature</span>
          </div>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-white/10 bg-black/30 p-4 font-mono text-[12.5px] leading-6">
            <span className="text-white/40">{'{'}</span>{'\n'}
            <Claim k="iss" v='"acme-studio"' />
            <Claim k="aud" v='"acme-studio"' />
            <Claim k="name" v='"Alex Morgan"' />
            <Claim k="organization" v='"Northstar Studio"' />
            <Claim k="seats" v="3" num />
            <Claim k="edition" v='"Pro"' />
            <Claim k="lifetime" v={String(lifetime)} num highlight last={lifetime} />
            {!lifetime && <Claim k="updatesThrough" v={`"${updatesThrough}"`} highlight last />}
            <span className="text-white/40">{'}'}</span>
          </pre>
        </Panel>

        {/* Your app */}
        <Panel
          title="Your desktop app"
          badge={
            <div className="flex rounded-md border border-white/10 bg-black/30 p-0.5 text-xs font-medium">
              {([['csharp', '.NET'], ['js', 'Electron']] as const).map(([k, label]) => (
                <button key={k} type="button" onClick={() => setLang(k)} aria-pressed={lang === k}
                  className={`rounded px-2.5 py-1 transition-colors ${lang === k ? 'bg-lime-300 text-emerald-950' : 'text-emerald-100/60 hover:text-white'}`}>
                  {label}
                </button>
              ))}
            </div>
          }
        >
          <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/30 p-4 font-mono text-[12.5px] leading-6 text-slate-200">
            {lang === 'csharp' ? (
              <>
                <K>var</K> result = <T>LicenseJwt</T>.<F>Verify</F>({'\n'}
                {'    '}pastedKey, embeddedPublicKeyPem,{'\n'}
                {'    '}issuer: <S>&quot;acme-studio&quot;</S>,{'\n'}
                {'    '}product: <S>&quot;acme-studio&quot;</S>,{'\n'}
                {'    '}buildDate: <BuildDate date={buildDate} />);{'\n'}
                {'\n'}
                <K>bool</K> enablePro = result.Valid;
              </>
            ) : (
              <>
                <K>const</K> result = <F>verifyLicense</F>(savedKey, {'{'}{'\n'}
                {'  '}publicKey: bundledPublicKeyPem,{'\n'}
                {'  '}issuer: <S>&apos;acme-studio&apos;</S>,{'\n'}
                {'  '}product: <S>&apos;acme-studio&apos;</S>,{'\n'}
                {'  '}buildDate: <BuildDate date={buildDate} quote="'" />,{'\n'}
                {'}'});{'\n'}
                <K>const</K> enablePro = result.valid;
              </>
            )}
          </pre>

          {/* Result */}
          <div
            aria-live="polite"
            className={`mt-4 rounded-xl border p-4 transition-colors duration-300 ${valid ? 'border-lime-300/40 bg-lime-300/10' : 'border-amber-300/40 bg-amber-300/10'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${valid ? 'bg-lime-300 text-emerald-950' : 'bg-amber-300 text-amber-950'}`}>
                {valid ? <ShieldCheck className="size-5" /> : <TriangleAlert className="size-5" />}
              </div>
              <div className="min-w-0">
                <p className="font-mono text-sm">
                  status: <span className={valid ? 'text-lime-300' : 'text-amber-300'}>{valid ? 'valid' : 'buildNotCovered'}</span>
                </p>
                <p className="text-sm text-emerald-100/70">
                  {valid
                    ? 'Pro enabled · Registered to Alex Morgan, Northstar Studio · 3 seats'
                    : 'Registered to Alex Morgan · renew to use this version, older builds keep working'}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-emerald-100/50">
            <WifiOff className="size-3.5" /> No network, activation server or expiry date. Nothing compares against today.
          </p>
        </Panel>
      </div>

      {/* Coverage timeline */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold">Build coverage</h4>
            <p className="text-sm text-emerald-100/60">Your app embeds its own release date. Select a build:</p>
          </div>
          <div role="radiogroup" aria-label="License type" className="inline-flex self-start rounded-full border border-white/10 bg-black/30 p-1 text-sm font-medium">
            {[false, true].map((lt) => (
              <button key={String(lt)} type="button" role="radio" aria-checked={lifetime === lt} onClick={() => setLifetime(lt)}
                className={`rounded-full px-4 py-1.5 transition-colors ${lifetime === lt ? 'bg-lime-300 text-emerald-950' : 'text-emerald-100/60 hover:text-white'}`}>
                {lt ? 'Lifetime · $129' : '12 months · $49'}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-10 mb-2 px-2">
          {/* track */}
          <div className="absolute left-[1.75rem] right-[1.75rem] top-[18px] h-1 rounded-full bg-white/10" />
          <div
            className="absolute left-[1.75rem] top-[18px] h-1 rounded-full bg-gradient-to-r from-emerald-500 to-lime-300 transition-[width] duration-500"
            style={{ width: `calc((100% - 3.5rem) * ${lifetime ? 1 : cutoffAt})` }}
          />
          {/* cutoff marker */}
          <div
            className={`absolute -top-7 flex -translate-x-1/2 flex-col items-center transition-opacity duration-300 ${lifetime ? 'opacity-0' : 'opacity-100'}`}
            style={{ left: `calc(1.75rem + (100% - 3.5rem) * ${cutoffAt})` }}
          >
            <span className="whitespace-nowrap rounded bg-lime-300/15 px-1.5 py-0.5 font-mono text-[10px] text-lime-200">updatesThrough {updatesThrough}</span>
            <span className="h-12 w-px bg-lime-300/50" />
          </div>

          <div className="relative flex justify-between">
            {builds.map((b, i) => {
              const covered = lifetime || b.date <= updatesThrough;
              const selected = i === build;
              return (
                <button
                  key={b.version}
                  type="button"
                  onClick={() => setBuild(i)}
                  aria-pressed={selected}
                  aria-label={`Build ${b.version} released ${b.date}, ${covered ? 'covered' : 'not covered'}`}
                  className="group flex w-10 flex-col items-center focus:outline-none"
                >
                  <span className={`flex size-10 items-center justify-center rounded-full border-2 transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-lime-300/60 ${
                    selected
                      ? covered
                        ? 'scale-110 border-lime-300 bg-lime-300 text-emerald-950 shadow-[0_0_24px_rgb(190_242_100/0.6)]'
                        : 'scale-110 border-amber-300 bg-[#0d1f15] text-amber-300 shadow-[0_0_24px_rgb(252_211_77/0.4)]'
                      : covered
                        ? 'border-lime-300 bg-[#0d1f15] text-lime-300 group-hover:scale-105'
                        : 'border-white/20 bg-[#0d1f15] text-white/40 group-hover:scale-105'
                  }`}>
                    {covered ? <Check className="size-4" strokeWidth={3} /> : <TriangleAlert className="size-4" />}
                  </span>
                  <span className={`mt-2 font-mono text-xs font-semibold ${selected ? 'text-white' : 'text-emerald-100/60'}`}>v{b.version}</span>
                  <span className="hidden sm:block font-mono text-[10px] text-emerald-100/40 whitespace-nowrap">{b.date}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenGallery() {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const screen = allScreens[index];
  const prev = useCallback(() => setIndex((i) => (i - 1 + allScreens.length) % allScreens.length), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % allScreens.length), []);
  const close = useCallback(() => setFullscreen(false), []);

  return (
    <div className="mt-24">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-lime-300/80">The complete storefront</p>
        <h3 className="mt-3 text-2xl md:text-3xl font-bold">Everything needed to sell your software</h3>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[16rem_1fr]">
        {/* Screen navigator */}
        <nav aria-label="Next License screens" className="flex gap-6 overflow-x-auto pb-2 lg:flex-col lg:gap-5 lg:overflow-visible lg:pb-0 [scrollbar-width:thin]">
          {groups.map((g) => (
            <div key={g.name} className="shrink-0 lg:shrink">
              <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-100/40">{g.name}</p>
              <ul className="flex gap-1 lg:flex-col">
                {g.screens.map((s) => {
                  const i = allScreens.indexOf(s);
                  const active = i === index;
                  return (
                    <li key={s.file}>
                      <button
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-current={active}
                        className={`flex w-full items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors
                          ${active ? 'bg-lime-300/15 text-lime-200 ring-1 ring-inset ring-lime-300/30' : 'text-emerald-100/60 hover:bg-white/5 hover:text-white'}`}
                      >
                        <s.icon className="size-4 shrink-0" />
                        {s.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Stage */}
        <div className="min-w-0">
          <div className="group relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-lime-300/20 via-emerald-500/10 to-transparent blur-2xl pointer-events-none"></div>
            <div className="relative overflow-hidden rounded-xl border border-white/15 bg-[#0d1f15] shadow-2xl shadow-black/60">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
                <span className="size-3 rounded-full bg-white/15" />
                <span className="size-3 rounded-full bg-white/15" />
                <span className="size-3 rounded-full bg-white/15" />
                <span className="mx-auto flex min-w-0 max-w-sm flex-1 items-center justify-center gap-1.5 truncate rounded-md bg-black/30 px-3 py-1 font-mono text-[11px] text-emerald-100/60">
                  <ShieldCheck className="size-3 shrink-0 text-lime-300/70" />
                  acme.studio<span className="text-emerald-100/90">{screen.path}</span>
                </span>
                <button type="button" onClick={() => setFullscreen(true)} aria-label={`View ${screen.title} fullscreen`} className="text-emerald-100/50 hover:text-lime-200">
                  <Maximize2 className="size-4" />
                </button>
              </div>
              <button type="button" onClick={() => setFullscreen(true)} aria-label={`View ${screen.title} fullscreen`} className="block w-full cursor-zoom-in bg-white aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={screen.file}
                  src={src(screen)}
                  alt={screen.title}
                  className="size-full object-cover object-top transition-[object-position] duration-[4000ms] ease-in-out group-hover:object-bottom motion-reduce:transition-none"
                />
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div className="flex-1">
              <h4 className="text-lg font-semibold">{screen.title}</h4>
              <p className="text-emerald-100/60">{screen.desc}</p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <Link href={screen.href} className="text-sm font-semibold text-lime-300 hover:text-lime-200">Read the guide →</Link>
              <div className="flex gap-1">
                <button type="button" onClick={prev} aria-label="Previous screen" className="rounded-full border border-white/15 p-2 text-emerald-100/70 hover:border-lime-300/50 hover:text-lime-200">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button type="button" onClick={next} aria-label="Next screen" className="rounded-full border border-white/15 p-2 text-emerald-100/70 hover:border-lime-300/50 hover:text-lime-200">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {fullscreen && (
        <Lightbox
          image={{ src: src(screen), alt: screen.title, caption: `${screen.title} — ${screen.desc}` }}
          counter={`${index + 1} / ${allScreens.length}`}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}

function Panel({ title, badge, children }: { title: string; badge?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-xl shadow-black/30 backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-mono text-sm text-emerald-100/80">
          <span className="size-2 rounded-full bg-lime-300 shadow-[0_0_8px_rgb(190_242_100)]" />
          {title}
        </span>
        {badge}
      </div>
      {children}
    </div>
  );
}

function Claim({ k, v, num, highlight, last }: { k: string; v: string; num?: boolean; highlight?: boolean; last?: boolean }) {
  return (
    <span className={`block -mx-4 px-4 ${highlight ? 'bg-lime-300/10' : ''}`}>
      {'  '}<span className="text-sky-300">&quot;{k}&quot;</span><span className="text-white/40">: </span>
      <span className={num ? 'text-amber-200' : 'text-lime-200'}>{v}</span>
      {!last && <span className="text-white/40">,</span>}
    </span>
  );
}

function BuildDate({ date, quote = '"' }: { date: string; quote?: string }) {
  return (
    <span key={date} className="rounded bg-lime-300/15 px-1 text-lime-200 ring-1 ring-lime-300/30">{quote}{date}{quote}</span>
  );
}

const K = ({ children }: { children: ReactNode }) => <span className="text-violet-300">{children}</span>;
const T = ({ children }: { children: ReactNode }) => <span className="text-emerald-300">{children}</span>;
const F = ({ children }: { children: ReactNode }) => <span className="text-sky-300">{children}</span>;
const S = ({ children }: { children: ReactNode }) => <span className="text-lime-200">{children}</span>;
