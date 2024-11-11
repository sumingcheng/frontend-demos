<template>
  <div class="control-bar">
    <span 
      class="iconfont icon-rotate-left"
      @click="handleImageRotate(ARROW_DIRECTION.LEFT)"
    ></span>
    <span 
      class="iconfont icon-rotate-right"
      @click="handleImageRotate(ARROW_DIRECTION.RIGHT)"
    ></span>
    <span 
      class="iconfont icon-zoom-in"
      @click="handleImageScale(ZOOM.IN)"
    ></span>
    <span 
      class="iconfont icon-zoom-out"
      @click="handleImageScale(ZOOM.OUT)"
    ></span>
  </div>
</template>

<script lang="ts" setup>
import { ARROW_DIRECTION, ZOOM } from './types';

const emit = defineEmits<{
  handleImageRotate: [ dir: ARROW_DIRECTION ],
  handleImageScale: [zoom: ZOOM]
}>();

const handleImageRotate = (dir: ARROW_DIRECTION) => {
  emit('handleImageRotate', dir);
}

const handleImageScale = (zoom: ZOOM) => {
  emit('handleImageScale', zoom);
}
</script>

<style lang="scss">
.control-bar {
  position: absolute;
  bottom: 30px;
  left: 50%;
  z-index: 1;
  width: 120px;
  height: 30px;
  margin-left: -60px;

  .iconfont {
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    text-shadow: 1px 3px 5px #000;
    cursor: pointer;
    transition: text-shadow .3s;

    &:hover {
      text-shadow: 1px 2px 3px #000;
    }
  }
}
</style>