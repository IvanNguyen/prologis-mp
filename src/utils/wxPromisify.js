const wxPromisify = ({ data = {}, method }) => new Promise((resolve, reject) => {
  wx[method]({
    ...data,
    success: resolve,
    fail: reject,
  });
});

export default wxPromisify;
