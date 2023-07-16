import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { STORE_PRODUCTS, selectProduct } from "../../redux/slice/productSlice";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import StarsRating from "react-star-rate";
import { STORE_ORDERS } from "../../redux/slice/orderSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { Circles } from "react-loader-spinner";

const ReviewProduct = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { document } = useFetchDocument("products", id);
  const products = useSelector(selectProduct);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID: userID,
      userName: userName,
      productID: id,
      rate: rate,
      review: review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted succesfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className=" min-h-[100vh] px-2 mb-4 md:px-24">
      <div>
        <p className="text-2xl md:text-4xl mt-3 ">Review product</p>
        {product === null ? (
          <Circles
            height="80"
            width="80"
            color="#ffa500"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <div>
            <p className="mt-2 mb-6">
              <b>Product name: </b>
              {product.name}
            </p>
            <div>
              <img
                src={product.imageURL}
                alt={product.name}
                className="h-[150px]  w-auto"
              />
            </div>
            <div className="mt-6 rounded-xl shadow-xl p-3 w-fit">
              <form onSubmit={(e) => submitReview(e)}>
                <p>Rating </p>
                <StarsRating
                  value={rate}
                  onChange={(rate) => {
                    setRate(rate);
                  }}
                />
                <div className="flex flex-col min-w-[400px]">
                  <p>Review</p>
                  <textarea
                    value={review}
                    cols="30"
                    rows="10"
                    onChange={(e) => setReview(e.target.value)}
                    className="border-[2px] p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2 px-3 font-semibold text-white bg-blue-600 text-sm rounded-xl mt-2"
                >
                  Submit Rating
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ReviewProduct;
