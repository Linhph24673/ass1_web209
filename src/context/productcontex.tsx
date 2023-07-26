import { createContext, useReducer} from "react";

export const ProductContext = createContext({} as any);
const initialstate = {
    products : [],
    isloading : false,
    error : "",

};
const ProductReducer = (state:any,action:any) =>{
switch (action.type) {
    case "FETCH_PRODUCT":
        return {
            ...state,
            products : action.payload,
        };
        case "ADD_PRODUCT":
        return {
            ...state,
            products : [...state.products,action.payload],
        };
        case "UPDATE_PRODUCT":
        return {
            ...state,
            products : state.products.map((item:any)=>item.id === action.payload.id ? action.payload : item),
        };
        case "DELETE_PRODUCT":
        return {
            ...state,
            products : state.products.filter((item:any)=> item.id !== action.payload.id),
        };
       

    default:
    state;
}
}
const ProductProvider = ({children}:any) => {
      const [state,dispatch] = useReducer(ProductReducer,initialstate);
      return (
        <ProductContext.Provider value={{state,dispatch}}>{children}</ProductContext.Provider>
      )
}
export default ProductProvider