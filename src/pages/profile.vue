<template>

  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="my-3 p-3 bg-white rounded box-shadow">
            <h6 class="border-bottom border-gray pb-2 mb-0">Suggestions</h6>
            <div class="media text-muted pt-3" v-for="list in list" v-bind:key="list.id" v-bind:id="list.id">


              <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <div class="d-flex justify-content-between align-items-center w-100">
                  <nuxt-link :to="'user-profile/' + list.id">
                    <img src="/iconfinder_user-alt_285645.png" width="48" height="48" />
                    <strong class="text-gray-dark">{{list.full_name}}</strong>
                  </nuxt-link>
                  <a href="#" @click="follow(list.id)">Follow</a>
                </div>
                <strong v-if="error_follower">{{this.errorMessage_follwer}}</strong>
              </div>
            </div>
          </div> 

        </div>
        <div class="col-md-6 border-right border-left">
          <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow">
            <img src="/iconfinder_user-alt_285645.png" width="48" height="48" />
            <div class="lh-100">
              <h6 class="mb-0 text-white lh-100">{{full_name}}</h6>
              <small class="u-font">@{{user_name}}</small><br>
              <small class="u-font">{{about_me}}</small><br>
              <small>Joined: {{join_date}}</small><br>
              <small>Following <span class="badge badge-secondary">{{this.followersCount}}</span></small>
              <small> Followers <span class="badge badge-secondary">{{this.followingcount}}</span></small>
            </div>
          </div>
          <div class="my-3 p-3 bg-white rounded box-shadow">
            <div class="media text-muted pt-3" v-for="murmur in murmur" v-bind:key="murmur.id" v-bind:id="murmur.id">
              <nuxt-link :to="'user-profile/' + murmur.user_id">
                <img src="/iconfinder_user-alt_285645.png" width="48" height="48" />
              </nuxt-link>
              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <strong class="d-block text-gray-dark"> {{murmur.full_name}}
                    @{{murmur.user_name}}</strong>
               
                <nuxt-link :to="'murmur-detail/' + murmur.id">
                  {{murmur.murmur_content.substring(0,100)+".."}}.
                </nuxt-link>
                 <br>
                <small class="text-primary"> Posted: {{new Date(murmur.creation_date).toLocaleDateString("en-US")}}</small> 
                  <span class="badge badge-dark" @click="likePost(murmur.id)">Like</span> 
                   <span class="badge badge-secondary">{{murmur.like_count}}</span>
                 <span class="badge badge-danger" @click="removePost(murmur.id)"> Delete</span>
               
              </p>
            <small class="d-block text-right mt-3">
                
            </small>
            </div>
            <small class="d-block text-center mt-3" v-if="murmur.length>0">
              <button type="button" class="btn btn-secondary btn-sm" @click="previousPage()"
                :disabled="disable == 'false'">Privious</button>
              <button ype="button" class="btn btn-secondary btn-sm" @click="nextPage()"
                :disabled="next_status_disable == 'true'">Next</button>
            </small>
          </div>
        </div>
        <div class="col-md-3">

           <div class="my-3 p-3 bg-white rounded box-shadow">
            <h6 class="border-bottom border-gray pb-2 mb-0">Following</h6>
            <div class="media text-muted pt-3" v-for="following in following" v-bind:key="following.id"
              v-bind:id="following.id">
              <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">

                <div class="d-flex justify-content-between align-items-center w-100">
                  <nuxt-link :to="'user-profile/' + following.id">
                    <img src="/iconfinder_user-alt_285645.png" width="48" height="48" />
                    <strong class="text-gray-dark">{{following.full_name}}</strong>
                  </nuxt-link>
                  <a href="#" @click="follow(following.id)">Unfollow</a>
                </div>
                <strong v-if="error">{{this.errorMessage}}</strong>
              </div>


            </div>
          </div>

          <div class="my-3 p-3 bg-white rounded box-shadow">
            <h6 class="border-bottom border-gray pb-2 mb-0">Followers</h6>
            <div class="media text-muted pt-3" v-for="user_followers in user_followers" v-bind:key="user_followers.id"
              v-bind:id="user_followers.id">
              <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">

                <div class="d-flex justify-content-between align-items-center w-100">
                  <nuxt-link :to="'user-profile/' + user_followers.id">
                    <img src="/iconfinder_user-alt_285645.png" width="48" height="48" />
                    <strong class="text-gray-dark">{{user_followers.full_name}}</strong>
                  </nuxt-link>
                </div>
              </div>


            </div>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import moment from 'moment';
  export default {
    data() {
      return {
        tweet: '',
        error: false,
        errors_msg: '',
        murmur: [],
        user: [],
        user_name: '',
        full_name: '',
        about_me: '',
        join_date: '',
        followersCount: [],
        followingcount: [],
         following: [],
        date: '',
        userId: 1,
        page: 1,
        next_status_disable: '',
        disable: '',
        user_followers: [],
        error: false,
        errorMessage: '',
        error_follower: false,
        errorMessage_follwer: '',
        page: 1,
        next_status_disable: '',
        disable: '',
         list: []
      }
    },
    async created() {
      // get user not in following list 
      try {

        const list = await axios.get('http://localhost:3001/api/user/notfollowing/' + this.userId)
        this.list = list.data;
        this.error_follower = false
        this.errorMessage_follwer = "";
      } catch (err) {
        this.error_follower = true
        this.errorMessage_follwer = "user not exits...";
        this.list = [];
       
      }

      try {
        const resall = await axios.get('http://localhost:3001/api/murmurs/profile/' + this.userId + '/' + this.page);
        this.murmur = resall.data

      } catch (err) {

      }
      try {
        const resuser = await axios.get('http://localhost:3001/api/user/' + this.userId)

        this.user = resuser.data[0]
        this.user_name = this.user.user_name,
          this.full_name = this.user.full_name,
          this.about_me = this.user.about_me,
           this.join_date = new Date(this.user.join_date).toLocaleDateString("en-US")
      } catch (err) {

      }
      try {

        const resfollowerCount = await axios.get('http://localhost:3001/api/followerCount/' + this.userId);
        this.followersCount = resfollowerCount.data.count

      } catch (err) {

      }

      
      // follower count 
      try {

        const resFollowerCount = await axios.get('http://localhost:3001/api/followerCount/' + this.userId);
        
        this.followersCount = resFollowerCount.data.count

      } catch (err) {

      }
      // following  count 
      try {
        const resFollowedBYCount = await axios.get('http://localhost:3001/api/followingCount/' + this.userId);
        this.followingcount = resFollowedBYCount.data.count

      } catch (err) {

      }
      // get followes users 

      try {

        const userFollowers = await axios.get('http://localhost:3001/api/follower/' + this.userId);
        this.user_followers = userFollowers.data;
      } catch (e) {

      }

       //getFollowing users
      try {
        const resFollowing = await axios.get('http://localhost:3001/api/following/' + this.userId);
        this.following = resFollowing.data;
        this.error = false
        this.errorMessage = "";

      } catch (err) {

        this.error = true
        this.errorMessage = "user not exits...";
        this.following = [];
      }

    },
    methods: {
      callEvent() {
        
        this.error = false

      },
      async likePost(mumur_id, userId) {
        
        const res = await axios.post('http://localhost:3001/api/murmurs/like', {
            user_id: this.userId,
            mumur_id: mumur_id
          })
          .then((response) => {
            
            this.refresh()
          });
      },

      async removePost(murmurId) {
        const removeRes = await axios.delete('http://localhost:3001/api/murmurs/' + murmurId).then((response) => {
          
          this.refresh()
        })


      },
      async follow(followId) {
        
        const res = await axios.post('http://localhost:3001/api/follower', {
          user_id: this.userId,
          follower_user_id: followId
        }).then((response) => {
         
          this.followerReload();
          this.followingReload();
          this.refresh();
          this.reloadFollowerCount();
          this.reloadFollowingCount()
        });

      },
      async refresh() {
        try {

          const resall = await axios.get('http://localhost:3001/api/murmurs/profile/' + this.userId + '/' + this.page);

          this.murmur = resall.data

        } catch (err) {

        }
      },
      async nextPage() {
        //pagination next 
        try {
          this.page += 1;
          
          const resAll = await axios.get('http://localhost:3001/api/murmurs/profile/' + this.userId + '/' + this.page);
          this.murmur = resAll.data;
          
        } catch (err) {
         
          this.next_status_disable = 'true'
          this.page = 1;
        }
      },
      async previousPage() {
        //pagination pri 
        if (this.page > 1) {
          this.page -= 1;
          
        }
        if (this.page == 1) {
          this.page = 1;
          this.next_status_disable = ''
          this.disable = false

        }
        try {
          const resAll = await axios.get('http://localhost:3001/api/murmurs/profile/' + this.userId + '/' + this
            .page);
          this.murmur = resAll.data
        } catch (err) {
          
          this.next_status_disable = ''
          this.disable = false
        }

      },
      async followerReload() {
        // refload following list
        try {

          const list = await axios.get('http://localhost:3001/api/user/notfollowing/' + this.userId);
          this.list = list.data;
          this.error_follower = false
          this.errorMessage_follwer = "";

        } catch (err) {

          this.error_follower = true
          this.errorMessage_follwer = "user not exits...";
          this.list = [];

        }

      },

      async followingReload() {
        // get following list
        try {
          const resFollowing = await axios.get('http://localhost:3001/api/following/' + this.userId);

          this.following = resFollowing.data
          this.error = false
          this.errorMessage = "";
        } catch (err) {

          this.error = true
          this.errorMessage = "user not exits...";
          this.following = [];
        }
      },
      async reloadFollowerCount() {
        try {

          const resFollowerCount = await axios.get('http://localhost:3001/api/followerCount/' + this.userId);
         
          this.followersCount = resFollowerCount.data.count

        } catch (err) {

        }
      },
      async reloadFollowingCount() {
        try {
          const resFollowedBYCount = await axios.get('http://localhost:3001/api/followingCount/' + this.userId);
          

          this.followingcount = resFollowedBYCount.data.count

        } catch (err) {

        }
      }
    }


  }

</script>

<style scoped>
  .murmur {
    padding: 1rem;
    border: 1px dotted #ccc;
    margin: 1rem 0;
  }

  .inputFrom {
    padding: 10px;

  }

  .textArea {
    width: 100%;
  }

  .button {
    float: right;
  }

  .heading {
    width: 250px;

  }

</style>
