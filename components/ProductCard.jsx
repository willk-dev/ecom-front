import { imageToUrl } from "../utils/urls";

export default function ProductCard({
  productTitle,
  productPrice,
  productImage,
}) {
  return (
    <div className="shadow-lg overflow-hidden rounded-xl min-w-xs mb-8">
      <div>
        <img
          src={imageToUrl(productImage)}
          alt=""
          className=" w-full h-56 inset-0"
        />
        <div className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className=" font-semibold flex-auto text-xl  order-xl-last block truncate-multi">
              {productTitle}
            </h1>
          </div>
          <div className="flex items-end space-x-3 mt-1 mb-3 text-sm font-medium">
            <div className="flex-1 text-2xl font-bold text-green-500 mt-2">
              {productPrice}
              <sup className=" text-xs ml-2">UGX</sup>
            </div>
            {/* <div className="flex-auto flex space-x-3">
              <button
                className="uppercase text-xs text-gray-800 font-bold w-1/2 flex items-center justify-center rounded-full bg-green-500 shadow-xl hover:shadow-lg"
                type="submit"
              >
                Read More
              </button>
            </div> */}
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
        </div>
      </div>
    </div>
  );
}
