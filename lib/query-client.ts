import { QueryClient } from '@tanstack/react-query';

const KC_LISTING_STALE_MS = 5 * 60 * 1000; // 5 minutes – same scope+cmcd won't refetch when navigating back
const KC_SESSION_FILTERS_STALE_MS = 5 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: KC_LISTING_STALE_MS,
      gcTime: 10 * 60 * 1000, // 10 min (formerly cacheTime)
    },
  },
});

export const KC_QUERY_KEYS = {
  products: (cmcd: string, scope: string, filtersSignature: string) =>
    ['kc-products', cmcd, scope, filtersSignature] as const,
  cart: (cmcd: string, odChr: string) => ['kc-cart', cmcd, odChr] as const,
  voucher: (cmcd: string, voucherNoKey: string) => ['kc-voucher', cmcd, voucherNoKey] as const,
  sessionFilters: (cmcd: string) => ['kc-session-filters', cmcd] as const,
};
