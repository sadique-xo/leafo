import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroLcpImageProps = {
  src: string;
  alt: string;
  className?: string;
};

/** Server-rendered LCP hero image — keep outside client boundaries for faster mobile paint. */
export function HeroLcpImage({ src, alt, className }: HeroLcpImageProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        className="home-hero-image object-cover"
        sizes="100vw"
      />
    </div>
  );
}
