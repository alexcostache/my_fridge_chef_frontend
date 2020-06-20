<template>
    <div>
        <navigation/>

        <!-- <em v-if="users.loading">Loading users...</em> -->
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>

       <!-- recipe modal  -->
        <div id="recipe" v-if="showModal" class="col-md-12">
                    <button type="button" class="close" aria-label="Close" v-on:click="closeRecipe()">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="card recipeCard col-md-12">
                    <h5 class="card-title">{{recipeInView.name }}</h5>
                    <img class="card-img-top" v-bind:src="recipeInView.images[0]" alt="Card image cap">
                    <div class="card-body">
                    <p class="card-text">{{recipeInView.description}}</p>
                    <button type="button" class="btn btn-outline-primary" v-on:click="like(index)"><i class="fa fa-thumbs-o-up"></i> Like</button>
                    <button type="button" class="btn btn-outline-success" v-on:click="addToFavorites(index)"><i class="fa fa-heart red"></i> Add to Favorites</button>

                    </div>
                    </div>
        </div>

        <div v-if="UIon">

        <h1 class="text-center">Find Recipe</h1>
        <!-- recipe find request form  -->
       <form @submit.prevent="findRecipe_handleSubmit">
        <input v-model="ingredients" class="form-control margin-top-40" type="text" placeholder="My ingredients..">
        <button class="btn btn-primary margin-top-40"><i class="fa fa-search"></i> Find Recipe</button>
        <!-- <p v-show="status.searching">Searching Recipe</p> -->
       </form>

        <!-- search animatin  -->
        <div id="searchAnimation" v-if="searchAnim.play==true"></div>

        <!-- recipe find results -->
        <div id="results">
          <div v-for="(item, index) in foundRecipesArr" v-bind:title="item.name" :key="item.id">
                    <div class="card">
                    <img class="card-img-top" v-bind:src="item.images[0]" alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title">{{item.name }}</h5>
                    <p class="card-text">{{item.description}}</p>
                    <button type="button" class="btn btn-outline-info" v-on:click="showRecipe(index)">Cook</button>
                    </div>
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
import { recipeService } from '../_services/recipe.service';

export default {
      data() {
    return {
      UIon:true,
      ingredients: "",
      foundRecipesArr:[],
      submitted: false,
      showModal: false,
      recipeInView:[],
      searchAnim:{"play":"false"}
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
        // this. ();
    },
    methods: {
        // ...mapActions('users', { findRecipe: 'findRecipe' }),

        findRecipe_handleSubmit (e) {
            this.submitted = true;
            const { ingredients } = this;

            // clear previous search result
            this.foundRecipesArr = [];

            if (ingredients) {
                var ingredientsArr = ingredients.split(" ");
                console.log("findRecipe -> ingredientes --",ingredientsArr);
                
                var arr = this.foundRecipesArr;
                var playAnim = this.searchAnim;
                playAnim.play = true;

                async function foundRecipes() {
                const result = await recipeService.findRecipe({ingredientsArr});
                for (let i = 0; i < result.data.feed.length; i++) {
                 var _result =  result.data.feed[i];
                 var recipe = {
                        name : _result.display.displayName,
                        images : _result.display.images,
                        description : _result.content.description.text.split("The recipe is a Yummly original created by")[0],
                        preparationSteps : _result.content.preparationSteps,
                        ingredientLines : _result.content.ingredientLines,
                        nutritionEstimates : _result.content.nutrition.nutritionEstimates,
                        technique : _result.content.tags.technique,
                        dish : _result.content.tags.dish,
                        course: _result.content.tags.course,
                        contentOwner : "Yummly.com"
                   }
                    arr.push(recipe)
                }
                console.log("foundRecipesArr",arr);
                playAnim.play = false;
                } 





                foundRecipes();
            }
        },
        showRecipe(index){
            this.recipeInView = this.foundRecipesArr[index];
            this.showModal = true;
            this.UIon = false;
        },
         closeRecipe(index){
            this.showModal = false;
            this.UIon = true;

        }
    }
};
</script>