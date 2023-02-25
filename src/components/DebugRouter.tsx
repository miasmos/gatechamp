import { useLocation } from "react-router-dom";

function DebugRouter({ children }: { children: any }) {
  const location = useLocation();
  if (import.meta.env.DEV) {
    console.log(
      `Route: ${location.pathname}${location.search}, State: ${JSON.stringify(
        location.state
      )}`
    );
  }

  return children;
}

export default DebugRouter;
