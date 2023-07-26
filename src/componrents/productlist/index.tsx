import axios from "axios";
import React, { useContext, useEffect } from 'react'
import { ProductContext } from "../../context/productcontex";

const ProductList = () => {
    const {state,dispatch} = useContext(ProductContext);
    useEffect(()=>{
        const fetchProduct = async () =>{
            try {
                const {data} = await axios.get(`http://localhost:3000/products`);
                dispatch({type:"FETCH_PRODUCT",payload:data})
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchProduct();
    },[]);
    const addProduct = async (product:any) => {
        try {
            const {data} = await axios.post(`http://localhost:3000/products`,product);
            dispatch({type:"ADD_PRODUCT",payload:data})
        } catch (error) {
            console.log(error);
            
        }
    }
    const updateProduct = async (product:any) => {
        try {
            const {data} = await axios.put(`http://localhost:3000/products/${product.id}`,product);
            dispatch({type:"UPDATE_PRODUCT",payload:data})
        } catch (error) {
            console.log(error);
            
        }
    }
    const deleteProduct = async (product:any) =>{
        try {
             await axios.get(`http://localhost:3000/products/${product.id}`);
            dispatch({type:"DELETE_PRODUCT",payload:product})
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div>
        {state?.products?.map((item:any)=>(
            <div key={item.id}>
                {item.name}
                <button onClick={()=>updateProduct({id:item.id,name:"product edit"})}>update</button>
                <button onClick={()=>deleteProduct(item)}>delete</button>
            </div>
        ))}
        <button onClick={()=>addProduct({name:"product c"})}>add</button>
    </div>
  )
}

export default ProductList