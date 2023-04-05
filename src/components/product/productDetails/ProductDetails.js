import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/config";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  console.log(id);

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return <div>ProductDetails</div>;
};

export default ProductDetails;
