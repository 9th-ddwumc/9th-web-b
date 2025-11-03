export type CommonResponse = {
  statusCode: number;
  message: string;
  data: any;
};

export type CursorBasedResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
  nextCursor: number;
  hasNext: boolean;
};

export const PAGINATION_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type PaginationOrder = (typeof PAGINATION_ORDER)[keyof typeof PAGINATION_ORDER];

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PaginationOrder;
};
