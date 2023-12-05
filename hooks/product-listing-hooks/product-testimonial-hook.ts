import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchProductListTestimonial, product_list_testimonial } from '../../store/slices/product-listing-page-slices/product-testimonial';
const useProductListTestimonial = () => {
    let [testimonial, setTestimonial] = useState<any>([]);
    let [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const { query } = useRouter()
    // console.log(query, "@123")
    const ProductTestimonial: any = useSelector(product_list_testimonial);
    useEffect(() => {
        dispatch(fetchProductListTestimonial(query?.category));
        setLoading(true);
    }, []);
    console.log('testimonial', testimonial);
    useEffect(() => {
        setTestimonial(ProductTestimonial?.items?.data?.message?.data);
    }, [ProductTestimonial]);
    console.log('ProductTestimonial', ProductTestimonial);
    return {
        ProductTestimonial,
        loading,
    };
};
export default useProductListTestimonial;
