const { get, post } = require('./http');
const { readFileSync } = require('fs');
const lg = require('./lg');


const { mediumApiToken, publication } = require('./config.json');
const {
  src: srcPath = './README.md',
  tags = 'test, pubblico',
  title = 'Pubblico',
  publish: postAsUnlisted,
  personal,
  publication: publicationArg
} = require('yargs').argv;

const srcFile = readFileSync(srcPath, 'utf8');

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
  return publications.find(p => p.url.split('/').includes(publicationArg || publication));
};

const publish = async ({ token, title, tags, src, userId }) => {
  return await post(`https://api.medium.com/v1/users/${userId}/posts`, {
    token,
    data: {
      title,
      contentFormat: 'markdown',
      content: src,
      tags,
      publishStatus: postAsUnlisted ? 'unlisted' : 'draft'
    }
  });
};

const publishToPublication = async ({ token, title, tags, src, publicationId }) => {
  return await post(`https://api.medium.com/v1/publications/${publicationId}/posts`, {
    token,
    data: {
      title,
      contentFormat: 'markdown',
      content: src,
      tags,
      publishStatus: postAsUnlisted ? 'unlisted' : 'draft'
    }
  });
};

const pubblico = async ({
  token,
  title,
  tags: _tags,
  src
}) => {
  const { name: userName, username: userUsername, id: userId } = await getUser({ token });
  lg('Authenticated user:', userName, `<${userUsername}>`);
  const tags = _tags.split(',').map(t => t.trim());
  lg('Tags', tags);
  if ((publicationArg || publication) && !personal) {
    const { url: publicationUrl, name: publicationName, id: publicationId } = await getPublication({ token, userId });
    lg('Publish to a publication', publicationName, publicationUrl);
    const publishedPublicationPost = await publishToPublication({ publicationId, token, title, tags, src });
    lg('published!', publishedPublicationPost.url);
  } else {
    const publishedPost = await publish({ token, title, tags, src, userId });
    lg('published!', publishedPost.url);
  }
};

pubblico({
  token: mediumApiToken,
  src: srcFile,
  tags,
  title
});