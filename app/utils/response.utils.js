module.exports.success = (res, data, code = 200) => {
  const sendData = { success: true };
  res.statusCode = code;
  if (typeof data === 'object') {
    sendData.data = data;
  }
  return res.json(sendData);
};

module.exports.error = (res, err, code) => {
  const error = {};
  if (typeof err === 'object' && typeof err.message !== 'undefined') {
    error.data = { error: err.message };
  }
  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json({ success: false, error });
};
