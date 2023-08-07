import { useState } from "react";
import { useRouter } from "next/router";

const useSearchHook = () => {
  const router = useRouter();
  const { query }: any = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch()
    }
  };

  const handleSearch = () => {
    const updatedQuery = { ...query, search_text: searchValue };
    console.log("test for router", router);
    let url = router.asPath;

    const baseURL = url.split('?')[0];

    console.log("test for router", baseURL);

    const searchURL = `/search?page=1&search_text=${searchValue}`;
    router.push(searchURL);
    setSearchValue("")
  };
  return {
    searchValue,
    setSearchValue,
    handleSearch,
    handleKeyDown
  };

};

export default useSearchHook;
