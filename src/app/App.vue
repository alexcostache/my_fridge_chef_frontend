<template>
<div id="myfridgechef">
    
 <div v-if="isIE" id="ieBlocker">
        <h1>Internet Explorer is not supported.</h1>
        <br><br>
        <h1>please use a different browser.</h1>
</div>

    <!-- <div id="phoneView" class="col-sm-6 offset-sm-3 col-xs-12 offset-xs-0"> -->
    <div id="phoneView" class="col-md-12 col-xl-8 offset-xl-2">
        <div class="container-full">
            <div class="row">
                <div class="render">
                    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'



export default {
    name: 'app',
    data(){
        return{
            isIE : false
        }
    },
   
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    created () {
        if  (isIE()) {this.isIE = true;}
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>