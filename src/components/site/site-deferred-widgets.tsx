"use client";

import dynamic from "next/dynamic";

const CosmicSpectrum = dynamic(
  () => import("@/components/ui/cosmos-spectrum").then((m) => m.CosmicSpectrum),
  { ssr: false },
);

const LeafoGuideBot = dynamic(
  () => import("@/components/site/leafo-guide-bot").then((m) => m.LeafoGuideBot),
  { ssr: false },
);

export function SiteDeferredWidgets() {
  return (
    <>
      <CosmicSpectrum color="original" blur />
      <LeafoGuideBot />
    </>
  );
}
