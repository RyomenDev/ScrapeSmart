

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      if (err && typeof err === "object" && "statusCode" in err) {
        console.error(`🔥 API ERROR:
          Status Code: ${err.statusCode}
          Message: ${err.message}
          Errors: ${JSON.stringify(err.errors)}
          Stack: ${err.stack}
        `);
      } else {
        console.error("🔥 UNEXPECTED ERROR:", err);
      }
      next(err);
    });
  };
};

export { asyncHandler };
