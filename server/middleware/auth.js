const auth = (req, res, next) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ message: 'Missing user ID' });
  }
  req.userId = userId;
  next();
};

module.exports = auth;
