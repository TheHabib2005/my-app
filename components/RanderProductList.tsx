"use client";
// components/MyComponent.server.jsx
import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";
import ProductCardSkeleton from "./ProductCardSkelection";
import ProductCard from "./productCard";
import Pagination from "./Pagination";
import { productData } from "@/data";
import ProductNotFound from "./Product-not-found";
import Error from "./Error";
import ProductsSkelection from "./ProductsSkelection";
import Loader from "./Loader";

export default function RenderProductList() {
    let data = [""];
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(false);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    useEffect(() => {
        setloading(true);
        setTimeout(() => {
            setloading(false);
        }, 300);
    }, [params.toString()]);

    if (loading) {
        return <ProductsSkelection />;
    }

    if (error) {
        return <Error />;
    }
    if (data.length <= 0 && !loading) {
        return <ProductNotFound />;
    }

    return (
        <div>
            <div className="grid grid-flow-row xl:gap-6 gap-4 grid-cols-1 sm:grid-cols-2 w-full lg:grid-cols-2 xl:grid-cols-4 pt-3   pb-5   ">
                {productData.map((product, index) => {
                    return <ProductCard product={product} index={index} key={index} />;
                })}
            </div>
            <div className="my-10">
                {!loading && <Pagination paginationItems={20} />}
            </div>
        </div>
    );
}
