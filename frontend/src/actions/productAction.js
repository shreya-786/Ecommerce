
// import axios from "axios";
// import {
//     ALL_PRODUCT_FAIL,
//     ALL_PRODUCT_REQUEST,
//     ALL_PRODUCT_SUCCESS,
//     PRODUCT_DETAILS_REQUEST,
//     PRODUCT_DETAILS_FAIL,
//     PRODUCT_DETAILS_SUCCESS,
//     CLEAR_ERROR
// } from "../constants/productConstants";

// export const getProduct = (keyword = "",currentPage = 1, price= [0, 25000]) => async (dispatch) => {
//     try {
//         dispatch({ type: ALL_PRODUCT_REQUEST });

//         const link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
//         const { data } = await axios.get(link);

//         dispatch({
//             type: ALL_PRODUCT_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: ALL_PRODUCT_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };

// export const getProductDetails = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: PRODUCT_DETAILS_REQUEST });

//         const { data } = await axios.get(`/api/v1/product/${id}`);

//         dispatch({
//             type: PRODUCT_DETAILS_SUCCESS,
//             payload: data.product,
//         });
//     } catch (error) {
//         dispatch({
//             type: PRODUCT_DETAILS_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };

// // Clearing Errors
// export const clearErrors = () => async (dispatch) => {
//     dispatch({ type: CLEAR_ERROR });
// };
// import axios from "axios";
// import {
//     ALL_PRODUCT_FAIL,
//     ALL_PRODUCT_REQUEST,
//     ALL_PRODUCT_SUCCESS,
//     PRODUCT_DETAILS_REQUEST,
//     PRODUCT_DETAILS_FAIL,
//     PRODUCT_DETAILS_SUCCESS,
//     CLEAR_ERROR
// } from "../constants/productConstants";

// export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000]) => async (dispatch) => {
//     try {
//         dispatch({ type: ALL_PRODUCT_REQUEST });

//         // Ensure price values are numbers
//         const minPrice = Number(price[0]);
//         const maxPrice = Number(price[1]);

//         const link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${minPrice}&price[lte]=${maxPrice}`;
//         const { data } = await axios.get(link);

//         dispatch({
//             type: ALL_PRODUCT_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: ALL_PRODUCT_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };

// export const getProductDetails = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: PRODUCT_DETAILS_REQUEST });

//         const { data } = await axios.get(`/api/v1/product/${id}`);

//         dispatch({
//             type: PRODUCT_DETAILS_SUCCESS,
//             payload: data.product,
//         });
//     } catch (error) {
//         dispatch({
//             type: PRODUCT_DETAILS_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };

// // Clearing Errors
// export const clearErrors = () => async (dispatch) => {
//     dispatch({ type: CLEAR_ERROR });
// };
import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERROR
} from "../constants/productConstants";

export const getProduct = (keyword = "", currentPage = 1, price = [0, 10000], category) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        // Ensure price values are numbers
        const minPrice = Number(price[0]);
        const maxPrice = Number(price[1]);

        let  link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${minPrice}&price[lte]=${maxPrice}`;

        if(category){
            link += `&category=${category}`;
        }
        const { data } = await axios.get(link);

        console.log(link);
        console.log(data);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
