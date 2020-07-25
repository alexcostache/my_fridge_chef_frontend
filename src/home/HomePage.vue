<template>
    <div>
        <navigation/>

        <!-- <h1>Hi {{account.user.firstName}}!</h1> -->
        <!-- <h1 class="text-center">Home</h1> -->
        <!-- <em v-if="users.loading">Loading users...</em> -->
        <!-- <h1 class="text-center">Welcome to My Fridge Chef</h1>
        <h3 class="text-center">Recomandations of the week</h3>
        <p class="text-center">For more recipes please check the Find Recipes section in the menu.</p>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span> -->

    <div id="#carousel">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item slide_1 active">
              <div class="carousel-caption d-md-block">
            <h1>Welcome to My Fridge Chef </h1>
          </div>
          </div>
          <div class="carousel-item slide_2">
              <div class="carousel-caption d-md-block">
             <h1>Find best new exciting recipes</h1>
          </div>
          </div>
          <div class="carousel-item slide_3">
              <div class="carousel-caption d-md-block">
             <h1>Save and share fresh recipes with your friends</h1>
          </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
</div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import navigation from '../components/navigation.vue'
import { homeService } from '../_services/home.service';

export default {
    data() {
    return {
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
    },

    // this should be only for admins
    methods: {

         }
};
</script>