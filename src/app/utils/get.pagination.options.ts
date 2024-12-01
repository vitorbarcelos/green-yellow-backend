const DEFAULT_MAX_RESULTS = 50;

type PaginationOptions = {
  pageNumber?: number;
  maxResults?: number;
}

export default function getPaginationOptions(params: PaginationOptions) {
  const $maxResults = typeof params.maxResults === 'number' ? params.maxResults : DEFAULT_MAX_RESULTS;
  const maxResults = $maxResults > DEFAULT_MAX_RESULTS ? DEFAULT_MAX_RESULTS : $maxResults;
  const $pageNumber = typeof params.pageNumber === 'number' && params.pageNumber > 0 ? params.pageNumber : 1;
  const offset = ($pageNumber - 1) * maxResults;
  return {
    pageNumber: $pageNumber,
    maxResults,
    offset,
  };
}