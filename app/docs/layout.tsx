import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { Building2, Layers } from 'lucide-react';
import type { ReactNode } from 'react';
import { ImageLightbox } from '@/components/image-lightbox';

const nextSaasUrl = '/docs/next-saas';

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

  const tabs = [
    {
      title: 'React Templates',
      description: '.NET React Templates',
      url: '/docs',
      icon: tabIcon(<Layers />),
      urls: new Set(urls.filter((url) => !isNextSaas(url))),
    },
    {
      title: 'Next SaaS',
      description: 'Multi-tenant B2B SaaS Template',
      url: nextSaasUrl,
      icon: tabIcon(<Building2 />),
      urls: new Set(urls.filter(isNextSaas)),
    },
  ];

  return (
    <DocsLayout tree={source.pageTree} sidebar={{ tabs }} {...baseOptions()}>
      {children}
      <ImageLightbox prefix={nextSaasUrl} />
    </DocsLayout>
  );
}
