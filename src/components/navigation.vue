<template>
    <div class="navigation">
        <nav> 
        <div id="menuBtn">
        <router-link to="/menu"><i class="fas fa-bars"></i></router-link>
        </div>
        <div class="logo-container">
            <a href="/">
                <img src="/src/assets/images/chef-hat.png" alt="chef-hat">    
                <p id="name">{{account.user.firstName}}</p>
            </a>
        </div>
        <!-- <router-link to="/login">Logut</router-link> -->
        </nav>
      
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'


export default {
     name: "navigation",

    components: {


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

    methods: {

    }
};
</script>

