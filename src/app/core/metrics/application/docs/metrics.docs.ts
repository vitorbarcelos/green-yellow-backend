export const MetricsResponses = {
  getMetrics: {
    Ok: {
      status: 200,
      description: 'Successfully retrieved metrics.',
      schema: {
        type: 'object',
        properties: {
          pageNumber: { type: 'integer', example: 1 },
          maxResults: { type: 'integer', example: 25 },
          numResults: { type: 'integer', example: 2 },
          totalPages: { type: 'integer', example: 1 },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                value: { type: 'integer', example: 266 },
                date: { type: 'string', format: 'date', example: '2023-11-21' },
              },
            },
          },
        },
      },
    },
  },
  uploadMetrics: {
    Ok: {
      status: 200,
      description: 'Metrics uploaded successfully.',
      schema: {
        type: 'object',
        properties: {
          createdMetrics: { type: 'integer', example: 93090 },
        },
      },
    },
  },
  exportMetricsReport: {
    Ok: {
      status: 200,
      description: 'Metrics report exported successfully.',
      schema: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};
