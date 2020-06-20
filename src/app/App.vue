<template>
<div id="myfridgechef">
    <!-- <div id="phoneView" class="col-sm-6 offset-sm-3 col-xs-12 offset-xs-0"> -->
    <div id="phoneView" class="col-md-12 col-xl-8 offset-xl-2">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
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
   
    computed: {
        ...mapState({
            alert: state => state.alert
        })
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