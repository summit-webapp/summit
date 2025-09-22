export interface ProductSlideshowImages {
  slideShowImages: string[];
  selectedImageBasedOnSelectedTone: number;
  setSelectedImageBasedOnSelectedTone: (i: number) => void;
}
