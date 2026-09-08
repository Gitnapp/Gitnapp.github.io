import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SiteLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main
        id="main"
        className="mx-auto w-full max-w-(--gds-content-standard) grow px-5 pt-12 pb-16 md:px-8 md:pt-16"
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
