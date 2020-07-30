import { router } from '../_helpers';
import config from 'config';
import { authHeader } from '../_helpers';

const axios = require("axios");
export const adminCPservice = {
    getAnalytics
};

// Function to GET analytics data from server
async function getAnalytics() {
  // console.log("GET analytics");
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };

  return await fetch(`${config.apiUrl}/users/analytics`, requestOptions)
  .then(function(response) {
    return response.json();
  })
}