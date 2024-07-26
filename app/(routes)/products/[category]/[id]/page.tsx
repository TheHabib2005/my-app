import ProductDeatails from '@/components/productDetails-components/ProductDeatails'
import React from 'react'

const page = async ({ params }: { params: { id: number } }) => {
    let fetchdata = async () => {

        try {
            let res = await fetch(`https://dummyjson.com/products/${params.id}`, {
                cache: "force-cache"
            });

            if (!res.ok) {
                return {
                    success: false,
                    message: "Failed to fetch product details"
                }
            }

            let data = await res.json();
            return data
        } catch (error) {
            return {
                success: false,
                message: "Failed to fetch product details catch"
            }
        }

    };


    let productData = await fetchdata();
    console.log(productData);

    return (
        <ProductDeatails id={params.id} />
    )
}

export default page