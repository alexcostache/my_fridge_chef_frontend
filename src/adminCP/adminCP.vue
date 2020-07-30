<template>
    <div>
        <navigation/>

        <!-- <em v-if="users.loading">Loading users...</em> -->
        <h1 class="text-center">ADMIN CP</h1>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
       <!-- recipe modal  -->
        <div class="container">
            <button type="button" class="btn btn-info" v-on:click="showUsersToggle()">Users</button>
            <button type="button" class="btn btn-info" v-on:click="showAnalyticsToggle()">Analytics</button>
        
        <div v-if="showAnalytics">
            <h4 class="text-center">Analytics</h4>
            <button type="button" class="btn btn-info" v-on:click="generateAnalytics()">Generate Analytics</button>
            <div class="spacer_40"></div>
            <div v-if="analyticsGenerated">
                 <button type="button" class="btn btn-info" v-on:click="showWeaklyAnalytics()">Weakly Searches</button>
                 <button type="button" class="btn btn-info" v-on:click="showMontlyAnalytics()">Montly Searches</button>
                 <button type="button" class="btn btn-info" v-on:click="showAllAnalytics()">All Searches</button>
            </div>

            <div v-if="showWeaklyAnalyticsToggle">
                <h4 class="text-center">Weakly Analytics</h4>
                <h5> Dates Range: {{analytics["data"]["weekRange"]["firstDay"]}} - {{analytics["data"]["weekRange"]["lastDay"]}}</h5>
                <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Search Array</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in analytics.data.weaklySearches" v-bind:title="item[0]" :key="item[0]" class="">
                    <th scope="row">{{index+1}}</th>
                    <td>{{item["createdDate"]}}</td>
                    <td>{{item["searchArray"]}}</td>
                    </tr>
                </tbody>
                </table>        
            </div>
            <div v-if="showMontlyAnalyticsToggle">
                <h4 class="text-center">Montly Analytics</h4>
                <h5> Dates Range: {{analytics["data"]["monthRange"]["firstDay"]}} - {{analytics["data"]["monthRange"]["lastDay"]}}</h5>
                 <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Search Array</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in analytics.data.monthlySearches" v-bind:title="item[0]" :key="item[0]" class="">
                    <th scope="row">{{index+1}}</th>
                    <td>{{item["createdDate"]}}</td>
                    <td>{{item["searchArray"]}}</td>
                    </tr>
                </tbody>
                </table>        
            </div>
            <div v-if="showAllAnalyticsToggle">
                <h4 class="text-center">All Searches</h4>
                <h5 class="text-center"> Total: {{analytics["data"]["totalSearches"]}}</h5>
                 <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Search Array</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr v-for="(item,index) in analytics.data.allSearches" v-bind:title="item[0]" :key="item[0]" class="">
                    <th scope="row">{{index+1}}</th>
                    <td>{{item["createdDate"]}}</td>
                    <td>{{item["searchArray"]}}</td>
                    </tr>
                </tbody>
                </table>        
            </div>
        </div>

        <div v-if="showUsers">
            <div class="spacer_40"></div>
            <h3 class="text-center">Users</h3>
                <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr v-for="(user,index) in users.items" :key="user.id">
                    <th scope="row">{{index+1}}</th>

                    <td>{{user.firstName}}</td>
                    <td>{{user.lastName}}</td>
                    <td>{{user.createdDate}}</td>
                    <td>
                    <a v-on:click="deleteUserRequest(user.id)" class="text-danger">Delete</a>
                    </td>
                    </tr>
                </tbody>
                </table>        

       
    </div>
    </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import navigation from '../components/navigation.vue'
import { homeService, adminCPservice } from '../_services/adminCP.service';


export default {
      data() {
    return {
        showUsers:false,
        showAnalytics:false,
        analyticsGenerated:false,
        showWeaklyAnalyticsToggle:false,
        showMontlyAnalyticsToggle:false,
        showAllAnalyticsToggle:false,
        analytics:{"data":{}}
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
    },
    methods: {
      ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        }),

      
        generateAnalytics(){
        var analyticsObj = this.analytics; 
        // var playAnim = this.loadingAnim;
        async function asyncGetAnalytics() {  
        var res =  await adminCPservice.getAnalytics();
            analyticsObj.data = res;
        }
        asyncGetAnalytics();
        this.analyticsGenerated = true;
        },
          showUsersToggle(){
            if(this.showUsers){
                this.showUsers = false;
            }else{
                this.getAllUsers();
                this.showUsers = true;
                this.showAnalytics = false;
            }
        },
         showAnalyticsToggle(){
            if(this.showAnalytics){
                this.showAnalytics = false;
            }else{
                this.showAnalytics = true;
                this.showUsers = false;
            }
        },
        showWeaklyAnalytics(){
            if(this.showWeaklyAnalyticsToggle){
                this.showWeaklyAnalyticsToggle = false;
            }else{
                this.showWeaklyAnalyticsToggle = true;
                this.showMontlyAnalyticsToggle = false;
                this.showAllAnalyticsToggle = false;

            }
        },
        showMontlyAnalytics(){
            if(this.showMontlyAnalyticsToggle){
                this.showMontlyAnalyticsToggle = false;
            }else{
                this.showMontlyAnalyticsToggle = true;
                this.showWeaklyAnalyticsToggle = false;
                this.showAllAnalyticsToggle = false;

            }
        },
        showAllAnalytics(){
            if(this.showAllAnalyticsToggle){
                this.showAllAnalyticsToggle = false;
            }else{
                this.showAllAnalyticsToggle = true;
                this.showWeaklyAnalyticsToggle = false;
                this.showMontlyAnalyticsToggle = false;
            }
        },
        deleteUserRequest(id){
            let conf = confirm("Are you sure?")
            if(conf){
                deleteUser(id)
            }
        }
    }
};
</script>