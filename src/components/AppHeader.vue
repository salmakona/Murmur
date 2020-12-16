<template>

  <header class="header">
    <nuxt-link to="/"> <h1 class="title">Murmur</h1></nuxt-link>
    <ul>
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/profile">Profile</nuxt-link>
      </li>
    </ul>
  </header>

</template>

<script>
  export default {
    name: "AppHeader"
  };

</script>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px dotted #ccc;
    background-color: black;
  }

  .header .title {
    font-size: 3rem;
    color: white;;
  }

  .header ul {
    display: flex;
  }

  .header a {
    display: inline-block;
    /* background: #333; */
    color: #fff;
    padding: 0.3rem 1rem;
    margin-right: 0.5rem;
  }

</style>
