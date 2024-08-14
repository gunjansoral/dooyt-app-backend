require('dotenv').config();

const { BACKEND_URL } = process.env;

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Space Management API',
      version: '1.0.0',
      description: 'API documentation for managing spaces, users, and related entities',
    },
    servers: [
      {
        url: `${BACKEND_URL}/api/v1`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Space: {
          type: 'object',
          required: ['name', 'category'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated ID of the space'
            },
            name: {
              type: 'string',
              description: 'The name of the space'
            },
            description: {
              type: 'string',
              description: 'A brief description of the space'
            },
            location: {
              type: 'string',
              description: 'The location of the space'
            },
            category: {
              type: 'string',
              description: 'The category of the space',
              enum: ['Office', 'Event', 'Retail', 'Co-Working', 'Other']
            },
            followers: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'List of users following the space'
            },
            status: {
              type: 'string',
              description: 'The status of the space',
              enum: ['Active', 'Inactive'],
              default: 'Active'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the space was created'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the space was last updated'
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },

  apis: ['./routes/*.js'], // Path to the API docs (adjust the path as needed)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
