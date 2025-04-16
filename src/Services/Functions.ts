
import { signInWithEandPass } from "../Config/EmailAndPassword";



export const handleLogin = async({dispatch, email, password, navigation, setDisabled}) => {
    const user = await dispatch(signInWithEandPass({email, password}));
    if (signInWithEandPass.fulfilled.match(user)) {
      // result.payload contains the user
      const payload = {...user.payload}
      navigation.navigate('MyTabs', {
        screen: 'Home', 
        params: { userId: String(payload.uid) },
      });
      console.log(payload.uid)
    } else {
      console.log('Login failed:', user.error?.message);
    }
  };