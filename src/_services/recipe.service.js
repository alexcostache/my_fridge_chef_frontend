import { router } from '../_helpers';
import config from 'config';
import { authHeader } from '../_helpers';

const axios = require("axios");
export const recipeService = {
    findRecipe
};


// async function findRecipe(data){
    
//      axios({
//         "method":"GET",
//         "url":"https://yummly2.p.rapidapi.com/feeds/search",
//         "headers":{
//         "content-type":"application/octet-stream",
//         "x-rapidapi-host":"yummly2.p.rapidapi.com",
//         "x-rapidapi-key":"dLmz0VpeZomshQhaJzHOoD1VCO6bp1y16Esjsn4xkEIGRbwwlO",
//         "useQueryString":true
//         },"params":{
//         "FAT_KCALMax":"1000",
//         "maxTotalTimeInSeconds":"7200",
//         "allowedAttribute":"",
//         "q":"pork carrot",
//         "start":"0",
//         "maxResult":"18"
//         }
//         }).then(function(response) {
//           return response;
//         })
       
// }


async function findRecipe(data){
  
  // const Q = data.ingredientsArr.toString().replace(/,/g, ' ');

  const Q = "apple carrot"

  const requestOptions = {
    method: 'GET',
    "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"yummly2.p.rapidapi.com",
      "x-rapidapi-key":"dLmz0VpeZomshQhaJzHOoD1VCO6bp1y16Esjsn4xkEIGRbwwlO",
      "useQueryString":true
      },
      "params":{
        "FAT_KCALMax":"1000",
        "maxTotalTimeInSeconds":"7200",
        "allowedAttribute":"",
        "q":Q,
        "start":"0",
        "maxResult":"18"
        }
};

return axios("https://yummly2.p.rapidapi.com/feeds/search", requestOptions);
    
}
