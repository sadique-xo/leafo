# Scroll Image Sequence Effect - Reusable Prompt

## What This Does
Apple-style scroll-driven image sequence. Frames from a video play forward/backward as the user scrolls. Works with any Next.js + Tailwind project.

## Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- GSAP + ScrollTrigger
- Optional: Lenis for smooth scroll

## Setup

### Install dependencies
```bash
npm install gsap
# optional but recommended
npm install lenis
```

### Get your frames
1. Go to https://ezgif.com/video-to-jpg
2. Upload video clip (5-15 seconds)
3. Set frame rate: 15fps
4. Download ZIP, extract JPGs into `public/frames/`

## Implementation

### GSAP Registration (`src/lib/gsap.ts`)
```tsx
'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
```

### Lenis Provider (optional, `src/components/providers/lenis-provider.tsx`)
```tsx
'use client'
import { ReactLenis } from 'lenis/react'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
```
Wrap your layout children with `<LenisProvider>` in `layout.tsx`.

### ScrollSequence Component (`src/components/scroll-sequence.tsx`)

**IMPORTANT: Before using, check `public/frames/` for actual file count and naming pattern. Replace FRAME_COUNT and getFrameSrc with real values.**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface ScrollSequenceProps {
  frameCount: number
  frameWidth: number
  frameHeight: number
  getFrameSrc: (index: number) => string
  scrollDistance?: string     // default "+=300%"
  scrubSpeed?: number         // default 0.5
  overlayContent?: React.ReactNode
  className?: string
}

export function ScrollSequence({
  frameCount,
  frameWidth,
  frameHeight,
  getFrameSrc,
  scrollDistance = '+=300%',
  scrubSpeed = 0.5,
  overlayContent,
  className = '',
}: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // preload frames
  useEffect(() => {
    const images: HTMLImageElement[] = []
    let loaded = 0

    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      img.src = getFrameSrc(i)
      img.onload = () => {
        loaded++
        setProgress(Math.round((loaded / frameCount) * 100))

        if (i === 0 && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          ctx?.drawImage(img, 0, 0, frameWidth, frameHeight)
        }

        if (loaded === frameCount) setIsLoading(false)
      }
      images.push(img)
    }
    imagesRef.current = images
  }, [frameCount, frameWidth, frameHeight, getFrameSrc])

  // gsap scroll scrubbing
  useEffect(() => {
    if (isLoading) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    const obj = { frame: 0 }
    const tl = gsap.to(obj, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: scrollDistance,
        pin: true,
        scrub: scrubSpeed,
      },
      onUpdate: () => {
        const index = Math.round(obj.frame)
        const img = imagesRef.current[index]
        if (img?.complete) {
          ctx.clearRect(0, 0, frameWidth, frameHeight)
          ctx.drawImage(img, 0, 0, frameWidth, frameHeight)
        }
      },
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [isLoading, frameCount, frameWidth, frameHeight, scrollDistance, scrubSpeed])

  return (
    <section ref={sectionRef} className={`relative h-screen ${className}`}>
      {/* loading state */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4">
          <span className="text-5xl font-bold tracking-tight">
            {progress}%
          </span>
          <div className="h-0.5 w-48 overflow-hidden rounded-full bg-neutral-800">
            <div
              className="h-full bg-white transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* canvas */}
      <canvas
        ref={canvasRef}
        width={frameWidth}
        height={frameHeight}
        className="h-full w-full object-contain"
      />

      {/* optional overlay */}
      {overlayContent && (
        <div className="pointer-events-none absolute inset-0">
          {overlayContent}
        </div>
      )}
    </section>
  )
}
```

### Usage Examples

#### Basic (landscape video, full screen)
```tsx
<ScrollSequence
  frameCount={90}
  frameWidth={1920}
  frameHeight={1080}
  getFrameSrc={(i) => `/frames/frame_${String(i + 1).padStart(3, '0')}.jpg`}
/>
```

#### With overlay text
```tsx
<ScrollSequence
  frameCount={90}
  frameWidth={1920}
  frameHeight={1080}
  getFrameSrc={(i) => `/frames/frame_${String(i + 1).padStart(3, '0')}.jpg`}
  overlayContent={
    <div className="flex h-full items-end p-12">
      <h1 className="text-8xl font-bold text-white mix-blend-difference">
        YOUR BRAND.
      </h1>
    </div>
  }
/>
```

#### Portrait video (centered with side content)
```tsx
<section className="relative h-screen">
  <div className="mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-[1fr_auto_1fr]">
    {/* left text */}
    <div className="hidden flex-col justify-end pb-20 md:flex">
      <h1 className="text-7xl font-extrabold tracking-tighter">NIDA.</h1>
      <p className="mt-4 text-sm tracking-widest text-neutral-500">
        DJ . CURATOR . PRODUCER
      </p>
    </div>

    {/* center canvas (portrait) */}
    <div className="overflow-hidden rounded-2xl border border-white/5">
      <ScrollSequence
        frameCount={82}
        frameWidth={658}
        frameHeight={1168}
        getFrameSrc={(i) => `/frames/frame_${String(i + 1).padStart(3, '0')}.jpg`}
        className="!h-[80vh]"
      />
    </div>

    {/* right text */}
    <div className="hidden pt-20 md:block">
      <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
        Your description text here.
      </p>
    </div>
  </div>
</section>
```

#### Slow cinematic scrub
```tsx
<ScrollSequence
  frameCount={150}
  frameWidth={1920}
  frameHeight={1080}
  getFrameSrc={(i) => `/frames/frame_${String(i + 1).padStart(3, '0')}.jpg`}
  scrollDistance="+=500%"
  scrubSpeed={1}
/>
```

#### Fast snappy scrub
```tsx
<ScrollSequence
  frameCount={60}
  frameWidth={1280}
  frameHeight={720}
  getFrameSrc={(i) => `/frames/frame_${String(i + 1).padStart(3, '0')}.jpg`}
  scrollDistance="+=200%"
  scrubSpeed={0.2}
/>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `frameCount` | number | required | total frames in public/frames/ |
| `frameWidth` | number | required | pixel width of each frame |
| `frameHeight` | number | required | pixel height of each frame |
| `getFrameSrc` | (index: number) => string | required | returns path for frame at index |
| `scrollDistance` | string | "+=300%" | how much scroll travel for full sequence |
| `scrubSpeed` | number | 0.5 | 0.1 = snappy, 1 = laggy smooth |
| `overlayContent` | React.ReactNode | undefined | content layered on top of canvas |
| `className` | string | "" | additional classes on the section |

## Performance Checklist
- Frames under 100KB each (compress at squoosh.app)
- 15fps extraction (10s video = 150 frames, 6s = 90 frames)
- Total payload under 15MB
- Frames at display resolution, don't serve 4K if displaying at 1080p
- First frame draws immediately, rest load in background

## Styling Tricks (Tailwind)

### White background removal
```tsx
// multiply: white vanishes, darkens colors
<canvas className="mix-blend-multiply" />

// screen: dark vanishes, keeps lights
<canvas className="mix-blend-screen" />

// or keep white, frame it as a window
<div className="overflow-hidden rounded-2xl border border-white/5">
  <canvas />
</div>
```

### Grain overlay on top
```tsx
<div className="pointer-events-none absolute inset-0 bg-[url('/grain.png')] opacity-[0.03]" />
```

### Gradient fade at bottom
```tsx
<div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
```