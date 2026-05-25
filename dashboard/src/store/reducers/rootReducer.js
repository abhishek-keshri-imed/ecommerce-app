import authReducer from "./authReducer";
import sellerReducer from "./sellerReducer";
import categoryReducer from "./categoryReducer";

/**
 * ROOT REDUCER OBJECT
 * This object defines the structure of your entire Redux State.
 * Each key represents a "slice" of your global data.
 */
const rootReducer = {
    // This key 'auth' is how you will access auth data via useSelector
    // e.g., const { adminInfo } = useSelector(state => state.auth)
    auth: authReducer, 
    seller: sellerReducer,
    category: categoryReducer,
    
    // Future expansion:
    // When you create a productReducer.js or cartReducer.js, 
    // you simply import them and add them to this object.
    // cart: cartReducer,
    // product: productReducer,
};

export default rootReducer;