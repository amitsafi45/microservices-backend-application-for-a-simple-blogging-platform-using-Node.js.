export class PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;

  constructor(
    data: T[],
    total: number,
    page: number,
    perPage: number,
    totalPages: number
  ) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.perPage = perPage;
    this.totalPages = totalPages;
  }
}

