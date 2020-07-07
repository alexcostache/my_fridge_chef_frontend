<template>
    <div class="menu">
        <h1> <router-link to="/home">Home</router-link></h1>
        <h1> <router-link to="/favourites">Favourites</router-link></h1>
        <h1> <router-link to="/findRecipes">Find Recipe</router-link></h1>
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
    padding-top: 25%;
}
h1{
    font-size: 2.5em;
    margin: 25px;
}
a{
    color: #333;
}
a:hover{
    color: #007bff;
}
</style>