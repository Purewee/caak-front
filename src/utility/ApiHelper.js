import API from '@aws-amplify/api';
import { graphqlOperation } from '@aws-amplify/api-graphql';
import Storage from '@aws-amplify/storage';
import { useMemo } from 'react';
import { useUser } from '../context/userContext';
import { createFile } from '../graphql-custom/file/mutation';
import { getUser } from '../graphql-custom/user/queries';

/**
 * @param id input of user
 * @param setUser setState of user hook
 * @param {string} authMode defaults AMAZON_COGNITO_USER_POOLS
 */
export const getUserById = async ({ id, setUser, authMode }) => {
  const resp = await API.graphql({
    query: getUser,
    variables: { id },
    authMode: authMode || 'AMAZON_COGNITO_USER_POOLS',
  });
  setUser(resp.data.getUser);
};

export const ApiFileUpload = async (file) => {
  try {
    const fileData = { ...file };
    let fileObj = fileData.obj;
    delete fileData['obj'];
    delete fileData['url'];

    if (!fileData.id) {
      let resp = await API.graphql(graphqlOperation(createFile, { input: fileData }));
      resp = resp.data.createFile;
      await Storage.put(resp.id + '.' + resp.ext, fileObj, {
        contentType: resp.type,
      });
      return resp;
    } else {
      return fileData;
    }
  } catch (ex) {
    console.log(ex);
  }
};

export const useListPager = (params) => {
  const data = params;
  const { isLogged } = useUser();
  let lastToken = null;

  let isFinished = false;

  if (data.nextToken) {
    lastToken = data.nextToken;
  } else {
    if (data.ssr) {
      isFinished = true;
    }
  }

  async function list(qry, limit, items) {
    try {
      let resp = await API.graphql(qry);
      resp = resp.data;
      const key = Object.keys(resp)[0];
      const nextToken = resp[key].nextToken;

      items = [...items, ...resp[key].items];

      if (items.length < limit && nextToken) {
        qry.variables.nextToken = nextToken;
        return await list(qry, limit, items);
      } else {
        if (!nextToken) {
          isFinished = true;
        }
        return { items, nextToken };
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async function next() {
    if (!isFinished) {
      const qry = {
        query: data.query,
        variables: { ...data.variables, nextToken: lastToken },
      };

      if (!isLogged) {
        qry.authMode = 'AWS_IAM';
      }

      const { items, nextToken } = await list(qry, qry.variables.limit, []);
      lastToken = nextToken;

      return items;
    } else {
      return false;
    }
  }

  async function renew() {
    lastToken = null;
    isFinished = false;
    return await next();
  }

  // eslint-disable-next-line
  return useMemo(() => [next, renew], [lastToken, isFinished]);
};

const object = {
  ApiFileUpload,
  useListPager,
};

export default object;
