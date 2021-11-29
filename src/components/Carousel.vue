<template>
  <div class="c-carousel">
    <img src="../assets/backgrounds/4-horizontal-original.jpg" alt="Sample">
  </div>
</template>

<style lang="scss" scoped>
.c-carousel {
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