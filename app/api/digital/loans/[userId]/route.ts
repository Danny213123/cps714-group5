/**
 * API Route: User Loans
 * GET /api/digital/loans/[userId] - Get user's digital loans
 */

import { NextRequest, NextResponse } from 'next/server';
import { getLoanManager } from '@/lib/loan-singleton';
import { getCatalogManager } from '@/lib/catalog-singleton';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const loanManager = getLoanManager();
    const catalogManager = getCatalogManager();
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    const activeOnly = request.nextUrl.searchParams.get('activeOnly') === 'true';

    const loans = activeOnly
      ? loanManager.getActiveUserLoans(userId)
      : loanManager.getUserLoans(userId);

    // Enrich with content details and time remaining
    const enrichedLoans = loans.map((loan) => {
      const content = catalogManager.getContent(loan.contentId);
      const timeRemaining = loanManager.getTimeRemaining(loan.loanId);

      return {
        ...loan,
        contentDetails: content?.getMetadata(),
        timeRemainingMs: timeRemaining,
        daysRemaining: Math.ceil(timeRemaining / (1000 * 60 * 60 * 24)),
      };
    });

    return NextResponse.json({
      success: true,
      count: enrichedLoans.length,
      loans: enrichedLoans,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch loans' },
      { status: 500 }
    );
  }
}
