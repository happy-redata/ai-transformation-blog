import { NextResponse } from 'next/server';
import { getAdminConfig, saveAdminConfig } from '@/lib/cms';

export async function GET() {
    const config = getAdminConfig();
    return NextResponse.json(config);
}

export async function POST(request: Request) {
    try {
        const config = await request.json();
        saveAdminConfig(config);
        return NextResponse.json({ success: true, config });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
    }
}
