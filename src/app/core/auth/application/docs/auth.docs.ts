export const AuthResponses = {
  rootRegister: {
    Ok: {
      status: 201,
      description: 'Successfully registered user.',
      schema: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'string' },
        },
      },
    },
    NotFound: {
      status: 404,
      description: 'The route is not available or not found.',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Cannot POST /auth/register/bootstrap' },
          error: { type: 'string', example: 'Not Found' },
          statusCode: { type: 'number', example: 404 },
        },
      },
    },
  },
  register: {
    Ok: {
      status: 201,
      description: 'Successfully registered user.',
      schema: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'string' },
        },
      },
    },
  },
  authorize: {
    Ok: {
      status: 200,
      description: 'Authorization successful.',
      schema: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'string' },
        },
      },
    },
  },
};
