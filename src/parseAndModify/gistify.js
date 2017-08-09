const { post } = require('../http');
const blockCodeRe = /```([a-z]*)\n([\s\S]*?)\n```/g;
const blockCodePlaceholder = 'bH9IDSD1p7CK';
const blockCodePlaceholderRe = new RegExp(blockCodePlaceholder, 'g');


const createGist = async ({ codeString, _ext }) => {
  const ext = _ext ? `.${_ext}` : '';
  try {
    const { id } = await post('https://api.github.com/gists', {
      data: { files: { [`snippet${ext}`]: { content: codeString } } }
    });
    return id;
  } catch (err) {
    console.log({ err }); // eslint-disable-line no-console
  }
};

const embedGist = (id) => `<script src="https://gist.github.com/anonymous/${id}.js"></script>`;

module.exports = async (articleString) => {
  const blockCodes = [];
  const tempArticleString = articleString
    .replace(blockCodeRe, (_, _ext, codeString) => { blockCodes.push({ codeString, _ext }); return blockCodePlaceholder; });
  const ids = await Promise.all(blockCodes.map(createGist));
  const embeds = ids.map(embedGist);
  return tempArticleString.replace(blockCodePlaceholderRe, () => embeds.shift());
};