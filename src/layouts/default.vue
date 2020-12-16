<template>
<div>
<header>
 <AppHeader/>
</header>

  <div class="container">
    <nuxt/>
  </div>
  <footer>
   <span class="d-block">@username</span>
  </footer>
</div>
</template>

<script>
import AppHeader from "../components/AppHeader";

export default {
  components: {
    AppHeader
  }
};
</script>


<style>

body {
  background: #f4f4f4;
}

a {
  color: #666;
  text-decoration: none;
}

ul {
  list-style: none;
}

.container {
  max-width: 100%;
  margin: 2rem auto;
  overflow: hidden;
  padding: 1rem 2rem;
  background: #0C131A;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .05);
  min-height:800px ;

}
#__layout{
  background: #0C131A;
}
.text-muted {
    color: #6c757d !important;
    font-size: 17px;
}
.text-white {
    color: #fff !important;
    font-weight: bolder;
    font-size: 24px;
}
.u-font{
      font-size: 12px;
    color: white;
}
</style>
