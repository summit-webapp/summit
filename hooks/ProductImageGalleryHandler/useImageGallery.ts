import { useState } from 'react';
import { CONSTANTS } from '../../services/config/app-config';

const useImageGallery = ({ slideShowImages }: any) => {
  console.log(slideShowImages);
  const [enlargeImg, setEnlargeImg] = useState<string>(slideShowImages?.[0] || ''); // Track the enlarged image
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0); // Track the active thumbnail index

  const handleSelectedImage = (image: string, i: number) => {
    setEnlargeImg(image);
    setActiveImgIndex(i); // Update the active index
  };

  // Create srcSet for different screen resolutions
  const generateSrcSet = (image: string) => {
    return `${CONSTANTS.API_BASE_URL}/${image} 600w,
            ${CONSTANTS.API_BASE_URL}/${image} 1200w,
            ${CONSTANTS.API_BASE_URL}/${image} 1800w`;
  };

  return { enlargeImg, activeImgIndex, handleSelectedImage, generateSrcSet };
};

export default useImageGallery;
