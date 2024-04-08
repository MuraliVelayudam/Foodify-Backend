const handleDuplicateKeyError = (err, req, res, next) => {
  if (err.code === 11000 && err.keyPattern && err.keyValue) {
    const key = Object.keys(err.keyPattern)[0];
    const value = err.keyValue[key];

    return res.status(400).json({
      status: "Fail",
      error: `${value} already exists.`,
    });
  }

  next(err);
};

module.exports = handleDuplicateKeyError;
