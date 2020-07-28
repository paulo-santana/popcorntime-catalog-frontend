const actions = {
  POST: () => {
    return 'POST';
  },
  GET: () => {
    return 'GATSUGA';
  },
};

export default (req, res) => {
  res.end(actions[req.method]());
};
