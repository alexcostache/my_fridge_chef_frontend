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
  
  // const Q = data.ingredientsArr.toString().replace(/,/g, ' ');
    var obj
    const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };

  await fetch(`${config.apiUrl}/users/findRecipe`, requestOptions)
  .then(res => res.json())
  .then(data => obj = data)
  // .then(() => console.log(obj))

  return JSON.parse(obj)
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
