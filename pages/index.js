import Head from "next/head";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { API_URL } from "../utils/urls";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Kyse Store | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container w-10/12 text-2xl mx-auto mt-4  pt-2 pb-3 px-8 font-semibold bg-white bg-opacity-40 rounded-lg max-w-max">
          Available Products
          <div className=" py-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <a>
                  <ProductCard
                    productImage={product.image}
                    productTitle={product.name}
                    productPrice={product.price}
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export const getStaticProps = async (ctx) => {
  const products_res = await fetch(`${API_URL}/products/`);
  const products = await products_res.json();
  return {
    props: {
      products,
    },
    revalidate: 1,
  };
};
