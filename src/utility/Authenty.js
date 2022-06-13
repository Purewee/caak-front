import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../graphql-custom/user/queries';

export async function isLogged(user, setUser) {
  try {
    const usr = await Auth.currentAuthenticatedUser();

    if (usr && !user) {
      const resp = await API.graphql(graphqlOperation(getUser, { id: usr.attributes.sub }));
      setUser({ ...usr, sysUser: resp.data.getUser });
    } else if (usr && user) {
      // if(!user.sysUser){
      const resp = await API.graphql(graphqlOperation(getUser, { id: usr.attributes.sub }));
      setUser({ ...usr, sysUser: resp.data.getUser });
      // }
    } else if (!usr) {
      setUser(null);
    } else {
      setUser(null);
    }
  } catch (ex) {
    setUser(null);
    console.log(ex);
    return false;
  }
}

export async function signIn(setUser) {
  try {
    const usr = await Auth.currentAuthenticatedUser();
    const resp = await API.graphql(graphqlOperation(getUser, { id: usr.attributes.sub }));
    const data = resp.data.getUser;
    setUser({ ...usr, sysUser: data });
  } catch (ex) {
    console.log(ex);
  }
}
