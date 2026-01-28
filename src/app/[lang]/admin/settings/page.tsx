'use client';

import { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
    const [config, setConfig] = useState({ showFutureArticles: false });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/admin/config')
            .then(res => res.json())
            .then(data => {
                setConfig(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to load config:', err);
                setIsLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');
        try {
            const res = await fetch('/api/admin/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });
            if (res.ok) {
                setMessage('Settings saved successfully!');
            } else {
                setMessage('Failed to save settings.');
            }
        } catch (err) {
            setMessage('Error saving settings.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-8">Loading settings...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Settings</h1>
                <p className="text-gray-500 mt-2">
                    Configure platform behavior and administrative controls.
                </p>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">Content Visibility</h2>
                    <p className="text-sm text-gray-500">
                        Control how future-dated articles are displayed.
                    </p>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                        <div className="space-y-0.5">
                            <label className="text-base font-medium text-gray-900 line-clamp-1">Show Future Articles</label>
                            <p className="text-sm text-gray-500">
                                If enabled, articles with future publish dates will be visible to admins.
                            </p>
                        </div>
                        <div className="flex items-center ml-4">
                            <input
                                type="checkbox"
                                checked={config.showFutureArticles}
                                onChange={(e) => setConfig({ ...config, showFutureArticles: e.target.checked })}
                                className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 gap-4 items-center">
                        {message && (
                            <p className={`text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                                {message}
                            </p>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            {isSaving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
