/* eslint-disable @next/next/no-img-element */
export function SocialIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
    const icons: Record<string, React.ReactNode> = {
        hmath: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="3" width="20" height="18" rx="3" fill="currentColor" opacity="0.2" />
                <path d="M7 8v8M7 12h4M11 8v8M15 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
        ),
        search: (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </svg>
        ),
        facebook: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
        zalo: (
            <img src="/Zalo-icon.webp" alt="Zalo" className={className} />
        ),
    };

    return <>{icons[name] || null}</>;
}

