const flattenComponentsList = (componentsList: any) => {
  const componentsListFlattenArray = componentsList[0]?.component_list?.length > 0 ? componentsList[0].component_list?.flat() : [];
  return componentsListFlattenArray;
};

export default flattenComponentsList;
