import Image from 'next/image';

type PostBylineProps = {
    author: string;
    authorImage?: string;
    date: string;
    readingTime?: number;
    locale: string;
    minutesLabel?: string;
    className?: string;
    voiceCredit?: string; // Voice actor credit for audio
};

// Voice names for Azure Neural voices
const VOICE_NAMES: { [key: string]: string } = {
    'da': 'Christel (Azure Neural)',
    'en': 'Jenny (Azure Neural)',
};

function getInitials(name: string): string {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export default function PostByline({
    author,
    authorImage,
    date,
    readingTime,
    locale,
    minutesLabel = 'min',
    className = '',
    voiceCredit
}: PostBylineProps) {
    const formattedDate = new Date(date).toLocaleDateString(
        locale === 'da' ? 'da-DK' : 'en-US',
        { day: 'numeric', month: 'long', year: 'numeric' }
    );

    // Get default voice name if not provided
    const voiceName = voiceCredit || VOICE_NAMES[locale] || VOICE_NAMES['da'];
    const voiceLabel = locale === 'da' ? 'Oplæst af' : 'Narrated by';

    return (
        <div className={`post-byline ${className}`}>
            {/* Top divider */}
            <div className="post-byline__divider" />

            <div className="post-byline__content">
                {/* Author avatar */}
                <div className="post-byline__avatar">
                    {authorImage ? (
                        <Image
                            src={authorImage}
                            alt={author}
                            width={48}
                            height={48}
                            className="post-byline__avatar-img"
                        />
                    ) : (
                        <div className="post-byline__avatar-fallback">
                            {getInitials(author)}
                        </div>
                    )}
                </div>

                {/* Author and meta */}
                <div className="post-byline__meta">
                    <span className="post-byline__author">
                        <span className="post-byline__author-prefix">Af </span>
                        {author}
                    </span>
                    <div className="post-byline__details">
                        <time className="post-byline__date">{formattedDate}</time>
                        {readingTime && (
                            <>
                                <span className="post-byline__separator">•</span>
                                <span className="post-byline__reading-time">
                                    <svg className="post-byline__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                    {readingTime} {minutesLabel}
                                </span>
                            </>
                        )}
                    </div>
                    {/* Voice credit */}
                    <div className="post-byline__voice">
                        <span className="post-byline__voice-label">{voiceLabel}: </span>
                        <span className="post-byline__voice-name">{voiceName}</span>
                    </div>
                </div>
            </div>

            {/* Bottom divider */}
            <div className="post-byline__divider" />
        </div>
    );
}
