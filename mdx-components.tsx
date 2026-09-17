import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Info } from '@/components/info';
import { Tip } from '@/components/tip';
import { YouTube } from '@/components/youtube';
import { ReactTemplates, ReactTemplate } from '@/components/react-template';
import { ScreenshotsGallery } from '@/components/screenshots-gallery';
import { CopyBlock } from '@/app/components/copy-block';
import { Pipeline, PipelineStep } from '@/components/pipeline';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Info,
    Tip,
    YouTube,
    ReactTemplate,
    ReactTemplates,
    ScreenshotsGallery,
    CopyBlock,
    Pipeline,
    PipelineStep,
    ...components,
  };
}
