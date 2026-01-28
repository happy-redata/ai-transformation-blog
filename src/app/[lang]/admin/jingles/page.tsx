'use client';

import { useState } from 'react';

type Jingle = {
    id: string;
    name: string;
    filename: string;
    duration: string;
    category: string;
};

// Mock data - in a real app this would come from an API listing files in public/audio
const JINGLES: Jingle[] = [
    { id: '1', name: 'Intro Theme', filename: 'intro.wav', duration: '0:02', category: 'Theme' },
    { id: '2', name: 'Outro Theme', filename: 'outro.wav', duration: '0:02', category: 'Theme' },
    { id: '3', name: 'Success Ding', filename: 'success.wav', duration: '0:01', category: 'Effect' },
    { id: '4', name: 'Error Buzz', filename: 'error.wav', duration: '0:01', category: 'Effect' },
    { id: '5', name: 'Transition Swoosh', filename: 'swoosh.wav', duration: '0:01', category: 'Transition' },
];

export default function JinglesPage() {
    const [playing, setPlaying] = useState<string | null>(null);

    const playSound = (filename: string) => {
        // Stop currently playing
        if (playing) {
            const audio = document.getElementById(`audio-${playing}`) as HTMLAudioElement;
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        }

        // Play new sound
        if (playing !== filename) {
            const audio = document.getElementById(`audio-${filename}`) as HTMLAudioElement;
            if (audio) {
                audio.play();
                setPlaying(filename);
                audio.onended = () => setPlaying(null);
            }
        } else {
            setPlaying(null);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Jingles & Sounds</h1>
                    <p className="text-gray-500 mt-1">Manage audio assets for the blog</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Upload New
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600">Name</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Category</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Duration</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {JINGLES.map((jingle) => (
                            <tr key={jingle.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{jingle.name}</p>
                                            <p className="text-sm text-gray-500">{jingle.filename}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {jingle.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 font-mono text-sm">
                                    {jingle.duration}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <audio id={`audio-${jingle.filename}`} src={`/audio/${jingle.filename}`} />

                                        <button
                                            onClick={() => playSound(jingle.filename)}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${playing === jingle.filename
                                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                                                }`}
                                            title={playing === jingle.filename ? "Stop" : "Play"}
                                        >
                                            {playing === jingle.filename ? (
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            )}
                                        </button>

                                        <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors" title="Edit">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>

                                        <button className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors" title="Delete">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
