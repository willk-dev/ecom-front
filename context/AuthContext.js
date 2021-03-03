import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import { MAGIC_PUBLIC_KEY } from "../utils/urls";

const AuthContext = createContext();

let magicAuth;

export function AuthProvider(props) {
  const [user, setUser] = useState(null);

  const router = useRouter();
  useEffect(() => {
    magicAuth = new Magic(MAGIC_PUBLIC_KEY);
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedin = await magicAuth.user.isLoggedIn();
      if (isLoggedin) {
        const { email } = await magicAuth.user.getMetadata();
        setUser({ email });

        // just for tesing
        const token = await getToken();
        console.log("check user logged token", token);
      }
    } catch (error) {}
  };
  // login user by email
  const LoginUser = async (email) => {
    try {
      await magicAuth.auth.loginWithMagicLink({ email });
      setUser({ email });
      router.push("/");
    } catch (error) {
      setUser(null);
    }
  };
  // log user out
  const LogOutUser = async (email) => {
    try {
      await magicAuth.user.logout();
      setUser(null);
      router.push("/");
    } catch (error) {}
  };

  /**
   * retrives the magic issued barear token
   * this allows user to make authenticated requests
   */
  const getToken = async () => {
    try {
      const token = await magicAuth.user.getIdToken();
      return token;
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ user, LoginUser, LogOutUser, getToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
