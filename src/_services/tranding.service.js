import { router } from '../_helpers';
import config from 'config';
import { authHeader } from '../_helpers';

const axios = require("axios");

export const trandingService = {
    getAllLikes
};


async function getAllLikes() {
    var resp;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
  
    return await fetch(`${config.apiUrl}/users/tranding`, requestOptions)
    .then(function(response) {
      return response.json();
    })
  }