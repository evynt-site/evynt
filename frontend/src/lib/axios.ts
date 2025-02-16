import axios from "axios";
import { getModifiedCookieValues } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  //withCredentials: true, // ✅ Ensures cookies are sent/received
  headers: {
    //"Content-Type": "application/json",
    //"Accept": "application/json",
    //"X-XSRF-TOKEN": getCookie('XSRF-TOKEN'),
  }
});

function getCookie(name: string) {
  if (typeof document === 'undefined') {
    return null; // Handle server-side rendering or non-browser environments
  }

  const cookies = document.cookie;
  if (!cookies) {
    return null; // No cookies present
  }

  const cookieName = name + "=";
  const cookieArray = cookies.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1); // Remove leading spaces
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return null; // Cookie not found
}




export default instance;
