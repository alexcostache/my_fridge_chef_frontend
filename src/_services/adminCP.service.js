import { router } from '../_helpers';
import config from 'config';
import { authHeader } from '../_helpers';

const axios = require("axios");
export const adminCPservice = {
    getAnalytics,
    promoteToAdmin
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

// Function to POST user details data to server used to update userType Admin|Basic
function promoteToAdmin(userID, userType) {

  var user = JSON.parse(localStorage.getItem('user'));

  const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({"userID":userID,"userType":userType,"user":user})
  };

  return fetch(`${config.apiUrl}/users/promoteToAdmin`, requestOptions)
  .then(function(response) {
    return response.json();
  })
  
}