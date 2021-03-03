import Head from "next/head";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { API_URL } from "../utils/urls";

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setLoading(true);
          const token = await getToken();
          const order_res = await fetch(`${API_URL}/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await order_res.json();
          setOrders(data);
        } catch (error) {
          setOrders([]);
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  return { orders, loading };
};

export default function account() {
  const { user, LogOutUser, getToken } = useContext(AuthContext);

  const { orders, loading } = useOrders(user, getToken);

  console.log("account orders", orders);

  const handleLogOut = (e) => {
    e.preventDefault();
    LogOutUser();
  };
  return (
    <div>
      <Head>
        <title>Kyse Store | Account</title>
        <meta name="description" content="Account Page" />
      </Head>
      {/* <!-- component --> */}

      <div className="container w-10/12 mt-4 mx-auto bg-opacity-80 rounded-lg max-w-max bg-white sm:max-w-full overflow-hidden shadow-lg">
        {!user ? (
          <div className="p-14 flex justify-center">
            <Link href="/login">
              <button className="border rounded-full py-2 px-4 text-xl font-semibold text-gray-700 outline-none focus:outline-none">
                LogIn
              </button>
            </Link>
          </div>
        ) : (
          <div className="text-center p-6  border-b">
            <img className="h-24 w-24 rounded-full mx-auto" src="" alt="" />
            <p className="pt-2 text-lg font-semibold">Randy Robertson</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <div className="mt-6">
              <button
                onClick={handleLogOut}
                className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-700 outline-none focus:outline-none"
              >
                LogOut
              </button>
            </div>
            <div className="mt-3 mb-2">
              <h1>Your Orders</h1>
              {loading && <p>Loading your orders</p>}
              <div>
                {orders.map((order) => (
                  <div key={order.id}>
                    <h1 className="font-semibold">{order.product.name}</h1>
                    <h2 className="font-medium">
                      {order.total.toLocaleString("en")} {order.status}
                    </h2>
                    <h5 className="text-sm">{order.product.updated_at}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
