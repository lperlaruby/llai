import { NextResponse } from 'next/server';
import { createCollection, insertPoints, searchPoints } from '@/lib/qdrantClient';

export async function POST(req: Request) {
    try {
        const { action, collectionName, vectorSize, points, vector } = await req.json();

        if (action === 'create') {
            // Create collection
            if (!collectionName || !vectorSize) {
                return NextResponse.json({ error: 'Missing collectionName or vectorSize' }, { status: 400 });
            }
            const result = await createCollection(collectionName, vectorSize);
            return NextResponse.json(result, { status: 200 });

        } else if (action === 'insert') {
            // Insert points into collection
            if (!collectionName || !points || points.length === 0) {
                return NextResponse.json({ error: 'Missing collectionName or points' }, { status: 400 });
            }
            const result = await insertPoints(collectionName, points);
            return NextResponse.json(result, { status: 200 });

        } else if (action === 'search') {
            // Search for points in collection
            if (!collectionName || !vector) {
                return NextResponse.json({ error: 'Missing collectionName or vector' }, { status: 400 });
            }
            const result = await searchPoints(collectionName, vector);
            return NextResponse.json(result, { status: 200 });

        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

    } catch (error: unknown) {
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
