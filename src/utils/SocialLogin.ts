import {Platform} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest,
} from 'react-native-fbsdk-next';
import store from '../store';
import {showToast} from '../store/actions/AppActions';

const profileRequestParams = {
  fields: {
    string: 'id, name, email, first_name, last_name, gender, picture',
  },
};

const profileRequestConfig = {
  httpMethod: 'GET',
  version: 'v2.5',
  parameters: profileRequestParams,
};

export const googleLogin = async () => {
  GoogleSignin.configure({
    scopes: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ],
    // iosClientId:
    //   '832293104458-e5va8lcjs5sarujouiblm0oclb5b4eu7.apps.googleusercontent.com',
    webClientId:
      '241184032728-v4cf90sgk71engrpbj6t918f1upefb8f.apps.googleusercontent.com',
    offlineAccess: false,
  });

  GoogleSignin.isSignedIn().then((res) => {
    if (res) GoogleSignin.signOut();
  });

  return new Promise(async (resolve, reject) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      resolve(userInfo.user);
    } catch (error: any) {
      console.log('error', error);
      store.dispatch(showToast(error.toString()));
      reject(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  });
};

export const facebookLogin = async (res: any = {}) => {
  return new Promise(async (resolve, reject) => {

    LoginManager.logOut()

    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }

    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result: any) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );

          AccessToken.getCurrentAccessToken().then((data: any) => {
            console.log(data.accessToken.toString());

            const infoRequest = new GraphRequest(
              '/me',
              profileRequestConfig,
              (error: any, result: any) => {
                if (error) {
                  store.dispatch(showToast(error.toString()));
                  console.log('Error fetching data: ', error.toString());
                } else {
                  resolve(result);
                  console.log('Success fetching data: ', result.toString());
                }
              },
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error: any) {
        console.log('Login fail with error: ' + error);
        store.dispatch(showToast(error));
        reject(error);
      },
    );
  });
};
