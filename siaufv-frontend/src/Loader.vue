<template>

  <div id="loader" v-show="SET_LOADER" class="load">
    <div class="spin"></div>
    <div class="loading"><h5><b>CARREGANDO</b></h5></div>
  </div>

</template>

<script>
export default {
  name: "loader",

  computed: {
    SET_LOADER() {
      return this.$store.state.loader
    }
  }
};
</script>

<style>

  .load {
    position: fixed;
    top: 25%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  .spin {
    background: #00000020;
    height: 25vh;
    width: 25vh;
    border-radius: 50vh;
    border: 5px solid #00000000;
    border-top: 5px solid black;
    animation: loading 3s linear infinite;
  }
  .loading {
    position: absolute;
    color: black;
  }
  @keyframes loading {
    100% {
      transform: rotate(360deg);
    }
  }
</style>

