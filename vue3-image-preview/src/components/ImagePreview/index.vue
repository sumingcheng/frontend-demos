<template>
  <div class="image-preview">
    <indicator 
      :dir="ARROW_DIRECTION.LEFT"
      @handle-image-slide="handleImageSlide"
    ></indicator>
    <indicator 
      :dir="ARROW_DIRECTION.RIGHT"
      @handle-image-slide="handleImageSlide"
    ></indicator>
    <control-bar
      @handle-image-rotate="handleImageRotate"
      @handle-image-scale="handleImageScale"
    ></control-bar>
    <div 
      class="slider"
      :style="{
        width: sliderWidth + 'px',
        transform: `translate3d(-${ sliderLeft }px, 0, 0)`
      }"
    >
      <image-container 
        v-for="item of imageData"
        :key="item.id"
        :item="item"
      ></image-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ImageContainer from './ImageContainer.vue';
import Indicator from './Indicator.vue';
import ControlBar from './ControlBar.vue';
import { ARROW_DIRECTION, IImageData, ZOOM } from './types';

import {
  useSliderIndex,
  useSliderLeft,
  useImageData
} from './hooks';

const props = defineProps<{
  data: IImageData[]
}>();

const imgLen = props.data.length;
const sliderWidth = imgLen * 440;

const {
  sliderIndex,
  setSliderIndex
} = useSliderIndex(imgLen);

const {
  imageData,
  setImageRotate,
  setImageScale
} = useImageData(props.data);

const sliderLeft = useSliderLeft(sliderIndex);

const handleImageSlide = (dir: ARROW_DIRECTION) => {
  imageReset(sliderIndex.value);
  setSliderIndex(dir);
}

const handleImageRotate = (dir: ARROW_DIRECTION) => {
  setImageRotate(sliderIndex.value, dir);
}

const handleImageScale = (zoom: ZOOM) => {
  setImageScale(sliderIndex.value, zoom);
}

const imageReset = (sliderIndex: number) => {
  const target = imageData.value[sliderIndex];

  target.rotate = 0;
  target.scale = 1;
}

</script>

<style lang="scss">
.image-preview {
  position: relative;
  width: 440px;
  height: 248px;
  overflow: hidden;

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform .3s;
  }
}
</style>