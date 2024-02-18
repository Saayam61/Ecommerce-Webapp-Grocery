// dbConfig.js

/**
 * Database Configuration
 * 
 * This module exports a configuration object for connecting to a MySQL database.
 * It retrieves database connection parameters from environment variables, allowing
 * for flexible configuration based on the deployment environment.
 * 
 * If any required environment variables are missing, the module throws an error.
 */

module.exports = {
    // Database connection parameters
    username: process.env.DB_USERNAME || "root",   // Username for database connection
    password: process.env.DB_PASSWORD || "",        // Password for database connection
    database: process.env.DB_NAME || "ecommerce_db",// Database name
    host: process.env.DB_HOST || "localhost",       // Hostname for the database server
    dialect: "mysql",                               // Dialect of the database management system

    // Connection pool configuration
    pool: {
        max: process.env.DB_POOL_MAX || 10,         // Maximum number of connections in the pool
        min: process.env.DB_POOL_MIN || 0,          // Minimum number of connections in the pool
        idle: process.env.DB_POOL_IDLE || 10000,    // Maximum idle time (in milliseconds) before a connection is released
        acquire: process.env.DB_POOL_ACQUIRE || 30000 // Maximum time (in milliseconds) to wait for a connection from the pool
    }
};

// Error handling
if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_NAME || !process.env.DB_HOST) {
    throw new Error("Missing required environment variables for database connection.");
}
