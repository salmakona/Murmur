<template>
    <div class="murmur">
      <p>{{ murmur }}</p>
    </div>

</template>

<script>
export default {
  name: "Murmur",
  props: ["murmur", "id"]
};
</script>

<style>
.murmur {
  padding: 1rem;
  border: 1px dotted #ccc;
  margin: 1rem 0;
}
</style>
