<template>
  <div class="image-container">
    <img 
      :src="require(`../../assets/images/${ item.image }`)" 
      :style="{
        transform: `rotate(${ item.rotate }deg) scale(${ item.scale })`
      }"
      draggable="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { IImageData } from './types';

const props = defineProps<{
  item: IImageData
}>();
</script>

<style lang="scss">
.image-container {
  float: left;
  width: 440px;
  height: 248px;

  img {
    width: 100%;
    height: 100%;
    transition: all .3s;
  }
}
</style>