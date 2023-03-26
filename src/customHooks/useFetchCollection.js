import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);

  const getCollection = () => {
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (querySnapshot) => {
        const allData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(allData);
        console.log(allData);
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return {
    data,
  };
};

export default useFetchCollection;
