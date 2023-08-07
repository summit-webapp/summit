import { useState } from "react";

const useProductDetailFunctions = () => {
  const [generateSelectedVariants, setGenerateSelectedVariants] = useState<any>(
    {}
  );
  const [generateThumbnailOfVariants, setGenerateThumbnailOfVariants] =
    useState<any>({});

  const handleSettingOfSelectedVariantsAndThumbnailOfVariants = (
    variantsDataFromAPI: any
  ) => {
    console.log("working for modal slug custom function", variantsDataFromAPI);
    const temporaryStoreForSelectedVariant: any = {};
    // variants[0]?.
    variantsDataFromAPI?.attributes?.forEach((attribute: any) => {
      temporaryStoreForSelectedVariant[attribute.field_name] =
        attribute.default_value;
    });

    console.log(
      "working for modal slug from api selected variant",
      temporaryStoreForSelectedVariant
    );
    setGenerateSelectedVariants({ ...temporaryStoreForSelectedVariant });

    const displayThumbnailAttributes: any =
      variantsDataFromAPI?.attributes?.filter(
        (attr: any) => attr.display_thumbnail === true
      );

    console.log(
      "working for modal slug from api display thumbnail",
      displayThumbnailAttributes
    );

    var imgsValObj: any = displayThumbnailAttributes?.reduce(
      (acc: any, curr: any) => {
        acc[curr.field_name] = [];
        return acc;
      },
      {}
    );
    console.log("working for modal slug from api imgsValObj", imgsValObj);

    displayThumbnailAttributes?.forEach((attr: any) => {
      attr?.values?.map((value: any) => {
        variantsDataFromAPI?.variants?.find((variant: any) => {
          if (
            variant[attr.field_name] === value &&
            variant.image.length !== 0
          ) {
            imgsValObj[attr.field_name].push(variant.image[0]);
          }
        });
      });
    });

    console.log("thumbnail variants in hook", imgsValObj);

    const uniqueImgsValObj: any = {};
    for (const key in imgsValObj) {
      const uniqueValues: any = [];

      for (const value of imgsValObj[key]) {
        if (!uniqueValues.includes(value)) {
          uniqueValues.push(value);
        }
      }

      uniqueImgsValObj[key] = uniqueValues;
    }

    setGenerateThumbnailOfVariants({ ...uniqueImgsValObj });
    console.log(
      "working for modal slug check generated values",
      generateSelectedVariants,
      generateThumbnailOfVariants
    );

    return { generateSelectedVariants, generateThumbnailOfVariants };
  };

  return {
    handleSettingOfSelectedVariantsAndThumbnailOfVariants
  }
};

export default useProductDetailFunctions;
