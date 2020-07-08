<template>
    <div id="menu" v-bind:class="{ animate: animate }">
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
            animate : false
        }
    },
    components: {
        
    },
     created () {
    this.animate = false
    setTimeout(() => {  this.animate = true; }, 200);
        },
    methods: {
    }
};

</script>

<style scoped>

#menu{
    background-image: url("/src/assets/images/crosshatch_pattern_01.png");
    text-align: center;
    padding-top: 25%;
    background-color: #BADEFC;
    height: 100vh;
    top: -100vh;
    position: absolute;
    width: 100%;
}
h1{
    font-size: 2.5em;
    margin: 25px;
}
a{
    font-family: 'IndieFlower';
    color: #333;
    text-shadow: 0 0 2px;
}
a:hover{
    color: #007bff;
}
</style>