export const PAGINATION_ORDER = {
  asc: "asc",
  desc: "desc",
} as const;

export type PaginationOrder = typeof PAGINATION_ORDER[keyof typeof PAGINATION_ORDER];