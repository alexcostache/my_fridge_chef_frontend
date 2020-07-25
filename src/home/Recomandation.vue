<template>
    <div>
        <navigation/>

        <!-- <h1>Hi {{account.user.firstName}}!</h1> -->
        <!-- <h1 class="text-center">Home</h1> -->
        <!-- <em v-if="users.loading">Loading users...</em> -->
        <h1 class="text-center">Welcome to My Fridge Chef</h1>
        <h3 class="text-center">Recomandations of the week</h3>
        <p class="text-center">For more recipes please check the Find Recipes section in the menu.</p>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>

        <div id="loadingAnimation" v-if="loadingAnim.play==true"></div>

         <div id="recipe" v-if="showModal" class="col-md-12">
                    <button type="button" class="close" aria-label="Close" v-on:click="closeRecipe()">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="card recipeCard col-md-12">
                    <h3 class="card-title">{{recipeInView.name }}</h3>
                    <img class="card-img-top" v-bind:src="recipeInView.images[0]" alt="Card image cap">
                    <div class="card-body">
                    <h5>Description:</h5>
                    <p class="card-text">{{recipeInView.description}}</p>

                    <h5>Tags:</h5>

                    <div>Course
                    <div v-for="item in recipeInView.course" v-bind:title="item[0]" :key="item[0]" class="tag">{{item["display-name"]}}</div>
                    </div>

                    <div>Dish 
                    <div v-for="item in recipeInView.dish" v-bind:title="item[0]" :key="item[0]" class="tag">{{item["display-name"]}}</div>
                    </div>

                    <div>Technique
                    <div v-for="item in recipeInView.technique" v-bind:title="item[0]" :key="item[0]" class="tag">{{item["display-name"]}}</div>
                    </div>
                   
                    <div class="spacer_40"></div>
                   <div class="color-box space">
                    <div class="shadow-tip">
                        <i class="fa fa-sun-o"></i> <strong>Tip: </strong>Cick on each ingredient you already have
                    </div>
                    </div>
                    <div class="spacer_40"></div>
                    <h5>Ingredientes:</h5>
                    <br>
                    <table class="table table-striped">
                    <tbody>
                        <tr v-for="item in recipeInView.ingredientLines" :class="{owned:item.ownedIngridients}" v-bind:title="item.wholeLine" :key="item.id" @click="$set(item, 'ownedIngridients', !item.ownedIngridients)"><td><b>{{item.ingredient}}</b> <i>{{item.wholeLine}}</i></td></tr>
                    </tbody>
                    </table>
                      <div class="spacer_40"></div>
                    <h5>Preparation Steps:</h5>
                    <ul class="list-group list-group-flush">
                        <li v-for="(item,index) in recipeInView.preparationSteps" v-bind:title="item" :key="item.id" class="list-group-item"><span class="preparationStep">{{index+1}} </span>{{item}}</li>
                    </ul>
                    <div class="spacer_40"></div>

                    <div>
                    <h5>Nutrition Estimates: </h5>
                    <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Attribute</th>
                        <th scope="col">Value</th>
                        <th scope="col">Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item) in recipeInView.nutritionEstimates" v-bind:title="item.attribute" :key="item.attribute" scope="row"><td>{{item.attribute}}</td><td>{{item.value}}</td><td>{{item.unit.plural}}</td></tr>
                    </tbody>
                    </table>
                    </div>
                    <div class="spacer_40"></div>
                 
                    <button type="button" class="btn btn-outline-primary" v-on:click="like()"><i class="fa fa-thumbs-o-up"></i> Like</button>
                    <button type="button" class="btn btn-outline-success" v-on:click="addToFavorites()"><i class="fa fa-heart red"></i> Add to Favorites</button>


                    </div>
                    </div>
        </div>

    <div v-if="UIon">
          <div v-for="(item, index) in recomandedRecipes" v-bind:title="item.name" :key="item.id">
                    <div class="card">
                    <img class="card-img-top" v-bind:src="item.images[0]" alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title">{{item.name }}</h5>
                    <p class="card-text">{{item.description}}</p>
                    <button id="cookBtn" type="button" class="btn btn-outline-info" v-on:click="showRecipe(index)">Cook</button>
                    </div>
              </div>
        </div>
    </div>





        <!-- admins  -->
        <!-- 
        <ul v-if="users.items">
            <li v-for="user in users.items" :key="user.id">
                {{user.firstName + ' ' + user.lastName}}
                <span v-if="user.deleting"><em> - Deleting...</em></span>
                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>
            </li>
        </ul> -->


        <!-- to be added to menu -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import navigation from '../components/navigation.vue'
import { homeService } from '../_services/home.service';
import { trandingService } from '../_services/tranding.service';
import { recipeService } from '../_services/recipe.service';

export default {
    data() {
    return {
      UIon:true,
      showModal: false,
      recomandedRecipes:[],
      recipeInView:[],
      loadingAnim:{"play":"true"}
    }
  },
    components: {

    navigation

    },
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
    created () {
        // this should be only for admins
        // this.getAllUsers();
        this.getRecomandationsAPI();
    },

    // this should be only for admins
    methods: {
            getRecomandationsAPI(){
                    this.recomandedRecipes = [];
                    var recomandedRecipesArr = this.recomandedRecipes; 
                    var playAnim = this.loadingAnim;
                    playAnim.play = true;
                    async function AsyncGetRecomandationsAPI() {  
                    var res =  await homeService.getRecomandations();
                    var res = JSON.parse(res);
                        for (let i = 0; i < res.length; i++) {
                            recomandedRecipesArr.push(res[i])
                        }
                     playAnim.play = false;
                    }
            AsyncGetRecomandationsAPI()
            },
            showRecipe(index){
                this.recipeInView = this.recomandedRecipes[index];
                this.showModal = true;
                this.UIon = false;
                    },
             closeRecipe(index){
                this.showModal = false;
                this.UIon = true;
             },
            like(index){
            console.log("add like to ", this.recipeInView);
            recipeService.addLike(this.recipeInView);
            },
            addToFavorites(){
            console.log("add to favourites ", this.recipeInView);
            recipeService.addToFavorites(this.recipeInView); 
            }
         }
};
</script>
<style>

</style>