import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCookies } from "react-cookie";

const useFetch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookies] = useCookies(["token"]);


  const router = useRouter();
  const pathname = usePathname();

  const publicPath = [ "/login" ]

  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");
    const currentTime = Date.now();

    if (token && tokenTimestamp) {
      const expiryTime = parseInt(tokenTimestamp) + 24 * 60 * 60 * 1000; // 24 hours
      return currentTime < expiryTime;
    }
    return false;
  };


  useEffect(() => {
    // Token validation and initial login state setup
    if (isTokenValid()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("tokenTimestamp");
      if (pathname !== "/login") {
        router.push("/login");
      }
    }

    setLoading(false);

    // Listen for `localStorage` changes (for other tabs or windows)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token" && event.newValue === null) {
        setIsLoggedIn(false);
        router.push("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [pathname, router]);

  return { isLoggedIn, loading };
};

export default useFetch;
