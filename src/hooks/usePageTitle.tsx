import { useEffect } from "react";
import { WEBSITE_TITLE } from "../constants";

function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = WEBSITE_TITLE.replace(
      "%s",
      title || "Survival tools for Eve Online"
    );
  }, []);
}

export default usePageTitle;
