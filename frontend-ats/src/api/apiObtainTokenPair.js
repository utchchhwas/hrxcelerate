import axios from 'axios';
import { API_ROOT } from '../API';

const apiObtainTokenPair = async (data) => {
  const response = await axios.post(
    // 'http://127.0.0.1:8000/api/obtain-token-pair/',
    `${API_ROOT}/obtain-token-pair/`,
    {
      ...data,
    }
  );
  return response;
};

export default apiObtainTokenPair;
