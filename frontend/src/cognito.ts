import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID
};

export const userPool = new CognitoUserPool(poolData);

export const auth = userPool;

export const onAuthStateChanged = (_authObj: any, callback: (user: any) => void) => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.getSession((err: any, session: any) => {
      if (err || !session.isValid()) {
        callback(null);
      } else {
        callback(cognitoUser);
      }
    });
  } else {
    callback(null);
  }
  return () => {};
};

export const signOut = (_authObj: any) => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }
};

