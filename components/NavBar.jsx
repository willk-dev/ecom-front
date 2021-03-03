import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthContext from "../context/AuthContext";

export default function NavBar() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const homePath = router.pathname === "/";
  const goBack = (e) => {
    e.preventDefault();
    router.back();
  };
  return (
    <>
      <nav
        className="bg-white shadow-sm sticky top-0 z-20 w-11/12 mx-auto"
        role="navigation"
      >
        <div className="flex py-4 w-full justify-between items-baseline">
          <div className="px-6 cursor-pointer font-semibold text-xl ">
            {!homePath && <a onClick={goBack}>Back</a>}
          </div>
          <Link href="/" rel="home" className="justify-self-center flex-1">
            <a>
              <h1 className="text-4xl text-purple-600 uppercase font-bold">
                Kyse Store{" "}
              </h1>
            </a>
          </Link>
          <div className="px-6 cursor-pointer font-semibold text-xl">
            {user ? (
              <Link href="/account">{user.email}</Link>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
