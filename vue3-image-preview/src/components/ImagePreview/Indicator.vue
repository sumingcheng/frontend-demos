<template>
   <span 
    :class="[
      'iconfont',
      `icon-arrow-${ dir }`
    ]"
    @click="handleImageSlide(dir)"
  ></span>
</template>

<script lang="ts" setup>
import { ARROW_DIRECTION } from './types';

const props = defineProps<{
  dir: ARROW_DIRECTION
}>();

const emit = defineEmits<{
  handleImageSlide: [ dir: ARROW_DIRECTION ]
}>();

const handleImageSlide = (dir: ARROW_DIRECTION) => {
  emit('handleImageSlide', dir);
}
</script>

<style lang="scss" scoped>
.iconfont {
  position: absolute;
  top: 110px;
  z-index: 1;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 3px 5px #000;
  transition: text-shadow .3s;
  cursor: pointer;

  &:hover {
    text-shadow: 1px 2px 3px #000;
  }

  &.icon-arrow-left {
    left: 20px;
  }

  &.icon-arrow-right {
    right: 20px;
  }
}
</style>