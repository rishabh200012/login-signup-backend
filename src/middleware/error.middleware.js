const errorHandler = (err, req, res, next) => {
  console.log("inside error middleware");
  const errorStatus = err.statusCode || 500;
  const errorMessage = err.message || "Internal server error";

  res.status(errorStatus).json({
    success: false,
    message: errorMessage,
  });
};

export default errorHandler;
