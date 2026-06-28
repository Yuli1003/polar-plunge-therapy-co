/**
 * Primary screening conversion in the header — client:load so it is
 * interactive on first paint (per spec hydration plan).
 */
export default function NavScreeningButton() {
  return (
    <a
      href="/intake"
      className="btn btn-primary text-sm"
      onClick={() => {
        // lightweight conversion signal; no-op if analytics absent
        (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push?.({
          event: "screening_cta_click",
          location: "nav",
        });
      }}
    >
      Start medical screening
    </a>
  );
}
