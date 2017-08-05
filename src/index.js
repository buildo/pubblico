const { get, post } = require('./http');
const readFileIfExistsSync = require('./readFileIfExistsSync');
const lg = require('./lg');
const configPath = require('./configPath');
const path = require('path');
const config = JSON.parse(readFileIfExistsSync(configPath) || '{}');
const params = require('yargs').argv;
const parseAndModify = require('./parseAndModify');

const {
  mediumApiToken,
  src,
  tags = 'test, pubblico',
  title = 'Pubblico',
  publish: postAsUnlisted,
  personal,
  publication,
  mediumApiToken: mediumApiTokenArg
} = Object.assign({}, config, params);

const getUser = async ({ token }) => {
  return await get('https://api.medium.com/v1/me', {
    token
  });
};

const getUserPublications = async ({ token, userId }) => {
  return await get(`https://api.medium.com/v1/users/${userId}/publications `, {
    token
  });
};

const getPublication = async ({ token, userId }) => {
  const publications = await getUserPublications({ token, userId });
  return publications.find(p => p.url.split('/').includes(publication));
};

const publish = async ({ token, title, tags, srcFile, userId }) => {
  const publishStatus = postAsUnlisted ? 'unlisted' : 'draft';
  const settings = {
    token,
    data: { title, contentFormat: 'markdown', content: srcFile, tags, publishStatus }
  };
  const { data: { url } } = await post(`https://api.medium.com/v1/users/${userId}/posts`, settings);
  return url;
};

const publishToPublication = async ({ token, title, tags, srcFile, publicationId }) => {
  const publishStatus = postAsUnlisted ? 'unlisted' : 'draft';
  const settings = {
    token,
    data: { title, contentFormat: 'markdown', content: srcFile, tags, publishStatus }
  };
  const { data: { url } } = await post(`https://api.medium.com/v1/publications/${publicationId}/posts`, settings);
  return url;
};

const pubblico = async ({
  token,
  title,
  tags: _tags,
  src
}) => {
  if (!token) {
    lg('ERROR! You must set a Medium API token by passing it to pubblico or storing it in a .pubblicorc JSON file. Get one here https://medium.com/me/settings');
    return;
  }
  const _srcFile = readFileIfExistsSync(path.resolve(process.env.PWD, src));
  if (!_srcFile) {
    lg('ERROR! You must pass a valid src path parameter');
    return;
  }
  const srcFile = await parseAndModify(_srcFile);
  const tags = _tags.split(',').map(t => t.trim());
  lg('Tags', tags);
  lg('Title', title);
  const { name: userName, username: userUsername, id: userId } = await getUser({ token });
  lg('Authenticated user:', userName, `<${userUsername}>`);
  if (publication && !personal) {
    const { url: publicationUrl, name: publicationName, id: publicationId } = await getPublication({ token, userId });
    lg('Publish to a publication', publicationName, publicationUrl);
    const publishedPublicationPostUrl = await publishToPublication({ publicationId, token, title, tags, srcFile });
    lg('Published!', publishedPublicationPostUrl);
  } else {
    const publishedPostUrl = await publish({ token, title, tags, srcFile, userId });
    lg('Published!', publishedPostUrl);
  }
};

pubblico({
  token: mediumApiToken || mediumApiTokenArg,
  src,
  tags,
  title
});