'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface LightboxImage {
  src: string;
  alt: string;
}

// Opens markdown images inside the docs body fullscreen when clicked
export function ImageLightbox({ prefix }: { prefix: string }) {
  const pathname = usePathname();
  const enabled = pathname === prefix || pathname.startsWith(prefix + '/');
  const [image, setImage] = useState<LightboxImage | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const img = (e.target as HTMLElement).closest?.('.prose img') as HTMLImageElement | null;
      if (!img || img.closest('a')) return; // linked images keep navigating
      e.preventDefault();
      setImage({ src: img.currentSrc || img.src, alt: img.alt });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [enabled]);

  // close when navigating to another page
  useEffect(() => setImage(null), [pathname]);

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setImage(null);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [image]);

  if (!enabled) return null;

  return (
    <>
      <style>{`.prose img:not(a img) { cursor: zoom-in; }`}</style>
      {image && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt || 'Image preview'}
          onClick={() => setImage(null)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setImage(null)}
            className="absolute top-4 right-4 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[calc(100vh-5rem)] max-w-full rounded-lg object-contain shadow-2xl"
          />
          {image.alt && <p className="text-sm text-white/80">{image.alt}</p>}
        </div>
      )}
    </>
  );
}
