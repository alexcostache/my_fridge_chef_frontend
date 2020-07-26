<template>
    <div>
        <navigation/>

        <!-- <h1>Hi {{account.user.firstName}}!</h1> -->
        <h1 class="text-center">Tranding</h1>
    <div id="recipe" v-if="showModal" class="col-md-12">
                    <button type="button" class="close" aria-label="Close" v-on:click="closeRecipe()">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="card recipeCard col-md-12">
                    <h3 class="card-title">{{recipeInView.name }}</h3>
                    <h6>Likes: <span class="badge badge-info">{{recipeInViewLikes}}</span></h6>
                    <img class="card-img-top" v-bind:src="recipeInView.images[0]" alt="Card image cap">
                    <div class="card-body">
                    <h5>Description:</h5>
                    <p class="card-text">{{recipeInView.description}}</p>
                    <h5>Time: <span class="text-info">{{recipeInView.totalTime}}</span></h5>

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

                     <div>Nutrition
                    <div v-for="item in recipeInView.nutrition" v-bind:title="item[0]" :key="item[0]" class="tag">{{item["display-name"]}}</div>
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
          <div v-for="(item, index) in likedRecipes" v-bind:title="item.recipe.name" :key="item.id">
                    <div class="card">
                    <h5 class="rate-nr text-primary">{{index+1 }}</h5>
                    <img class="card-img-top" v-bind:src="item.recipe.images[0]" alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title">{{item.recipe.name }}</h5>
                    <h6>Likes: <span class="badge badge-info">{{item.likes}}</span></h6>
                    <p class="card-text">{{item.recipe.description}}</p>
                    <button id="cookBtn" type="button" class="btn btn-outline-info" v-on:click="showRecipe(index)">Cook</button>
                    </div>
              </div>
        </div>
    </div>


    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import navigation from '../components/navigation.vue'
import { trandingService } from '../_services/tranding.service';
import { recipeService } from '../_services/recipe.service';

export default {
      data() {
    return {
        likedRecipes:[],
        UIon:true,
        showModal: false,
        recipeInView:[],
        recipeInViewLikes:[],
        status:null,
        error:null
        }
    },
    components: {
    navigation
    },
    mounted (){

    },
    computed: {
    },
      created () {   
          this.run()                 
    },
    
    methods: {
            run(e){
                    this.likedRecipes = [];
                    var likedRecipesArr = this.likedRecipes; 

                    async function getAllLikesRes() {  
                    var res =  await  trandingService.getAllLikes();
                        for (let i = 0; i < res.length; i++) {
                            likedRecipesArr.push(res[i])
                        }
                    }
            getAllLikesRes()
            },
            
            showRecipe(index){
                this.recipeInView = this.likedRecipes[index].recipe;
                this.recipeInViewLikes = this.likedRecipes[index].likes;
                this.showModal = true;
                this.UIon = false;
                    },
             closeRecipe(index){
                this.run();
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