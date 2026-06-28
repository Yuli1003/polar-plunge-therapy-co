import { useEffect, useState } from "react";

/**
 * Minimal mobile screening bar — appears on scroll. client:load so it is
 * tappable immediately. Quiet serif text-link, no fill (kei-language).
 */
export default function MobileScreeningStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 560;
      // hide once the footer (and its CTA) comes into view, so we never stack two
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - window.innerHeight * 0.9;
      setVisible(scrolled && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-background/95 px-5 py-3.5 backdrop-blur-sm transition-transform duration-500 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <a
        href="/intake"
        className="flex min-h-[44px] items-center justify-center gap-2 font-display text-[1.05rem] text-ink"
        tabIndex={visible ? 0 : -1}
      >
        Start medical screening <span aria-hidden="true">(→)</span>
      </a>
    </div>
  );
}
