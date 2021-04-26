import axios from 'axios';

export default ({ req }) => {
 
    // We must be on the browser
    return axios.create({
      baseUrl: 'https://inspiredemo2.appiancloud.com/'
    });
 
};
