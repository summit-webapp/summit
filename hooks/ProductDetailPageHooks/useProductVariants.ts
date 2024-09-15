import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useProductVariants = (productVariantData: any) => {
  const router = useRouter();
  const { query } = useRouter();
  const [selectedAttributes, setSelectedAttributes] = useState<any>({
    Colour: null,
    Size: null,
  });
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [unavailableErr, setUnavailableErr] = useState('');

  // Handler to update the selected attribute
  const handleAttributeClick = (fieldName: string, value: string) => {
    // Update selected attributes
    const updatedAttributes = { ...selectedAttributes, [fieldName]: value };
    setSelectedAttributes(updatedAttributes);

    // Find the slug of the variant that matches the updated attributes
    const matchingVariant = productVariantData?.variants.find(
      (variant: any) =>
        (updatedAttributes.Colour ? variant.Colour === updatedAttributes.Colour : true) &&
        (updatedAttributes.Size ? variant.Size === updatedAttributes.Size : true)
    );

    if (matchingVariant) {
      setSelectedSlug(matchingVariant?.slug);
      router.push({
        query: { ...query, productId: matchingVariant?.slug },
      });
    } else {
      setSelectedSlug(null); // No matching variant found
      setUnavailableErr('Currently Unavailable !!');
    }
  };
  const getAvailableOptions = (fieldName: string, selectedValue: string | null) => {
    if (!productVariantData?.variants) return [];

    // Gather all unique values for the specified field
    const allValues = productVariantData.variants
      .map((variant: any) => variant[fieldName])
      .filter((value: any, index: number, self: any[]) => self.indexOf(value) === index);

    // If the selected value is present in the variants, include it in the available options
    const selectedAvailable = allValues.includes(selectedValue) ? [selectedValue] : [];

    // Filter variants based on the selected attribute's value and return unique values
    const filteredValues = productVariantData.variants
      .filter((variant: any) =>
        fieldName === 'Colour'
          ? selectedAttributes.Size
            ? variant.Size === selectedAttributes.Size
            : true
          : selectedAttributes.Colour
            ? variant.Colour === selectedAttributes.Colour
            : true
      )
      .map((variant: any) => variant[fieldName])
      .filter((value: any, index: number, self: any[]) => self.indexOf(value) === index);

    // Combine selected value with filtered values to ensure the selected value is shown if applicable
    return Array.from(new Set([...selectedAvailable, ...filteredValues]));
  };

  // Determine available colors and sizes based on selected attributes
  const availableColors = getAvailableOptions('Colour', selectedAttributes.Colour);
  const availableSizes = getAvailableOptions('Size', selectedAttributes.Size);
  useEffect(() => {
    if (productVariantData?.variants && query?.productId) {
      // Find the variant that matches the slug
      const matchingVariant = productVariantData.variants.find((variant: any) => variant.slug === query?.productId);
      if (matchingVariant) {
        // Set default attribute values based on the matching variant
        setSelectedAttributes({
          Colour: matchingVariant.Colour,
          Size: matchingVariant.Size,
        });
      }
    }
  }, [productVariantData, query?.productId]);
  return { selectedSlug, unavailableErr, selectedAttributes, availableColors, availableSizes, handleAttributeClick };
};
export default useProductVariants;
