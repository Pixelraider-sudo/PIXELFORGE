import { type HTMLAttributes } from 'react'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    /** Width — any valid CSS value, e.g. '100%', '120px' */
    width?: string
    /** Height — any valid CSS value, e.g. '1rem', '200px' */
    height?: string
    /** Border radius — defaults to 8px, use '50%' for circles/avatars */
    radius?: string
}

/**
 * Generic shimmer skeleton block — building block for card/text placeholders.
 *
 * Usage:
 *   <Skeleton width="60%" height="1.25rem" />          // text line
 *   <Skeleton width="48px" height="48px" radius="50%" /> // avatar
 *   <Skeleton width="100%" height="160px" radius="12px" /> // image block
 */
export function Skeleton({ width = '100%', height = '1rem', radius = '8px', className = '', style, ...rest }: SkeletonProps) {
    return (
        <div
            aria-hidden="true"
            className={className}
            style={{
                width,
                height,
                borderRadius: radius,
                background: 'linear-gradient(110deg, #141C30 8%, #1A2340 18%, #141C30 33%)',
                backgroundSize: '200% 100%',
                animation: 'skeletonShimmer 1.6s ease-in-out infinite',
                flexShrink: 0,
                ...style,
            }}
            {...rest}
        >
            <style>{`
        @keyframes skeletonShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
        </div>
    )
}

/**
 * Pre-built skeleton matching the FEATURED_PROJECTS / blog card layout.
 * Drop this in while real cards are loading or as a viewport placeholder.
 *
 * Usage:
 *   {loading ? <CardSkeleton /> : <ProjectCard {...project} />}
 */
export function CardSkeleton() {
    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
        >
            <Skeleton width="100%" height="160px" radius="0" />
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <Skeleton width="36px" height="36px" radius="10px" />
                    <Skeleton width="60%" height="1rem" />
                </div>
                <Skeleton width="100%" height="0.85rem" style={{ marginBottom: '8px' }} />
                <Skeleton width="90%" height="0.85rem" style={{ marginBottom: '8px' }} />
                <Skeleton width="70%" height="0.85rem" style={{ marginBottom: '16px' }} />
                <div style={{ display: 'flex', gap: '6px' }}>
                    <Skeleton width="60px" height="22px" radius="100px" />
                    <Skeleton width="70px" height="22px" radius="100px" />
                    <Skeleton width="50px" height="22px" radius="100px" />
                </div>
            </div>
        </div>
    )
}

/**
 * Grid of CardSkeletons — drop in while a list is loading.
 *
 * Usage:
 *   {loading ? <CardSkeletonGrid count={4} /> : <ProjectGrid items={projects} />}
 */
export function CardSkeletonGrid({ count = 4 }: { count?: number }) {
    return (
        <div className="grid md:grid-cols-2 gap-5">
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    )
}