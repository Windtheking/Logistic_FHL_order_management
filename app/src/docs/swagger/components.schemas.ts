// Centralized Swagger schemas for the API
export const swaggerSchemas = {
    RegisterDto: {
        type: "object",
        required: ["username", "password", "fullname", "email", "birth_date", "phone", "gender_id"],
        properties: {
            username: { type: "string", description: "Unique username for the seller", example: "davidmtz" },
            password: { type: "string", description: "Seller password (will be hashed)", example: "TestSecure_pass123=$3" },
            fullname: { type: "string", description: "Full name of the seller", example: "David Martinez" },
            email: { type: "string", format: "email", description: "Unique email address", example: "david@example.com" },
            gender_id: { type: "integer", description: "Gender ID (foreign key)", example: 1 },
            birth_date: { type: "string", format: "date", description: "Date in YYYY-MM-DD format only", example: "2002-09-23" },
            phone: { type: "string", description: "Seller's phone number (optional)", example: "3124567890" }
        }
    },
    LoginDto: {
        type: "object",
        required: ["username", "password"],
        properties: {
            username: { type: "string", description: "Seller username", example: "davidmtz" },
            password: { type: "string", description: "Seller password", example: "TestSecure_pass123=$3" }
        }
    },
    AuthResponseDto: {
        type: "object",
        properties: {
            token: { type: "string", description: "JWT token for authentication", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
            seller: {
                type: "object",
                properties: {
                    id_seller: { type: "integer", example: 1 },
                    username: { type: "string", example: "davidmtz" },
                    fullname: { type: "string", example: "David Martinez" },
                    email: { type: "string", example: "david@example.com" },
                    gender: {
                        type: "object",
                        properties: {
                            id_gender: { type: "integer", example: 1 },
                            name: { type: "string", example: "Male" }
                        },
                        description: "Gender object with id_gender and name."
                    },
                    role: {
                        type: "object",
                        properties: {
                            id_role: { type: "integer", example: 2 },
                            name: { type: "string", example: "seller" }
                        },
                        description: "Role object with id_role and name."
                    }
                },
                description: "Seller object with gender and role included."
            },
            message: { type: "string", example: "Login successful" }
        }
    },
    RegisterResponseDto: {
        type: "object",
        properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Seller registered successfully" },
            seller: {
                type: "object",
                properties: {
                    id_seller: { type: "integer", example: 1 },
                    username: { type: "string", example: "davidmtz" },
                    fullname: { type: "string", example: "David Martinez" },
                    email: { type: "string", example: "david@example.com" },
                    gender: {
                        type: "object",
                        properties: {
                            id_gender: { type: "integer", example: 1 },
                            name: { type: "string", example: "Male" }
                        },
                        description: "Gender object with id_gender and name."
                    },
                    role: {
                        type: "object",
                        properties: {
                            id_role: { type: "integer", example: 2 },
                            name: { type: "string", example: "seller" }
                        },
                        description: "Role object with id_role and name."
                    }
                },
                description: "Seller object with gender and role included."
            }
        }
    },
    SellerProfileDto: {
        type: "object",
        properties: {
            id_seller: { type: "integer", example: 1 },
            access_id: { type: "integer", example: 10 },
            fullname: { type: "string", example: "David Martinez" },
            phone: { type: "string", description: "Seller's phone number (optional, no country code)", example: "3001112233" },
            email: { type: "string", example: "david@example.com" },
            birth_date: { type: "string", format: "date", example: "1995-05-20" },
            gender: {
                type: "object",
                properties: {
                    id_gender: { type: "integer", example: 1 },
                    name: { type: "string", example: "Male" }
                },
                description: "Gender object with id_gender and name."
            },
            role: {
                type: "object",
                properties: {
                    id_role: { type: "integer", example: 2 },
                    name: { type: "string", example: "seller" }
                },
                description: "Role object with id_role and name."
            }
        }
    },
    ErrorResponseDto: {
        type: "object",
        properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Validation error" },
            errors: {
                type: "object",
                additionalProperties: { type: "string" },
                example: { email: "Email is required" }
            }
        }
    },
    CreateAddressDto: {
        type: "object",
        required: ["country", "department", "city", "postal_code", "street", "number"],
        properties: {
            country: { type: "string", description: "Country where the address is located", example: "Colombia" },
            department: { type: "string", description: "Department or state of the address", example: "Atlántico" },
            city: { type: "string", description: "City of the address", example: "Barranquilla" },
            postal_code: { type: "string", description: "Postal code of the address", example: "080001" },
            street: { type: "string", description: "Street name or avenue", example: "Calle 72" },
            number: { type: "string", description: "House, apartment, or building number", example: "No. 45-10" },
            is_active: { type: "boolean", description: "Whether the address is active (optional, defaults to true)", example: true }
        },
        description: "Data Transfer Object used to create a new address."
    },
    UpdateAddressDto: {
        type: "object",
        properties: {
            country: { type: "string", description: "Country where the address is located", example: "Colombia" },
            department: { type: "string", description: "Department or state of the address", example: "Atlántico" },
            city: { type: "string", description: "City of the address", example: "Barranquilla" },
            postal_code: { type: "string", description: "Postal code of the address", example: "080001" },
            street: { type: "string", description: "Street name or avenue", example: "Calle 72" },
            number: { type: "string", description: "House, apartment, or building number", example: "No. 45-10" },
            is_active: { type: "boolean", description: "Whether the address is active or inactive", example: true }
        },
        description: "Data Transfer Object used to update an existing address. All fields are optional."
    },
    AddressResponseDto: {
        type: "object",
        properties: {
            id_address: { type: "integer", description: "Unique identifier for the address", example: 1 },
            country: { type: "string", description: "Country where the address is located", example: "Colombia" },
            department: { type: "string", description: "Department or state of the address", example: "Atlántico" },
            city: { type: "string", description: "City of the address", example: "Barranquilla" },
            postal_code: { type: "string", description: "Postal code of the address", example: "080001" },
            street: { type: "string", description: "Street name or avenue", example: "Calle 72" },
            number: { type: "string", description: "House, apartment, or building number", example: "No. 45-10" },
            is_active: { type: "boolean", description: "Indicates whether the address is active or inactive", example: true },
            createdAt: { type: "string", format: "date-time", description: "Timestamp when the address was created", example: "2025-10-06T14:23:00.000Z" },
            updatedAt: { type: "string", format: "date-time", description: "Timestamp when the address was last updated", example: "2025-10-06T14:25:30.000Z" }
        },
        description: "Represents a full address record including its creation and update timestamps."
    }
};
