import { LenisProvider } from "@/components/motion/lenis-provider";
import { ScrollTriggerBridge } from "@/components/motion/scroll-trigger-bridge";
import { IpadDotCursor } from "@/components/motion/ipad-dot-cursor";
import { AppFooter } from "@/components/site/app-footer";
import { AppHeader } from "@/components/site/app-header";
import { HeroOverlayProvider } from "@/components/site/hero-overlay-context";
import { InquiryDrawerProvider } from "@/components/site/inquiry-drawer-context";
import { LeafoGuideBot } from "@/components/site/leafo-guide-bot";
import { MobileNavSheetProvider } from "@/components/site/mobile-nav-sheet-context";
import { CosmicSpectrum } from "@/components/ui/cosmos-spectrum";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <HeroOverlayProvider>
      <MobileNavSheetProvider>
        <InquiryDrawerProvider>
          <LenisProvider>
            <div className="flex min-h-[100dvh] flex-1 flex-col">
              <AppHeader />
              <main className="flex-1">{children}</main>
              <AppFooter />
              <CosmicSpectrum color="original" blur />
              <ScrollTriggerBridge />
              <IpadDotCursor />
              <LeafoGuideBot />
            </div>
          </LenisProvider>
        </InquiryDrawerProvider>
      </MobileNavSheetProvider>
    </HeroOverlayProvider>
  );
}
