<template>
    <div class="navigation">
        <nav> 
        <div id="menuBtn">
        <router-link to="/menu"><i class="fas fa-bars"></i></router-link>
        </div>    
        <p id="name">{{account.user.firstName}}</p>
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

<style scoped>
    nav{
        margin: 0;
        padding: 0;
        background-color: aquamarine;

    }
    #menuBtn{
        font-size: 30px;
        margin-left: 90%;
    }
    #name{
        width: 50%;
    }

</style>

