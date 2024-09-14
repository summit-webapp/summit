export interface Variant {
  variant_code: string;
  slug: string;
  Colour: string;
  Size: string;
  stock: boolean;
}

export interface Attribute {
  field_name: string;
  label: string;
  values: string[];
}

export interface VariantData {
  variants: Variant[];
  attributes: Attribute[];
}
