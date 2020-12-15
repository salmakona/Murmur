<template>

  <div>
    <div>
      Timeline
      <img src="/iconfinder_user-alt_285645.png" />
    </div>
    <div>
      <p class="text-uppercase">{{full_name}}</p>
      <p class="text-lowercase">@{{user_name}}</p>
      <p class="text-justify"> {{about_me}}</p>
      <h6>Followers <span class="badge badge-secondary">{{this.followersCount}}</span></h6>
      <h6>Following <span class="badge badge-secondary">{{this.followingcount}}</span></h6>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="inputFrom">
          <form action="" method="post" @submit.prevent="submitForm()">
            <div class="form-group">
              <textarea class="form-control" v-model="tweet" @click="callEvent" placeholder="yours murmur...."
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

    <div class="card">
      <div class="card-body">
        <div>
          <ul v-for="list in list" v-bind:key="list.id" v-bind:id="list.id">
              <nuxt-link :to="'user-profile/' + list.id">
                <li class="left"><img src="/iconfinder_user-alt_285645.png" />
                <!-- <span @click="getInfo(list.id)">{{list.full_name}}</span> -->
    <!-- <h6><span class="badge badge-dark" @click="follow(list.id)">Like</span> <span class="badge badge-secondary" v-if="button_active">Following</span></h6> -->
                </li>
              </nuxt-link>
          </ul>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="card">
          <ul class="list-group list-group-flush" v-for="murmur in murmur" v-bind:key="murmur.id" v-bind:id="murmur.id">
            {{murmur.full_name}} -@{{murmur.user_name}} 
            <li class="list-group-item">{{murmur.murmur_content}}</li>
           
            <h6><span class="badge badge-dark" @click="likePost(murmur.id)">Like</span> <span class="badge badge-secondary">{{murmur.like_count}}</span></h6>
          </ul>
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
        list: [],
        user: [],
        user_name: '',
        full_name: '',
        about_me: '',
        join_date: '',
        followersCount: [],
        followingcount: [],
        date: '',
        userId: 1,
        button_active:false
      }
    },
    async created() {
      try {

        const list = await axios.get('http://localhost:3001/api/user/all/' + this.userId);
        this.list = list.data;
        console.log("=============")
        console.log( this.list)

      } catch (err) {}
      try {

        const resAll = await axios.get('http://localhost:3001/api/all/' + this.userId);
        this.murmur = resAll.data

      } catch (err) {}
      try {
        const resUser = await axios.get('http://localhost:3001/api/user/' + this.userId)

        this.user = resUser.data[0]
        console.log(this.user)
        this.user_name = this.user.user_name,
          this.full_name = this.user.full_name,
          this.about_me = this.user.about_me,
          this.join_date = this.user.join_date

      } catch (err) {

      }
      try {

        const resFollowerCount = await axios.get('http://localhost:3001/api/followerCount/' + this.userId);
        console.log("Folowed count")
        this.followersCount = resFollowerCount.data.count

      } catch (err) {

      }

      try {
        const resFollowedBYCount = await axios.get('http://localhost:3001/api/followedBYCount/' + this.userId);
        console.log("Followingcount" + resFollowedBYCount.data)

        this.followingcount = resFollowedBYCount.data.count

      } catch (err) {

      }

    },
    methods: {
      callEvent() {
        console.log("Event called");
        this.error = false

      },
      async likePost(mumur_id, userId) {
        console.log("mumur_id: " + mumur_id + "user_id: " + this.userId)
        const res = await axios.post('http://localhost:3001/api/murmurs/like', {
            user_id: this.userId,
            mumur_id: mumur_id
          })
          .then((response) => {
            console.log(response);
            this.refresh()
          });
      },
      async follow(followId){
          console.log("follower_user_id: " + followId + "user_id: " + this.userId)
        const res = await axios.post('http://localhost:3001/api/follower', {
            user_id: this.userId,
            follower_user_id: followId
          }).then((response) => {
            console.log(response);
            this.button_active= !this.bu
            this.refresh()
          });

      },
      async getInfo(userId){
            const resUserinfo = await axios.get('http://localhost:3001/api/user/' + this.userId)
            this.user = resUserinfo.data[0]
            console.log(this.user)
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
        console.log("Clicked");
        console.log(this.tweet)
        const body = {
          murmur_content: this.tweet,
          user_id: "1",
          like_count: 0,
          creation_date: "2020-12-14 1.5.30"
        }
        console.log(body);
        if (this.tweet == '') {
          console.log("tweet is missing !!!");
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
              console.log(response);
              this.refresh()
            });
        }
      },
      async refresh() {
        try {

          const resall = await axios.get('http://localhost:3001/api/all/' + this.userId);
          this.murmur = resall.data

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
  .left{
      float: left;
  }

</style>
