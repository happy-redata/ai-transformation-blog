'use client';

import { Share2, Heart, UserPlus, Bookmark, Layers } from 'lucide-react';
import Link from 'next/link';

interface ActionBlockProps {
    authorName?: string;
    seriesSlug?: string;
    seriesName?: string;
    postUrl?: string;
    postTitle?: string;
    locale?: string;
}

export default function ActionBlock({
    authorName = 'Forfatteren',
    seriesSlug,
    seriesName,
    postUrl,
    postTitle,
    locale = 'da',
}: ActionBlockProps) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: postTitle || 'Læs denne artikel',
                    url: postUrl || window.location.href,
                });
            } catch (err) {
                // User cancelled
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(postUrl || window.location.href);
            alert('Link kopieret til udklipsholder');
        }
    };

    type ActionItem = {
        icon: typeof Share2;
        label: string;
        onClick: () => void;
        href?: string;
    };

    const actions: ActionItem[] = [
        {
            icon: Share2,
            label: locale === 'da' ? 'Del med en ven' : 'Share with a friend',
            onClick: handleShare,
        },
        {
            icon: Heart,
            label: locale === 'da' ? 'Anbefal' : 'Recommend',
            onClick: () => { },
        },
        {
            icon: UserPlus,
            label: `${locale === 'da' ? 'Følg' : 'Follow'} ${authorName}`,
            onClick: () => { },
        },
        {
            icon: Bookmark,
            label: locale === 'da' ? 'Gem til senere' : 'Save for later',
            onClick: () => { },
        },
    ];

    // Add series link if part of a series
    if (seriesSlug) {
        actions.push({
            icon: Layers,
            label: locale === 'da' ? 'Se serie' : 'View series',
            onClick: () => { },
            href: `/${locale}/series/${seriesSlug}`,
        });
    }

    return (
        <div className="action-block">
            <div className="action-block__divider" />
            <nav className="action-block__list" aria-label={locale === 'da' ? 'Handlinger' : 'Actions'}>
                {actions.map((action, index) => (
                    action.href ? (
                        <Link
                            key={index}
                            href={action.href}
                            className="action-block__item relative"
                        >
                            <action.icon className="action-block__icon" strokeWidth={1.5} />
                            <span className="action-block__label">{action.label}</span>
                        </Link>
                    ) : (
                        <button
                            key={index}
                            className="action-block__item relative"
                            onClick={action.onClick}
                            type="button"
                        >
                            <action.icon className="action-block__icon" strokeWidth={1.5} />
                            <span className="action-block__label">{action.label}</span>
                        </button>
                    )
                ))}
            </nav>
            <div className="action-block__divider" />
        </div>
    );
}
