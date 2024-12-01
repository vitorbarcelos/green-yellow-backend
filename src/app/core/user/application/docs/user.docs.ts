export const UserResponses = {
  create: {
    Ok: {
      status: 201,
      description: 'User successfully created.',
      schema: {
        example: {
          isAdministrator: false,
          displayName: "João",
          createdAt: "2024-11-29T18:00:00.000Z",
          firstName: "João",
          updatedAt: null,
          lastName: "Gomes",
          isBasic: true,
          active: true,
          email: "joao.gomes@example.com",
          phone: "+55 (82) 98888-8888",
          role: "basic",
          id: 2
        },
      },
    },
  },
  findAll: {
    Ok: {
      status: 200,
      description: 'Users successfully retrieved.',
      schema: {
        example: {
          pageNumber: 1,
          totalPages: 1,
          numResults: 1,
          maxResults: 25,
          items: [
            {
              isAdministrator: false,
              displayName: "João",
              createdAt: "2024-11-29T18:00:00.000Z",
              firstName: "João",
              updatedAt: null,
              lastName: "Gomes",
              isBasic: true,
              active: true,
              email: "joao.gomes@example.com",
              phone: "+55 (82) 98888-8888",
              role: "basic",
              id: 2
            }
          ],
        }
      },
    },
  },
  findProfile: {
    Ok: {
      status: 200,
      description: 'User profile successfully retrieved.',
      schema: {
        example: {
          isAdministrator: true,
          displayName: "Edu",
          createdAt: "2024-11-29T18:00:00.000Z",
          firstName: "Eduarda",
          updatedAt: null,
          lastName: "Diniz",
          isBasic: false,
          active: true,
          email: "eduarda.diniz@example.com",
          phone: "+55 (82) 99999-9999",
          role: "admin",
          id: 1
        },
      },
    },
  },
  updateProfile: {
    Ok: {
      status: 200,
      description: 'User profile successfully updated.',
      schema: {
        example: {
          isAdministrator: true,
          displayName: "Edu",
          createdAt: "2024-11-29T18:00:00.000Z",
          firstName: "Eduarda",
          updatedAt: "2024-11-29T18:00:00.000Z",
          lastName: "Diniz",
          isBasic: false,
          active: true,
          email: "eduarda.diniz@example.com",
          phone: "+55 (82) 99999-9999",
          role: "admin",
          id: 1
        },
      },
    },
  },
  deleteProfile: {
    Ok: {
      status: 200,
      description: 'User profile successfully deleted.',
      schema: {
        example: {
          isAdministrator: true,
          displayName: "Edu",
          createdAt: "2024-11-29T18:00:00.000Z",
          firstName: "Eduarda",
          updatedAt: "2024-11-29T18:00:00.000Z",
          lastName: "Diniz",
          isBasic: false,
          active: true,
          email: "eduarda.diniz@example.com",
          phone: "+55 (82) 99999-9999",
          role: "admin",
          id: 1
        },
      },
    },
  },
  findById: {
    Ok: {
      status: 200,
      description: 'User details successfully retrieved by ID.',
      schema: {
        example: {
          isAdministrator: false,
          displayName: "João",
          createdAt: "2024-11-29T18:00:00.000Z",
          firstName: "João",
          updatedAt: null,
          lastName: "Gomes",
          isBasic: true,
          active: true,
          email: "joao.gomes@example.com",
          phone: "+55 (82) 98888-8888",
          role: "basic",
          id: 2
        },
      },
    },
  },
  updateById: {
    Ok: {
      status: 200,
      description: 'User details successfully updated by ID.',
      schema: {
        example: {
          isAdministrator: false,
          displayName: "João",
          createdAt: "2024-11-29T18:00:00.000Z",
          firstName: "João",
          updatedAt: "2024-11-29T18:00:00.000Z",
          lastName: "Gomes",
          isBasic: true,
          active: true,
          email: "joao.gomes@example.com",
          phone: "+55 (82) 98888-8888",
          role: "basic",
          id: 2
        },
      },
    },
  },
  deleteById: {
    Ok: {
      status: 200,
      description: 'User successfully deleted by ID.',
      schema: {
        example: {
          isAdministrator: false,
          displayName: "João",
          createdAt: "2024-11-29T18:00:00.000Z",
          firstName: "João",
          updatedAt: "2024-11-29T18:00:00.000Z",
          lastName: "Gomes",
          isBasic: true,
          active: true,
          email: "joao.gomes@example.com",
          phone: "+55 (82) 98888-8888",
          role: "basic",
          id: 2
        },
      },
    },
  },
};
