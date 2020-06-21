import { router } from '../_helpers';
import config from 'config';
import { authHeader } from '../_helpers';

const axios = require("axios");
export const recipeService = {
    findRecipe,
    addLike,
    addToFavorites
};


async function findRecipe(data){
  
  const Q = data.ingredientsArr.toString().replace(/,/g, ' ');

  // const Q = "apple carrot"

  const requestOptions = {
    method: 'GET',
    "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"yummly2.p.rapidapi.com",
      "x-rapidapi-key":"dLmz0VpeZomshQhaJzHOoD1VCO6bp1y16Esjsn4xkEIGRbwwlO",
      "useQueryString":true
      },
      "params":{
        "maxTotalTimeInSeconds":"7200",
        "allowedAttribute":"",
        "q":Q,
        "start":"0",
        "maxResult":"18"
        }
};

return await axios("https://yummly2.p.rapidapi.com/feeds/search", requestOptions);
    
}


 async function addLike(recipe) {

  let user = JSON.parse(localStorage.getItem('user'));
  const data = {"username":user.username,"recipe":recipe};

  console.log("add like -- data", data);
  
  const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };

  await fetch(`${config.apiUrl}/users/addLike`, requestOptions).then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
  });
}



function addToFavorites(recipe) {

  var user = JSON.parse(localStorage.getItem('user'));

  
  user['favouriteRecipes'].push(recipe)
  
// toDO add valication on button if recipe in localstorage disable button

localStorage.removeItem(user);

localStorage.setItem('user', JSON.stringify(user));

console.log("added -- favouriteRecipes -- ",user["favouriteRecipes"]);


  const requestOptions = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  };

  


  return fetch(`${config.apiUrl}/users/${user._id}`, requestOptions).then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
  });
}
