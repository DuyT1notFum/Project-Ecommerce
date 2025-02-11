import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalContext } from "./Global";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const cartItem = useSelector((state) => state.cartItem.cart);
    const user = useSelector((state) => state?.user);

    const fetchCartItem = async () => {
        try {
            const response = await Axios({
                ...summaryApi.getCartItem,
            });
            const { data: responseData } = response;

            if (responseData.success) {
                dispatch(handleAddItemCart(responseData.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateCartItem = async (id, qty) => {
        try {
            const response = await Axios({
                ...summaryApi.updateCartItemQty,
                data: {
                    _id: id,
                    qty: qty,
                },
            });
            const { data: responseData } = response;

            if (responseData.success) {
                fetchCartItem();
                return responseData;
            }
        } catch (error) {
            AxiosToastError(error);
            return error;
        }
    };

    const deleteCartItem = async (cartId) => {
        try {
            const response = await Axios({
                ...summaryApi.deleteCartItem,
                data: {
                    _id: cartId,
                },
            });
            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                fetchCartItem();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    useEffect(() => {
        const qty = cartItem.reduce((prev, curr) => {
            return prev + curr.quantity;
        }, 0);
        setTotalQty(qty);

        const tPrice = cartItem.reduce((prev, curr) => {
            const priceAfterDiscount = pricewithDiscount(
                curr?.productId?.price,
                curr?.productId?.discount
            );

            return prev + priceAfterDiscount * curr.quantity;
        }, 0);
        setTotalPrice(tPrice);

        const notDiscountPrice = cartItem.reduce((prev, curr) => {
            return prev + curr?.productId?.price * curr.quantity;
        }, 0);
        setNotDiscountTotalPrice(notDiscountPrice);
    }, [cartItem]);

    const handleLogoutOut = () => {
        localStorage.clear();
        dispatch(handleAddItemCart([]));
    };

    const fetchAddress = async () => {
        try {
            const response = await Axios({
                ...summaryApi.getAddress,
            });
            const { data: responseData } = response;

            if (responseData.success) {
                dispatch(handleAddAddress(responseData.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchOrder = async () => {
        try {
            const response = await Axios({
                ...summaryApi.getOrderItems,
            });
            const { data: responseData } = response;

            if (responseData.success) {
                dispatch(setOrder(responseData.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCartItem();
        handleLogoutOut();
        fetchAddress();
        fetchOrder();
    }, [user]);

    return (
        <GlobalContext.Provider
            value={{
                fetchCartItem,
                updateCartItem,
                deleteCartItem,
                fetchAddress,
                totalPrice,
                totalQty,
                notDiscountTotalPrice,
                fetchOrder,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
