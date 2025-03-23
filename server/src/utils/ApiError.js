const ApiError = (
  statusCode,
  message = "Something went wrong",
  errors = []
) => {
  const error = Object.create(Error.prototype); // Make it behave like an Error
  error.statusCode = statusCode;
  error.message = message;
  error.success = false;
  error.errors = errors;
  error.stack = new Error().stack; // Capture stack trace

  return error;
};

export { ApiError };

// const ApiError = (
//   statusCode,
//   message = "Something went wrong",
//   errors = [],
//   stack = ""
// ) => {
//   return {
//     statusCode,
//     success: false,
//     message,
//     errors,
//     stack: stack || new Error().stack,
//   };
// };

// export { ApiError };

// class ApiError extends Error {
//   constructor(
//     statusCode,
//     message = "Something went wrong",
//     errors = [],
//     stack = ""
//   ) {
//     // console.log("API ERROR", statusCode, message, errors, stack);

//     super(message);
//     this.statusCode = statusCode;
//     this.data = null;
//     this.message = message;
//     this.success = false;
//     this.errors = errors;

//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// export { ApiError };
