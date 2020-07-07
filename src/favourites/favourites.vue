<template>
    <div>
        <navigation/>

        <!-- <h1>Hi {{account.user.firstName}}!</h1> -->
        <h1 class="text-center">Favorites</h1>
        <!-- <em v-if="users.loading">Loading users...</em> -->
        <!-- <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span> -->

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
                 


                    </div>
                    </div>
        </div>

    <div v-if="UIon">
        <div id="favourites">
          <div v-for="(item, index) in favouriteRecipes" v-bind:title="item.name" :key="item.id">
                    <div class="card">
                    <img class="card-img-top" v-bind:src="item.images[0]" alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title">{{item.name }}</h5>
                    <p class="card-text">{{item.description}}</p>
                    <button type="button" class="btn btn-outline-info" v-on:click="showRecipe(index)">Cook</button>
                    <button type="button" class="btn btn-outline-danger float-right" v-on:click="removeFav(index)"><i class="fa fa-times red"></i> Remove</button>
                   
                    </div>
              </div>
            </div>
        </div>
    </div>


        <!-- to be added to menu -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import navigation from '../components/navigation.vue'
import { favouriteService } from '../_services/favourites.service';
export default {
          data() {
    return {
      UIon:true,
      showModal: false,
      favouriteRecipes:[],
      recipeInView:[],
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
          var user = JSON.parse(localStorage.getItem('user'));
          this.favouriteRecipes = user.favouriteRecipes;
    },

    // this should be only for admins
    methods: {
            showRecipe(index){
                this.recipeInView = this.favouriteRecipes[index];
                this.showModal = true;
                this.UIon = false;
                    },
             closeRecipe(index){
                this.showModal = false;
                this.UIon = true;
             },
             removeFav(index){
                 favouriteService.removeFavorite(index);
                 var user = JSON.parse(localStorage.getItem('user'));
                 this.favouriteRecipes = user.favouriteRecipes;
             }
            }
};
</script>
<style>

</style>