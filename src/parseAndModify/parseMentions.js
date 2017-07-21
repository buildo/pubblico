const inlineCodeRe = /(`[^`|^\n|\r]+`)/g;
const blockCodeRe = /(```[a-z]*\n[\s\S]*?\n```)/g;
const inlineCodePlaceholder = '5lreaRWKv6LN';
const inlineCodePlaceholderRe = new RegExp(inlineCodePlaceholder, 'g');
const blockCodePlaceholder = 'kRxOO2NL9fuN';
const blockCodePlaceholderRe = new RegExp(blockCodePlaceholder, 'g');
const mentionRe = /([\s\n\r])@([A-Za-z0-9_.]+)/g;

module.exports = (articleString) => {
  const inlineCodes = [];
  const blockCodes = [];
  return articleString
    .replace(inlineCodeRe, (_, code) => { inlineCodes.push(code); return inlineCodePlaceholder; })
    .replace(blockCodeRe, (_, code) => { blockCodes.push(code); return blockCodePlaceholder; })
    .replace(mentionRe, (_, s, username) => `${s}[@${username}](https://medium.com/@${username})` )
    .replace(inlineCodePlaceholderRe, inlineCodes.shift())
    .replace(blockCodePlaceholderRe, blockCodes.shift());
};