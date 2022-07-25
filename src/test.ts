import * as deepint from './index';

deepint.Config.getInstance().setToken('token');

console.log(deepint.Config.getInstance().X_AUTH_TOKEN);