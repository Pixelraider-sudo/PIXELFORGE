import { useState, type ImgHTMLAttributes } from 'react'

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string
    alt: string
    /** Optional wrapper className — applied to the container, not the <img> itself */
    wrapperClassName?: string
    /** Aspect ratio for the skeleton placeholder, e.g. '16/9', '1/1', '4/3' */
    aspectRatio?: string
}

/**
 * Drop-in replacement for <img> that shows an animated shimmer
 * skeleton while the image loads, then cross-fades to the real image.
 *
 * Usage:
 *   <ImageWithSkeleton
 *     src="https://images.unsplash.com/..."
 *     alt="Project screenshot"
 *     className="w-full h-full object-cover"
 *     aspectRatio="16/9"
 *   />
 */
export function ImageWithSkeleton({
    src,
    alt,
    className = '',
    wrapperClassName = '',
    aspectRatio,
    loading = 'lazy',
    ...rest
}: ImageWithSkeletonProps) {
    const [loaded, setLoaded] = useState(false)
    const [errored, setErrored] = useState(false)

    return (
        <div
            className={`relative overflow-hidden ${wrapperClassName}`}
            style={aspectRatio ? { aspectRatio } : undefined}
        >
            {/* Shimmer skeleton — visible until image loads */}
            {!loaded && !errored && (
                <div
                    className="absolute inset-0"
                    aria-hidden="true"
                    style={{
                        background: 'linear-gradient(110deg, #141C30 8%, #1A2340 18%, #141C30 33%)',
                        backgroundSize: '200% 100%',
                        animation: 'skeletonShimmer 1.6s ease-in-out infinite',
                    }}
                />
            )}

            {/* Fallback if image fails to load */}
            {errored && (
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: '#141C30' }}
                    aria-hidden="true"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3D4E72" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="M21 15l-5-5L5 21" />
                    </svg>
                </div>
            )}

            {/* Real image — fades in once loaded */}
            <img
                src={src}
                alt={alt}
                loading={loading}
                onLoad={() => setLoaded(true)}
                onError={() => setErrored(true)}
                className={className}
                style={{
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    ...(rest.style ?? {}),
                }}
                {...rest}
            />

            {/* Keyframes — injected once via style tag (scoped to this component instance is fine, browsers dedupe identical rules) */}
            <style>{`
        @keyframes skeletonShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
        </div>
    )
}