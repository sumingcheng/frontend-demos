import { Ref, ref, computed } from "vue";
import { ARROW_DIRECTION, IImageData, ZOOM } from "./types";

export function useSliderLeft (sliderIndex: Ref) {
  const sliderLeft = computed(() => sliderIndex.value * 440);
  return sliderLeft;
}

export function useSliderIndex (imgLength: number) {
  const sliderIndex = ref(0);

  const setSliderIndex = (dir: ARROW_DIRECTION) => {
    const index = sliderIndex.value;

    switch (dir) {
      case ARROW_DIRECTION.RIGHT:
        sliderIndex.value = index >= imgLength - 1 ? 0 : index + 1;
        break;
      case ARROW_DIRECTION.LEFT:
        sliderIndex.value = index === 0 ? imgLength - 1 : index - 1;
        break;
      default:
        break;
    }
  }

  return {
    sliderIndex,
    setSliderIndex
  }
}

export function useImageData (images: IImageData[]) {
  const imageData = ref(images);

  const setImageRotate = (sliderIndex: number, dir: ARROW_DIRECTION) => {
    const rotate = imageData.value[sliderIndex].rotate;

    switch (dir) {
      case ARROW_DIRECTION.LEFT:
        imageData.value[sliderIndex].rotate = rotate - 10;
        break;
      case ARROW_DIRECTION.RIGHT:
        imageData.value[sliderIndex].rotate = rotate + 10;
        break;
      default:
        break;
    }
  }

  const setImageScale = (sliderIndex: number, zoom: ZOOM) => {
    const scale = imageData.value[sliderIndex].scale;

    switch (zoom) {
      case ZOOM.IN:
        scale < 3 && (imageData.value[sliderIndex].scale += .1);
        break;
      case ZOOM.OUT:
        scale > .2 && (imageData.value[sliderIndex].scale -= .1);
        break;
      default:
        break;
    }
  }

  return {
    imageData,
    setImageRotate,
    setImageScale
  }
}
