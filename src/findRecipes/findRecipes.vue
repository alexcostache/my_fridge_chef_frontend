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
      
        <div id="results"></div>
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
                console.log("recipeService",recipeService)
                // send ingredientsArr to find recipe 
                // request recipe 
                recipeService.findRecipe({ingredientsArr})
            }
        }
    }
};
</script>