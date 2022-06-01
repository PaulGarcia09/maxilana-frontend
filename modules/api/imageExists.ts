import axios from 'axios';

const imageExists = async (url: string): Promise<boolean> => {
  //console.log(url);
  try {
    const response = await axios({
      url,
      method: 'HEAD',
    });
    return true;
  } catch (e) {
    return false;
  }
};

export default imageExists;
