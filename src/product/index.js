import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(function () {
    axios
      .get(
        `https://af6652e4-ff02-4a5b-9929-2a79fa4b39d6.mock.pstmn.io/products1/${id}`
      )
      .then(function (result) {
        setProduct(result.data);
        console.log("성공", result);
      })
      .catch(function (error) {
        console.error("에러발생 :", error);
      });
  }, []);

  if (product === null) {
    return <h1>상품 정보를 받고 있습니다...</h1>;
  } else {
    return (
      <div>
        <div id="image-box">
          <img src={"/" + product.imageUrl} />
        </div>
        <div id="profile-box">
          <img src="/images/icons/avatar.png" />
          <span>{product.seller}</span>
        </div>
        <div id="contents-box">
          <div id="name">{product.name}</div>
          <div id="price">{product.price}원</div>
          <div id="createdAt">2020년 12월 8일</div>
          <div id="description">{product.description}</div>
        </div>
      </div>
    );
  }
  console.log("이거", product);
}

export default ProductPage;
