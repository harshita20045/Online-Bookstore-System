import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Online Bookstore System API',
      version: '1.0.0',
      description: 'API documentation for Online Bookstore System',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API v1',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
      schemas: {
        Book: {
          type: 'object',
          required: ['title', 'author', 'price'],
          properties: {
            _id: {
              type: 'string',
              description: 'Book ID',
              example: '507f1f77bcf86cd799439011',
            },
            title: {
              type: 'string',
              maxLength: 200,
              description: 'Book title',
              example: 'The Great Gatsby',
            },
            author: {
              type: 'string',
              description: 'Author name',
              example: 'F. Scott Fitzgerald',
            },
            description: {
              type: 'string',
              maxLength: 2000,
              description: 'Book description',
              example: 'A classic American novel set in the Jazz Age',
            },
            publisher: {
              type: 'string',
              description: 'Publisher name',
              example: 'Scribner',
            },
            language: {
              type: 'string',
              default: 'English',
              description: 'Book language',
              example: 'English',
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Book price',
              example: 15.99,
            },
            totalReviews: {
              type: 'number',
              default: 0,
              minimum: 0,
              description: 'Total number of reviews',
              example: 42,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        BookInput: {
          type: 'object',
          required: ['title', 'author', 'price'],
          properties: {
            title: {
              type: 'string',
              maxLength: 200,
              description: 'Book title',
              example: 'The Great Gatsby',
            },
            author: {
              type: 'string',
              description: 'Author name',
              example: 'F. Scott Fitzgerald',
            },
            description: {
              type: 'string',
              maxLength: 2000,
              description: 'Book description',
              example: 'A classic American novel set in the Jazz Age',
            },
            publisher: {
              type: 'string',
              description: 'Publisher name',
              example: 'Scribner',
            },
            language: {
              type: 'string',
              description: 'Book language',
              example: 'English',
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Book price',
              example: 15.99,
            },
          },
        },
        User: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439011',
            },
            firstName: {
              type: 'string',
              description: 'First name',
              example: 'John',
            },
            lastName: {
              type: 'string',
              description: 'Last name',
              example: 'Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address',
              example: 'john.doe@example.com',
            },
            phone: {
              type: 'string',
              description: 'Phone number',
              example: '+1234567890',
            },
            address: {
              type: 'object',
              properties: {
                street: {
                  type: 'string',
                  example: '123 Main St',
                },
                city: {
                  type: 'string',
                  example: 'New York',
                },
                state: {
                  type: 'string',
                  example: 'NY',
                },
                zipCode: {
                  type: 'string',
                  example: '10001',
                },
                country: {
                  type: 'string',
                  example: 'USA',
                },
              },
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              default: 'user',
              description: 'User role',
              example: 'user',
            },
            isActive: {
              type: 'boolean',
              default: true,
              description: 'User active status',
              example: true,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        UserRegistration: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password'],
          properties: {
            firstName: {
              type: 'string',
              description: 'First name',
              example: 'John',
            },
            lastName: {
              type: 'string',
              description: 'Last name',
              example: 'Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address',
              example: 'john.doe@example.com',
            },
            password: {
              type: 'string',
              minLength: 8,
              description: 'Password (minimum 8 characters)',
              example: 'SecurePassword123',
            },
            phone: {
              type: 'string',
              description: 'Phone number',
              example: '+1234567890',
            },
            address: {
              type: 'object',
              properties: {
                street: {
                  type: 'string',
                  example: '123 Main St',
                },
                city: {
                  type: 'string',
                  example: 'New York',
                },
                state: {
                  type: 'string',
                  example: 'NY',
                },
                zipCode: {
                  type: 'string',
                  example: '10001',
                },
                country: {
                  type: 'string',
                  example: 'USA',
                },
              },
            },
          },
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address',
              example: 'john.doe@example.com',
            },
            password: {
              type: 'string',
              description: 'Password',
              example: 'SecurePassword123',
            },
          },
        },
        CartItem: {
          type: 'object',
          properties: {
            book: {
              type: 'string',
              description: 'Book ID',
              example: '507f1f77bcf86cd799439011',
            },
            quantity: {
              type: 'number',
              minimum: 1,
              default: 1,
              description: 'Quantity',
              example: 2,
            },
            unitPrice: {
              type: 'number',
              minimum: 0,
              description: 'Unit price',
              example: 15.99,
            },
          },
        },
        Cart: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Cart ID',
              example: '507f1f77bcf86cd799439011',
            },
            userId: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439012',
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/CartItem',
              },
            },
          },
        },
        AddToCartInput: {
          type: 'object',
          required: ['userId', 'bookId', 'quantity'],
          properties: {
            userId: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439012',
            },
            bookId: {
              type: 'string',
              description: 'Book ID',
              example: '507f1f77bcf86cd799439011',
            },
            quantity: {
              type: 'number',
              minimum: 1,
              description: 'Quantity',
              example: 2,
            },
          },
        },
        UpdateCartInput: {
          type: 'object',
          required: ['userId', 'bookId', 'quantity'],
          properties: {
            userId: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439012',
            },
            bookId: {
              type: 'string',
              description: 'Book ID',
              example: '507f1f77bcf86cd799439011',
            },
            quantity: {
              type: 'number',
              minimum: 1,
              description: 'New quantity',
              example: 3,
            },
          },
        },
        OrderItem: {
          type: 'object',
          properties: {
            bookId: {
              type: 'string',
              description: 'Book ID',
              example: '507f1f77bcf86cd799439011',
            },
            quantity: {
              type: 'number',
              minimum: 1,
              description: 'Quantity',
              example: 2,
            },
            unitPrice: {
              type: 'number',
              minimum: 0,
              description: 'Unit price',
              example: 15.99,
            },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Order ID',
              example: '507f1f77bcf86cd799439011',
            },
            userId: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439012',
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/OrderItem',
              },
            },
            totalAmount: {
              type: 'number',
              description: 'Total order amount',
              example: 45.97,
            },
            status: {
              type: 'string',
              enum: ['pending', 'shipped', 'delivered', 'cancelled'],
              default: 'pending',
              description: 'Order status',
              example: 'pending',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        CreateOrderInput: {
          type: 'object',
          required: ['userId', 'items', 'totalAmount'],
          properties: {
            userId: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439012',
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/OrderItem',
              },
            },
            totalAmount: {
              type: 'number',
              description: 'Total order amount',
              example: 45.97,
            },
          },
        },
        UpdateOrderStatusInput: {
          type: 'object',
          required: ['status'],
          properties: {
            status: {
              type: 'string',
              enum: ['pending', 'shipped', 'delivered', 'cancelled'],
              description: 'New order status',
              example: 'shipped',
            },
          },
        },
        Review: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Review ID',
              example: '507f1f77bcf86cd799439011',
            },
            user: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439012',
            },
            book: {
              type: 'string',
              description: 'Book ID',
              example: '507f1f77bcf86cd799439013',
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Rating (1-5)',
              example: 5,
            },
            comment: {
              type: 'string',
              maxLength: 1000,
              description: 'Review comment',
              example: 'Excellent book! Highly recommended.',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        CreateReviewInput: {
          type: 'object',
          required: ['user', 'book', 'rating'],
          properties: {
            user: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439012',
            },
            book: {
              type: 'string',
              description: 'Book ID',
              example: '507f1f77bcf86cd799439013',
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Rating (1-5)',
              example: 5,
            },
            comment: {
              type: 'string',
              maxLength: 1000,
              description: 'Review comment',
              example: 'Excellent book! Highly recommended.',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
              example: 'An error occurred',
            },
            error: {
              type: 'string',
              description: 'Error details',
            },
          },
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Success message',
              example: 'Operation completed successfully',
            },
            data: {
              type: 'object',
              description: 'Response data',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Books',
        description: 'Book management endpoints',
      },
      {
        name: 'Users',
        description: 'User management and authentication endpoints',
      },
      {
        name: 'Cart',
        description: 'Shopping cart management endpoints',
      },
      {
        name: 'Orders',
        description: 'Order management endpoints',
      },
      {
        name: 'Reviews',
        description: 'Book review endpoints',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
