<template>
    <div class="menu">
        <h1> <router-link to="/home">Home</router-link></h1>
        <h1> <router-link to="/favourites">Favourites</router-link></h1>
        <h1> <router-link to="/findrecipe">Find Recipe</router-link></h1>
        <h1> <router-link to="/Tranding">Tranding</router-link></h1>
        <h1> <router-link to="/login">Log Out</router-link></h1>
    </div>
</template>

<script>


export default {
    name: "Menu",
    components: {
        
    },
    methods: {
    }
};

</script>

<style scoped>

.menu{
    text-align: center;
    margin-top: 40%;
}
h1{
    font-size: 40px;
    margin: 25px;
}
</style>