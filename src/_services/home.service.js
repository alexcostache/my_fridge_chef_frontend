import { router } from '../_helpers';
import config from 'config';
import { authHeader } from '../_helpers';

const axios = require("axios");
export const homeService = {
  getRecomandations
};

// Function to get recomandations from the server
async function getRecomandations() {
  // console.log("GET recomandations");
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };

  return await fetch(`${config.apiUrl}/users/recomandations`, requestOptions)
  .then(function(response) {
    return response.json();
  })
}