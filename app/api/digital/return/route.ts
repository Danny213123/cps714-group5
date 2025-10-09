/**
 * API Route: Digital Return
 * POST /api/digital/return - Return digital content
 */

import { NextRequest, NextResponse } from 'next/server';
import { getLoanManager } from '@/lib/loan-singleton';

export async function POST(request: NextRequest) {
  try {
    const loanManager = getLoanManager();
    const body = await request.json();
    const { loanId, userId } = body;

    if (!loanId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify loan belongs to user
    const loan = loanManager.getLoan(loanId);
    if (!loan) {
      return NextResponse.json(
        { success: false, error: 'Loan not found' },
        { status: 404 }
      );
    }

    if (loan.userId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Process return
    const success = await loanManager.returnContent(loanId);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Return failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Content returned successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Return failed' },
      { status: 500 }
    );
  }
}
