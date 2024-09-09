import { api } from "@/lib/api/api";
import { Product } from "@/types/product";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Image from "next/image";
import "./page.scss";
import { Button } from "@/components/Button";
import { formatNumberToCurrency } from "@/helpers/format";
import { Dropdown } from "@/components/Dropdown";
import { Link } from "@/components/Link";

type Products = Product[];

export default async function Home() {
  const res = await api.get("products");
  const products: Products = await res.data;
  return (
    <section className="products-wrapper">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-card__grid-row-1 padding-small">
            <div className="product-card__img">
              <Image fill src={product.image} alt={product.title} />
            </div>
          </div>

          <div className="product-card__grid-row-2 padding-small">
            <h1 className="product-card__title text-medium">{product.title}</h1>
            <div>
              <span className="product-card__price text-x-large">
                {formatNumberToCurrency(product.price)}
              </span>
              <Dropdown title="+">
                <Button style="secondary" className="" widthFull><Link href={`/product/${product.id}`}>Detalhes</Link></Button>
              </Dropdown>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
