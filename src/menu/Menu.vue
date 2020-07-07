<template>
    <div id="menu" v-bind:class="{ unBlur: blur }">
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
    data(){
        return{
            blur : false
        }
    },
    components: {
        
    },
     created () {
    this.blur = false
    setTimeout(() => {  this.blur = true; }, 200);
        },
    methods: {
    }
};

</script>

<style scoped>

#menu{
    text-align: center;
    padding-top: 25%;
    background-color: #BADEFC;
    height: 100vh;
    filter: blur(10px);
}
h1{
    font-size: 2.5em;
    margin: 25px;
}
a{
    color: #333;
    text-shadow: 0 0 2px;
}
a:hover{
    color: #007bff;
}
</style>