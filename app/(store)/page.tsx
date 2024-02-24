import { api } from "@/lib/api/api";
import { Product } from "@/types/product";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Image from "next/image";
import "./page.scss";
import { Button } from "@/components/Button";
import { formatNumberToCurrency } from "@/helpers/format";

type Products = Product[];

export default async function Home() {
  const res = await api.get("products");
  const products: Products = await res.data;
  return (
    <section>
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-card__grid-row-1">
            <div className="product-card__img">
              <Image fill src={product.image} alt={product.title} />
            </div>
          </div>

          <div className="product-card__grid-row-2">
            <h1 className="product-card__title">{product.title}</h1>
            <div>
              <span className="product-card__price">
                {formatNumberToCurrency(product.price)}
              </span>
              <Button style="bluish-green-secondary">+</Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
