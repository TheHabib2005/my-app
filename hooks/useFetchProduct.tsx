import { delay } from "@/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";
const useFetchProduct = () => {
    const API_URL = process.env.BASE_API_URL;
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const fetchProduct = async (): Promise<any> => {
        let response = await fetch("https://dummyjson.com/products/")
        return response.json();

    };

    const { data, isFetching, error, isError, isLoading } = useQuery({
        queryKey: "data",
        queryFn: fetchProduct,
        onError: () => {
            alert()
        },
        onSuccess: (data) => {
            alert()
            console.log("data", data);
        }




    });


    return { data, isFetching, error, isError, isLoading };
};

export default useFetchProduct;
