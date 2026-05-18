import { LenisProvider } from "@/components/motion/lenis-provider";
import { ScrollTriggerBridge } from "@/components/motion/scroll-trigger-bridge";
import { IpadDotCursor } from "@/components/motion/ipad-dot-cursor";
import { AppFooter } from "@/components/site/app-footer";
import { AppHeader } from "@/components/site/app-header";
import { HeroOverlayProvider } from "@/components/site/hero-overlay-context";
import { InquiryDrawerProvider } from "@/components/site/inquiry-drawer-context";
import { MobileNavSheetProvider } from "@/components/site/mobile-nav-sheet-context";
import { SiteDeferredWidgets } from "@/components/site/site-deferred-widgets";
import { SiteJsonLd } from "@/components/site/site-json-ld";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <HeroOverlayProvider>
      <MobileNavSheetProvider>
        <InquiryDrawerProvider>
          <LenisProvider>
            <SiteJsonLd />
            <div className="flex min-h-[100dvh] flex-1 flex-col">
              <AppHeader />
              <main className="flex-1">{children}</main>
              <AppFooter />
              <SiteDeferredWidgets />
              <ScrollTriggerBridge />
              <IpadDotCursor />
            </div>
          </LenisProvider>
        </InquiryDrawerProvider>
      </MobileNavSheetProvider>
    </HeroOverlayProvider>
  );
}
