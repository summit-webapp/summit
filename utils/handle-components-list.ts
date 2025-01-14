const flattenComponentsList = (componentsList: any) => {
  const componentsListFlattenArray = componentsList?.associated_component?.length > 0 ? componentsList?.associated_component?.flat() : [];
  return componentsListFlattenArray;
};

export default flattenComponentsList;
