<template>
  
    <div>
    <div>
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
        <div class="card">
          <ul class="list-group list-group-flush" v-for="murmur in murmur" v-bind:key="murmur.id" v-bind:id="murmur.id">
            {{murmur.full_name}} -@{{murmur.user_name}} 
            <li class="list-group-item">
                            <nuxt-link :to="'murmur-detail/' + murmur.id">

              {{murmur.murmur_content.substring(0,100)+".."}}
                            </nuxt-link>
            </li>
            <h6><span class="badge badge-dark" @click="likePost(murmur.id)">Like</span> <span class="badge badge-secondary">{{murmur.like_count}}</span></h6>
            <h6><span class="badge badge-dark" @click="removePost(murmur.id)"> Delete</span> </h6>
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
        user: [],
        user_name:'',
        full_name:'',
        about_me:'',
        join_date:'',
        followersCount: [],
        followingcount: [],
        date: '',
        userId : 1
      }
    },
      async created(){
          try{
                
                 const resall = await axios.get('http://localhost:3001/api/all/'+this.userId
                );
            this.murmur = resall.data

          }catch(err){

            }
        try{
            const resuser  = await axios.get('http://localhost:3001/api/user/'+this.userId
            )

            this.user = resuser.data[0]
            console.log(this.user)
            this.user_name = this.user.user_name,
            this.full_name = this.user.full_name,
            this.about_me = this.user.about_me,
            this.join_date = this.user.join_date

        }catch(err){

        }
        try{

        const resfollowerCount = await axios.get('http://localhost:3001/api/followerCount/'+this.userId );
         this.followersCount = resfollowerCount.data.count
     
        }catch(err){

        }
     
        try{
            const resfollowedBYCount = await axios.get('http://localhost:3001/api/followingCount/'+this.userId);
            this.followingcount = resfollowedBYCount.data.count

        }catch(err){

        }
     
    },
    methods: {
      callEvent() {
        console.log("Event called");
        this.error = false

      },
      async likePost(mumur_id,userId){
        console.log("mumur_id: " + mumur_id + "user_id: "+ this.userId)
         const res = await axios.post('http://localhost:3001/api/murmurs/like', {
              user_id: this.userId,
              mumur_id:mumur_id
            })
            .then((response) => {
              console.log(response);
              this.refresh()
            });
      },

      async removePost(murmurId){
            const removeRes = await axios.delete('http://localhost:3001/api/murmurs/'+murmurId).then((response) => {
                console.log("Deleted Murmur");
                this.refresh()
            })
            

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
        try{
                
                 const resall = await axios.get('http://localhost:3001/api/all/'+this.userId
                );
            this.murmur = resall.data

          }catch(err){

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