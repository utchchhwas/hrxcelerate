import axios from 'axios';

const apiObtainTokenPair = async (data) => {
  const response = await axios.post(
    'http://127.0.0.1:8000/api/obtain-token-pair/',
    {
      ...data,
    }
  );
  return response;
};

export default apiObtainTokenPair;
