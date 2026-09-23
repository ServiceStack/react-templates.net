import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { Building2, KeyRound, Layers } from 'lucide-react';
import type { ReactNode } from 'react';
import { ImageLightbox } from '@/components/image-lightbox';

const nextSaasUrl = '/docs/next-saas';
const nextLicenseUrl = '/docs/next-license';

function tabIcon(icon: ReactNode) {
  return (
    <div className="size-full [&_svg]:size-full max-md:p-1.5 max-md:rounded-md max-md:border max-md:bg-fd-secondary">
      {icon}
    </div>
  );
}

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const urls = source.getPages().map((page) => page.url);
  const isNextSaas = (url: string) => url === nextSaasUrl || url.startsWith(nextSaasUrl + '/');

  const isNextLicense = (url: string) => url === nextLicenseUrl || url.startsWith(nextLicenseUrl + '/');

  const tabs = [
    {
      title: 'React Templates',
      description: '.NET React Templates',
      url: '/docs',
      icon: tabIcon(<Layers />),
      urls: new Set(urls.filter((url) => !isNextSaas(url) && !isNextLicense(url))),
    },
    {
      title: 'Next SaaS',
      description: 'Multi-tenant B2B SaaS Template',
      url: nextSaasUrl,
      icon: tabIcon(<Building2 />),
      urls: new Set(urls.filter(isNextSaas)),
    },
    {
      title: 'Next License',
      description: 'Perpetual Software Licensing Template',
      url: nextLicenseUrl,
      icon: tabIcon(<KeyRound />),
      urls: new Set(urls.filter(isNextLicense)),
    },
  ];

  return (
    <DocsLayout tree={source.pageTree} sidebar={{ tabs }} {...baseOptions()}>
      {children}
      <ImageLightbox prefix={nextSaasUrl} />
      <ImageLightbox prefix={nextLicenseUrl} />
    </DocsLayout>
  );
}
