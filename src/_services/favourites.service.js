import { router } from '../_helpers';
import config from 'config';
import { authHeader } from '../_helpers';

const axios = require("axios");
export const favouriteService = {
    removeFavorite
};


async function removeFavorite(index) {

    var user = JSON.parse(localStorage.getItem('user'));
  
    console.log("user remove -- ", user['favouriteRecipes'][index].name);
    
    if (index > -1) {
        user['favouriteRecipes'].splice(index, 1);
    }

    localStorage.removeItem(user);
  
    localStorage.setItem('user', JSON.stringify(user));
  
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
  
  
    return fetch(`${config.apiUrl}/users/${user._id}`, requestOptions).then(function(response) {
      return response.json();
    })
    .then(function(json) {
      $.notify("Recipe removed","warn");
      console.log("remove fav OK -",json);
    });
    
  }