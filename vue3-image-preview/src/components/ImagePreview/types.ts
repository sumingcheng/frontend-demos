export interface IImageData {
  id: number;
  image: string;
  rotate: number;
  scale: number;
}

export enum ARROW_DIRECTION {
  LEFT = 'left',
  RIGHT = 'right'
}

export enum ZOOM {
  IN = 'in',
  OUT = 'out'
}