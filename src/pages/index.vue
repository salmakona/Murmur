<template>
  <div>
    <h1>Display Murmur Here ....</h1>
    <Murmur v-for="murmur in murmur" v-bind:key="murmur.id" v-bind:id="murmur.id" v-bind:murmur="murmur.murmur_content"/>
  </div>
</template>

<script>
import axios from "axios";
import Murmur from '../components/Murmur';
export default {
  
     data(){
            return {
              murmur: []
            }
        },
        async fetch(){
            this.murmur = await fetch(
            'http://localhost:3001/murmurs'
          ).then(res => res.json())
        }
      

}
</script>
