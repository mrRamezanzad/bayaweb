exports.parseArray = (stringifiedArray) => JSON.parse(stringifiedArray.replace(/\'/g, "\""))