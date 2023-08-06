export const getPagination = (page: number, size: number) => {
  const limit: number = size ? +size : 10
  const offset: number = page ? page * limit : 0

  return { limit, offset }
}
export function validatePagination(pageCount: number, perPageData: number): [number, number] {
  const page: number = pageCount || 1
  const perPage: number = perPageData || 10

  return [page, perPage]
}

export const getPagingData = (total: number, page: number, limit: number) => {

  const currentPage: number = page ? +page : 0
  const totalPages: number = Math.ceil(total / limit)

  return { total, totalPages, currentPage, perPage: limit }
}
