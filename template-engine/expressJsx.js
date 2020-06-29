const fs = require('fs');

const getKeysFromOptions = (options) => {
  const { settings, _locals, ...objectKeys } = options;

  return Object.keys(objectKeys);
};

const getRenderedContent = (content, optionsObj) => {
  const keys = getKeysFromOptions(optionsObj);
  let contentString = content.toString();

  for (let key of keys) {
    contentString = contentString.replace(
      new RegExp(`\{${key}\}`, 'gi'),
      optionsObj[key]
    )
  }

  return contentString;
};

function expressJsx(filePath, options, callback) {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err, null);

    const rendered = getRenderedContent(content, options);
    return callback(null, rendered)
  })
}

module.exports = expressJsx;
