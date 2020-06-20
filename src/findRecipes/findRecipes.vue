<template>
    <div>
        <navigation/>

        <!-- <h1>Hi {{account.user.firstName}}!</h1> -->
        <h1 class="text-center">Find Recipe</h1>
        <!-- <em v-if="users.loading">Loading users...</em> -->
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
       
       <form @submit.prevent="findRecipe_handleSubmit">

        <input v-model="ingredients" class="form-control margin-top-40" type="text" placeholder="My ingredients..">
        <button class="btn btn-primary margin-top-40">Find Recipe</button>
        <!-- <p v-show="status.searching">Searching Recipe</p> -->

       </form>
      
        <div id="results">
          <div v-for="item in foundRecipesArr" v-bind:title="item.name" :key="item.id">
              <div>

                    <div class="card">
                    <img class="card-img-top" v-bind:src="item.images[0]" alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title">{{item.name }}</h5>
                    <p class="card-text">{{item.description}}</p>
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
      ingredients: "",
      foundRecipesArr:[],
      submitted: false
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
            
            if (ingredients) {
                 var ingredientsArr = ingredients.split(" ");

                console.log("findRecipe -> ingredientes --",ingredientsArr);
                
                var arr = this.foundRecipesArr;

                async function foundRecipes() {
                const result = await recipeService.findRecipe({ingredientsArr});
                for (let i = 0; i < result.data.feed.length; i++) {
                 var _result =  result.data.feed[i];
                 var recipe = {
                        name : _result.display.displayName,
                        images : _result.display.images,
                        description : _result.content.description.text,
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
                }               




                foundRecipes()
            }
        }
    }
};
</script>