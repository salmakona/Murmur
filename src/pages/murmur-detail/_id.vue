<template>
  <div>
       <div class="card">
                           <img src="/iconfinder_user-alt_285645.png" width="50" height="50" />
  {{murmur.full_name}}
  <p>
  {{murmur.user_name}}
  </p>

      <div class="card-body">
        <div class="card">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
                {{murmur.murmur_content}}
              </li>
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
        userId:1
      }
    },
    mounted() {
      console.log(this.$route.params.id);

    },
    async created() {

      try {
        const resAll = await axios.get('http://localhost:3001/api/murmurs/murmurId/' + this.$route.params.id);
        this.murmur = resAll.data[0]

      } catch (err) {}


    },

     methods: {

      async likePost(mumur_id) {
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
      async refresh() {
    
      try {

       const resAll = await axios.get('http://localhost:3001/api/murmurs/murmurId/' + this.$route.params.id);
        this.murmur = resAll.data[0]

      } catch (err) {}
      }
    }

  }

</script>
<style scoped>

</style>
