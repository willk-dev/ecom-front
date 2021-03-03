import { useContext } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import AuthContext from "../context/AuthContext";
import { STRIPE_PK, API_URL } from "../utils/urls";

const stripePromise = loadStripe(STRIPE_PK);

export default function BuyButton({ product }) {
  const { user, getToken } = useContext(AuthContext);
  const router = useRouter();

  const redirectToLogin = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    const token = await getToken();

    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      body: JSON.stringify({ product }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const session = await res.json();

    return await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };
  return (
    <>
      {!user && (
        <button
          className="uppercase text-base text-gray-800 font-bold py-3 w-1/2 flex items-center justify-center rounded-full bg-green-500 shadow-xl hover:shadow-lg focus:outline-none"
          onClick={redirectToLogin}
        >
          Login to buy
        </button>
      )}
      {user && (
        <button
          className="uppercase text-base text-gray-800 font-bold py-3 w-1/2 flex items-center justify-center rounded-full bg-green-500 shadow-xl hover:shadow-lg focus:outline-none"
          onClick={handleBuy}
        >
          Buy Now
        </button>
      )}
    </>
  );
}
