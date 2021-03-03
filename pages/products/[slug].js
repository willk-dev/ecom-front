import Head from "next/head";
import { imageToUrl, API_URL } from "../../utils/urls";
import BuyButton from "../../components/BuyButton";

const Product = ({ product }) => {
  return (
    <>
      <Head>
        {product.meta_title && <title>Kyse Store | {product.meta_title}</title>}
        {product.meta_description && (
          <meta name="description" content={product.meta_description} />
        )}

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container w-10/12 mt-4 mx-auto flex flex-col justify-center p-10 overflow-hidden bg-white bg-opacity-40 rounded-lg max-w-max">
        <div className="flex">
          <div className="flex-none w-4/12 relative">
            <img
              src={imageToUrl(product.image)}
              alt=""
              className="absolute inset-0 w-full h-full objct-cover"
            />
          </div>
          <form className="flex-auto p-6">
            <div className="flex flex-wrap">
              <h1 className="font-bold flex-auto text-4xl ">{product.name}</h1>

              <div className="w-full flex-none text-3xl font-bold text-green-500 mt-2 ">
                {product.price} <sup className="text-xs font-medium">UGX</sup>
              </div>
            </div>
            <p className="mt-4 mb-6 text-sm font-medium">{product.content}</p>
            <div className="flex items-end space-x-3 mt-1 mb-3 text-sm font-medium">
              <div className="flex-auto flex space-x-3">
                <BuyButton product={product} />
              </div>
              <button
                className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-gray-400 outline-none focus:outline-none hover:animate-ping"
                type="button"
                aria-label="cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-7 w-7 text-red-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
              <button
                className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-gray-400 outline-none focus:outline-none hover:animate-ping "
                type="button"
                aria-label="like"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-7 w-7 text-red-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  // retrive all possible paths
  const products_res = await fetch(`${API_URL}/products/`);
  const products = await products_res.json();

  // return them to nextJs context
  return {
    paths: products.map((product) => ({
      params: { slug: String(product.slug) },
    })),
    fallback: false, // tells nextjs to show 404 if params is not matched
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const products_res = await fetch(`${API_URL}/products/?slug=${slug}`);
  const found = await products_res.json();
  return {
    props: {
      product: found[0], // the api response is an array and should be recieved as such
    },
  };
};

export default Product;
