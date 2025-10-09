# Digital Content & E-Book Lending Platform

A Next.js-based skeleton system for managing digital content lending in a library system.

## Installation

```shell

npm install

# dev
npm run dev

# build
npm run build
npm start -- -p [port]
```

## Overview

This system provides comprehensive digital content management with the following features:

- **E-Book Catalog**: Browse and search digital content (PDFs, ePubs, Audiobooks)
- **Borrow & Download**: Check out digital items with automatic expiration
- **Reading List**: Save digital and physical books for later
- **DRM Protection**: Support for Adobe DRM, Overdrive, and custom DRM
- **User Dashboard**: Track checked-out items with countdown timers
- **Provider Integration**: Connect to external providers like Overdrive

## Project Structure

```
├── types/
│   └── digital-content.ts          # TypeScript type definitions
├── lib/
│   ├── digital-catalog.ts          # Catalog management classes
│   ├── loan-management.ts          # Checkout and loan handling
│   ├── reading-list.ts             # Reading list management
│   ├── drm-access-control.ts       # DRM and access control
│   └── integration-interfaces.ts   # Core system integration
├── app/api/digital/
│   ├── catalog/route.ts            # Catalog API endpoints
│   ├── checkout/route.ts           # Checkout API
│   ├── return/route.ts             # Return API
│   ├── loans/[userId]/route.ts     # User loans API
│   ├── reading-list/route.ts       # Reading list API
│   └── download/[loanId]/route.ts  # Download API
└── components/
    ├── DigitalCatalog.tsx          # Catalog browsing UI
    ├── UserDashboard.tsx           # User dashboard with loans
    ├── ReadingList.tsx             # Reading list UI
    └── CheckoutModal.tsx           # Checkout flow UI
```

## Core Classes

### Catalog Management

- `DigitalContent` - Base class for digital items
- `EBook` - E-book specific implementation
- `AudioBook` - Audiobook implementation
- `DigitalCatalogManager` - Manages the digital catalog
- `ProviderIntegration` - Base class for external providers
- `OverdriveIntegration` - Overdrive API integration

### Loan Management

- `DigitalLoanManager` - Handles checkout/return operations
- `LoanRules` - Defines loan policies and limits
- Auto-expiration scheduling for digital loans

### Reading List

- `ReadingList` - User's saved items
- `ReadingListManager` - Manages reading lists
- Support for both digital and physical items

### DRM & Access Control

- `DRMController` - Token generation and validation
- `AdobeDRMHandler` - Adobe DRM integration
- `CustomDRMHandler` - Custom encryption
- `AccessControlManager` - Authorization workflow

### Integration Interfaces

- `UnifiedCatalogManager` - Combines physical + digital catalogs
- `UnifiedLoanManager` - Handles all loan types
- `DashboardManager` - Dashboard data aggregation

## API Routes

### GET `/api/digital/catalog`
Search and browse digital catalog
- Query params: `query`, `format`, `author`, `genre`, `availableOnly`

### POST `/api/digital/checkout`
Checkout digital content
- Body: `{ contentId, userId, loanPeriodDays }`

### POST `/api/digital/return`
Return digital content early
- Body: `{ loanId, userId }`

### GET `/api/digital/loans/[userId]`
Get user's active loans
- Query params: `activeOnly=true`

### GET/POST/DELETE `/api/digital/reading-list`
Manage reading list items

### GET `/api/digital/download/[loanId]`
Download authorized content
- Query params: `token`

## Key Features

### Automatic Returns
Digital items automatically expire after the loan period using scheduled timers.

### DRM Protection
Multiple DRM types supported:
- Adobe DRM (ACSM fulfillment)
- Overdrive integration
- Custom encryption
- No DRM (direct download)

### Time-Limited Access
Access tokens expire automatically, revoking download access when loans end.

### Integration Points

#### Main Catalog (Sub-project 2)
- `UnifiedCatalogManager` merges physical and digital items
- Digital items appear seamlessly alongside physical books

#### Loan Management (Sub-project 5)
- `UnifiedLoanManager` handles both loan types
- Checkout rules extended for digital-specific policies

#### User Dashboard (Sub-project 4)
- `DashboardManager` provides unified view
- Displays countdown timers for digital loans
- Shows alerts for expiring items

## Usage Example

```typescript
// Initialize system
const catalogManager = new DigitalCatalogManager();
const loanManager = new DigitalLoanManager(catalogManager);
const readingListManager = new ReadingListManager(catalogManager);

// Add content to catalog
const ebook = new EBook(metadata);
catalogManager.addContent(ebook);

// Checkout content
const result = await loanManager.checkoutContent({
  contentId: 'ebook-123',
  userId: 'user-456',
  loanPeriodDays: 14
});

// Add to reading list
readingListManager.addToReadingList(
  'user-456',
  'ebook-789',
  true, // isDigital
  'Must read this!'
);
```

## Loan Rules

- Max concurrent loans: 10 per user
- Loan period: 1-21 days
- Max renewals: 2
- Automatic return on expiration

## Next Steps

1. Implement database persistence (currently in-memory)
2. Add authentication/authorization
3. Complete provider integrations (Overdrive, etc.)
4. Implement actual file storage and streaming
5. Add full DRM encryption/decryption
6. Create admin interface for catalog management
7. Add analytics and usage tracking
