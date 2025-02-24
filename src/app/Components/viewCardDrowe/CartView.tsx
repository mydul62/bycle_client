import { useEffect, useRef } from "react";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { setClose } from '@/app/redux/api/features/drowerSlice';
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { RootState } from "@/app/redux/store";
import { FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getTotalPrice, removeFromCart } from "@/app/redux/api/features/product/productSlice";

const CartView = () => {
  const carts = useAppSelector((state) => state.Product.items);
  const drawer = useAppSelector((state: RootState) => state.drower.open);
  const dispatch = useAppDispatch();
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const totalPrice = useAppSelector((state) => getTotalPrice(state.Product));
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        dispatch(setClose());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [dispatch]);

  return (
    <div
      ref={drawerRef} // Attach the ref here
      className={`fixed top-[0px] w-[80%] md:w-[20%] z-50 right-0 h-screen bg-white shadow-lg transition-transform transform ${
        drawer ? "translate-x-0" : "translate-x-full"
      } duration-300`}
    >
      <p className="p-3 flex items-center bg-[#1E3A3A]">
        <span onClick={() => dispatch(setClose())}>
          <BsArrowRightSquareFill size={20} color="white" />
        </span>
      </p>
      <div className="p-8">
        <h2 className="text-xl font-semibold">Cart</h2>
        <div className="mt-4 flex-grow overflow-y-auto max-h-[70vh]">
          {carts?.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            carts?.map((item, i) => (
              <div key={i} className="flex justify-between gap-6 items-center border-b py-2">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <div>
                  <button   onClick={() => {
                                            dispatch(removeFromCart(item._id));
                                          }}>
                    <FiDelete size={20} color="red" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">
            Total: ${totalPrice}
          </h3>
        </div>
        <Link to={"/shoppingcart"}>
          <Button  onClick={() => dispatch(setClose())} className="mt-4 bg-[#1E3A3A] text-white py-2 px-4 rounded">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartView;
