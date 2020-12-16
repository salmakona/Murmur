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
              <small class="u-font">{{about_me}}</small><br />
              <small>Following <span class="badge badge-secondary">{{this.followersCount}}</span></small>
              <small> Followers <span class="badge badge-secondary">{{this.followingcount}}</span></small>
            </div>
          </div>
          <div class="my-3 p-3 bg-white rounded box-shadow">
            <div class="card border-0">
              <div class="card-body">
                <div class="inputFrom">
                  <form action="" ref="anyName" method="post" @submit.prevent="submitForm()">
                    <div class="form-group">
                      <textarea class="form-control" v-model="tweet" @click="callEvent" placeholder="What happening...."
                        rows="3"></textarea>
                      <div class="error" v-if="error">
                        <p class="text-danger"> {{ errors_msg }}</p>
                      </div>
                    </div>
                    <input type="submit" value="Post" class="btn btn-dark button">
                  </form>
                </div>
              </div>
            </div>
            <div class="media text-muted pt-3" v-for="timeline_murmur in timeline_murmur"
              v-bind:key="timeline_murmur.id" v-bind:id="timeline_murmur.id">
              <nuxt-link :to="'user-profile/' + timeline_murmur.user_id">
                <img src="/iconfinder_user-alt_285645.png" width="48" height="48" />
              </nuxt-link>

              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <nuxt-link :to="'user-profile/' + timeline_murmur.user_id">

                  <strong class="d-block text-gray-dark"> {{timeline_murmur.full_name}}
                    @{{timeline_murmur.user_name}}</strong>
                </nuxt-link>
                <nuxt-link :to="'murmur-detail/' + timeline_murmur.id">
                  {{timeline_murmur.murmur_content.substring(0,100)+".."}}.
                </nuxt-link>
              </p>

              <h6><span class="badge badge-dark" @click="likePost(timeline_murmur.id)">Like</span> <span
                  class="badge badge-secondary">{{timeline_murmur.like_count}}</span></h6>
            </div>
            <small class="d-block text-center mt-3" v-if="timeline_murmur.length>0">
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
        timeline_murmur: [],
        list: [],
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
        button_active: false,
        error: false,
        errorMessage: '',
        error_follower: false,
        errorMessage_follwer: '',
        page: 1,
        next_status_disable: '',
        disable: '',
        user_followers:[]
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

      // murmurs for timeline 
      try {

        const resAll = await axios.get('http://localhost:3001/api/murmurs/timeline/' + this.userId + '/' + this.page);
        this.timeline_murmur = resAll.data
        this.disable = false

      } catch (err) {}
      try {
        const resUser = await axios.get('http://localhost:3001/api/user/' + this.userId)

        this.user = resUser.data[0]
      
        this.user_name = this.user.user_name,
          this.full_name = this.user.full_name,
          this.about_me = this.user.about_me,
          this.join_date = this.user.join_date

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

      try{

        const userFollowers = await axios.get('http://localhost:3001/api/follower/' + this.userId);
        this.user_followers = userFollowers.data;
      }catch(e){

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
      async getInfo(userId) {
        const resUserinfo = await axios.get('http://localhost:3001/api/user/' + this.userId)
        this.user = resUserinfo.data[0]
      
        this.user_name = this.user.user_name,
          this.full_name = this.user.full_name,
          this.about_me = this.user.about_me,
          this.join_date = this.user.join_date

      },
      async submitForm() {
        const config = {
          headers: {
            Accept: "application/json"
          }
        };

        const body = {
          murmur_content: this.tweet,
          user_id: "1",
          like_count: 0,
          creation_date: "2020-12-14 1.5.30"
        }
       
        if (this.tweet == '') {
          
          this.error = true;
          this.errors_msg = "Murmur is missing"
        } else {
          const res = await axios.post('http://localhost:3001/api/murmur', {
              user_id: "1",
              murmur_content: this.tweet,
              like_count: 0,
              creation_date: "2020-12-14 1.5.30"
            })
            .then((response) => {
              
              this.resetInput()
              this.refresh()
            });;
        }
        this.$refs.anyName.reset();
      },
      async refresh() {

        // list of murmurs for timeline 
        try {

          const resAll = await axios.get('http://localhost:3001/api/murmurs/timeline/' + this.userId + '/' + this
            .page);
          this.timeline_murmur = resAll.data

        } catch (err) {}
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
      async nextPage() {
        //pagination next 
        try {
          this.page += 1;
         
          const resAll = await axios.get('http://localhost:3001/api/murmurs/timeline/' + this.userId + '/' + this
            .page);
          this.timeline_murmur = resAll.data;
          
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
          const resAll = await axios.get('http://localhost:3001/api/murmurs/timeline/' + this.userId + '/' + this
            .page);
          this.timeline_murmur = resAll.data
        } catch (err) {
         
          this.next_status_disable = ''
          this.disable = false
        }

      },
      resetInput() {
        // input text area field 
        this.tweet = "";
      },
      async reloadFollowerCount(){
          try {

        const resFollowerCount = await axios.get('http://localhost:3001/api/followerCount/' + this.userId);
        
        this.followersCount = resFollowerCount.data.count

      } catch (err) {

      }
      },
      async reloadFollowingCount(){
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

  .left {
    float: left;
  }

</style>
