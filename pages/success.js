import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API_URL } from "../utils/urls";

const useOrder = (session_id) => {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/orders/confirm`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ checkout_session: session_id }),
        });
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        setOrder(null);
      }

      setLoading(false);
    };

    fetchOrder();
  }, [session_id]);

  return { order, loading };
};

export default function success() {
  const router = useRouter();
  const { session_id } = router.query;

  const { order, loading } = useOrder(session_id);

  return (
    <div>
      <Head>
        <title>Thank You for you purchase</title>
      </Head>
      <div className="bg-white bg-opacity-80 w-10/12 rounded-lg mx-auto mt-8 mb-5 p-10">
        <h2> success</h2>
        {loading && <p>Loading...</p>}
        {order && <p>Your order is confirmed. Order number {order.id}</p>}
      </div>
    </div>
  );
}
