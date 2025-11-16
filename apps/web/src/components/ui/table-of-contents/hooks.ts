import * as React from 'react';

export interface ScrollSpyOptions {
  /**
   * If true, the scroll spy will be enabled.
   */
  enabled?: boolean;
  /**
   * Intersection observer root margin. Defaults to '0px 0px -70% 0px'.
   */
  rootMargin?: string;
  /**
   * Intersection observer thresholds. Defaults to 0.1.
   */
  threshold?: number | number[];
}

export const useScrollSpy = (options?: ScrollSpyOptions): string | null => {
  const { enabled = false, rootMargin = '0px 0px -70% 0px', threshold = 0.3 } = options ?? {};
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!enabled) return;
    const headings = Array.from(document.querySelectorAll('h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]'));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          if (!id) return;

          if (entry.isIntersecting) setActiveId(id);
        });
      },
      { rootMargin, threshold },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [enabled, rootMargin, threshold]);

  return activeId;
};
