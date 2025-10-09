/**
 * API Route: Reading List
 * GET /api/digital/reading-list - Get user's reading list
 * POST /api/digital/reading-list - Add item to reading list
 * DELETE /api/digital/reading-list - Remove item from reading list
 */

import { NextRequest, NextResponse } from 'next/server';
import { ReadingListManager } from '@/lib/reading-list';
import { getCatalogManager } from '@/lib/catalog-singleton';

const catalogManager = getCatalogManager();
const readingListManager = new ReadingListManager(catalogManager);

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    const withDetails = request.nextUrl.searchParams.get('withDetails') === 'true';

    if (withDetails) {
      const items = readingListManager.getReadingListWithDetails(userId);
      return NextResponse.json({
        success: true,
        count: items.length,
        items,
      });
    } else {
      const list = readingListManager.getUserReadingList(userId);
      const items = list.getUserItems(userId);
      return NextResponse.json({
        success: true,
        count: items.length,
        items,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reading list' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, contentId, isDigital, notes } = body;

    if (!userId || !contentId || isDigital === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const item = readingListManager.addToReadingList(
      userId,
      contentId,
      isDigital,
      notes
    );

    return NextResponse.json({
      success: true,
      item,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add to reading list' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, itemId } = body;

    if (!userId || !itemId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const success = readingListManager.removeFromReadingList(userId, itemId);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Item removed from reading list',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to remove from reading list' },
      { status: 500 }
    );
  }
}
