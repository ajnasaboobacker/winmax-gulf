import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      // Find the element with the id from the hash
      const id = hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        // We use a timeout to ensure the element is rendered
        // especially when using AnimatePresence mode="wait" (0.5s)
        const timeoutId = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 600);
        return () => clearTimeout(timeoutId);
      }
    } else {
      // If no hash, scroll to top on page change
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash, key]);

  return null;
};

export default ScrollToHash;
