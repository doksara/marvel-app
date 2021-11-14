<template>
  <div class="carousel">
    <img src="../assets/background.jpg" alt="Sample">
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 20rem;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    position: absolute;
    object-fit: contain;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -60%);
  }
}
</style>