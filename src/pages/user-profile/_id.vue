<template>
  <div>
    <div>
      <h1>User profile</h1>
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
        <div class="card">
          <ul class="list-group list-group-flush" v-for="murmur in murmur" v-bind:key="murmur.id" v-bind:id="murmur.id">
            {{murmur.full_name}} -@{{murmur.user_name}}
            <li class="list-group-item">{{murmur.murmur_content}}</li>

            <h6><span class="badge badge-dark" @click="likePost(murmur.id)">Like</span> <span
                class="badge badge-secondary">{{murmur.like_count}}</span></h6>
          </ul>
        </div>
      </div>
    </div>

  </div>



</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        murmur: [],
        user: [],
        user_name: '',
        full_name: '',
        about_me: '',
        join_date: '',
        followersCount: [],
        followingcount: [],
      }
    },
    mounted() {
      console.log(this.$route.params.id);

    },


    async created() {
      try {
        const resUser = await axios.get('http://localhost:3001/api/user/' + this.$route.params.id)

        this.user = resUser.data[0]
        console.log(this.user)
        this.user_name = this.user.user_name,
          this.full_name = this.user.full_name,
          this.about_me = this.user.about_me,
          this.join_date = this.user.join_date

      } catch (err) {}

      try {

        const resAll = await axios.get('http://localhost:3001/api/all/' + this.$route.params.id);
        this.murmur = resAll.data

      } catch (err) {}

      try {

        const resFollowerCount = await axios.get('http://localhost:3001/api/followerCount/' + this.$route.params.id);
        console.log("Folowed count")
        this.followersCount = resFollowerCount.data.count

      } catch (err) {

      }

      try {
        const resFollowedBYCount = await axios.get('http://localhost:3001/api/followerCount/' + this.$route.params.id);
        console.log("Followingcount" + resFollowedBYCount.data)

        this.followingcount = resFollowedBYCount.data.count

      } catch (err) {

      }

    },
    methods: {

      async likePost(mumur_id, userId) {
        console.log("mumur_id: " + mumur_id + "user_id: " + this.$route.params.id)
        const res = await axios.post('http://localhost:3001/api/murmurs/like', {
            user_id: this.$route.params.id,
            mumur_id: mumur_id
          })
          .then((response) => {
            console.log(response);
            this.refresh()
          });
      },
      async refresh() {
    
      try {

        const resAll = await axios.get('http://localhost:3001/api/all/' + this.$route.params.id);
        this.murmur = resAll.data

      } catch (err) {}
      }
    }
  }

</script>

<style scoped>

</style>
