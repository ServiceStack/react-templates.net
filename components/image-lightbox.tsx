'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxProps {
  image: LightboxImage;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  counter?: string;
}

// Fullscreen image overlay, closes on click, Esc or ×; ← → navigate when onPrev/onNext are provided
export function Lightbox({ image, onClose, onPrev, onNext, counter }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev?.();
      else if (e.key === 'ArrowRight') onNext?.();
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose, onPrev, onNext]);

  const navButton = 'absolute top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/80 hover:bg-white/20 hover:text-white';
  const stop = (fn?: () => void) => (e: React.MouseEvent) => { e.stopPropagation(); fn?.(); };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || 'Image preview'}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
    >
      <button type="button" aria-label="Close" onClick={stop(onClose)}
        className="absolute top-4 right-4 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white">
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {onPrev && (
        <button type="button" aria-label="Previous image" onClick={stop(onPrev)} className={`${navButton} left-4`}>
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}
      {onNext && (
        <button type="button" aria-label="Next image" onClick={stop(onNext)} className={`${navButton} right-4`}>
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        className="max-h-[calc(100vh-6rem)] max-w-full rounded-lg object-contain shadow-2xl"
      />
      {(image.caption || image.alt || counter) && (
        <p className="text-sm text-white/80">
          {image.caption || image.alt}
          {counter && <span className="ml-3 text-white/50">{counter}</span>}
        </p>
      )}
    </div>
  );
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

  if (!enabled) return null;

  return (
    <>
      <style>{`.prose img:not(a img) { cursor: zoom-in; }`}</style>
      {image && <Lightbox image={image} onClose={() => setImage(null)} />}
    </>
  );
}
