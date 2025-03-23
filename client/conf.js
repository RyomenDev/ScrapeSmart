// This file is responsible for loading environment variables and ensuring that required ones are present.

const requiredEnvVars = ["VITE_SERVER_URL"];

// Check for missing environment variables
requiredEnvVars.forEach((key) => {
  if (!import.meta.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1); // Exit process if a required env variable is missing
  }
});

const conf = {
  SERVER_URL: String(import.meta.env.VITE_SERVER_URL),
};

export default conf;
