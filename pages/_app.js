import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <div className="page-bg min-h-screen bg-gray-600">
      <AuthProvider>
        <NavBar />
        <Component {...pageProps} />
      </AuthProvider>
      <style jsx>
        {`
          .page-bg {
            background-color: #5d697a;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2305025e'/%3E%3Cstop offset='1' stop-color='%2305006b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%235d697a' cx='12' cy='12' r='12'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.45'/%3E%3C/svg%3E");
            background-attachment: fixed;
            background-size: cover;
          }
        `}
      </style>
    </div>
  );
}

export default MyApp;
