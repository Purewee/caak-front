import { useHeader } from '../context/HeaderContext';
import { useQuery } from '@apollo/client';
import { ME } from '../pages/post/view/_gql';
import { useNavigate } from 'react-router-dom';
import { isModerator } from '../utility/Util';

const ProtectedRoute = ({ admin = false, children }) => {
  const { data } = useQuery(ME, { variables: { skip: !admin } });
  const navigate = useNavigate();
  const me = data?.me || {};
  const { setMode } = useHeader();
  if (admin) {
    if (!isModerator(me)) {
      return navigate('/');
    }
  }
  setMode('default');
  return children;
};

export default ProtectedRoute;
