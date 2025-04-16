import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../Redux/store';
import {fetchAll} from '../Redux/UserSlice';

export const loggedUser = useSelector((state: RootState) => state.auth.user);

export const handleUser = async () => {
  const dispatch = useDispatch<AppDispatch>();
  const allUsers = await dispatch(fetchAll());
  console.log(allUsers);
  return allUsers;
};
