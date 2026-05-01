import { ScrollTriggerBridge } from "@/components/motion/scroll-trigger-bridge";
import { IpadDotCursor } from "@/components/motion/ipad-dot-cursor";
import { AppFooter } from "@/components/site/app-footer";
import { AppHeader } from "@/components/site/app-header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-1 flex-col">
      <AppHeader />
      <main className="flex-1">{children}</main>
      <AppFooter />
      <ScrollTriggerBridge />
      <IpadDotCursor />
    </div>
  );
}
