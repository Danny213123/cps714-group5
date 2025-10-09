/**
 * API Route: Digital Checkout
 * POST /api/digital/checkout - Checkout digital content
 */

import { NextRequest, NextResponse } from 'next/server';
import { LoanRules } from '@/lib/loan-management';
import { getLoanManager } from '@/lib/loan-singleton';
import { CheckoutRequest } from '@/types/digital-content';

export async function POST(request: NextRequest) {
  try {
    const loanManager = getLoanManager();
    const body: CheckoutRequest = await request.json();
    const { contentId, userId, loanPeriodDays } = body;

    // Validate request
    if (!contentId || !userId || !loanPeriodDays) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check loan period validity
    if (!LoanRules.isValidLoanPeriod(loanPeriodDays)) {
      return NextResponse.json(
        {
          success: false,
          error: `Loan period must be between ${LoanRules.MIN_LOAN_PERIOD_DAYS} and ${LoanRules.MAX_LOAN_PERIOD_DAYS} days`,
        },
        { status: 400 }
      );
    }

    // Check concurrent loan limit
    if (!LoanRules.canCheckout(userId, loanManager)) {
      return NextResponse.json(
        {
          success: false,
          error: `Maximum concurrent loans (${LoanRules.MAX_CONCURRENT_LOANS}) reached`,
        },
        { status: 400 }
      );
    }

    // Process checkout
    const result = await loanManager.checkoutContent(body);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    // Return result with instruction to persist to localStorage
    return NextResponse.json({
      ...result,
      persistToStorage: true,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Checkout failed' },
      { status: 500 }
    );
  }
}
