export function isPagination(value: string): boolean {
  return ['pageNumber', 'maxResults'].includes(value);
}
