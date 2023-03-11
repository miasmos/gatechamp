import { useEffect } from "react";
import { WEBSITE_TITLE } from "../constants";

function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = WEBSITE_TITLE.replace(
      "%s",
      title || "Check while you jump"
    );
  }, []);
}

export default usePageTitle;
