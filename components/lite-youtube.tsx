'use client';

import { useState } from 'react';

interface LiteYouTubeProps {
  id: string;
  title: string;
  className?: string;
}

/**
 * Click-to-play YouTube embed: shows the video's poster and only loads the player once it's clicked.
 */
export function LiteYouTube({ id, title, className = '' }: LiteYouTubeProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-black ${className}`}>
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`} className="group absolute inset-0 h-full w-full cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <svg className="absolute left-1/2 top-1/2 h-12 w-[68px] -translate-x-1/2 -translate-y-1/2 opacity-90 transition-opacity group-hover:opacity-100" viewBox="0 0 68 48" aria-hidden="true">
            <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#f00" />
            <path d="M45 24 27 14v20" fill="#fff" />
          </svg>
        </button>
      )}
    </div>
  );
}
