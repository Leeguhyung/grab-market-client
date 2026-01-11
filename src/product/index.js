import { useParams } from "react-router-dom";

function ProductPage() {
  const params = useParams();
  const id = params.id;
  return <h1>상품페이지 {id}</h1>;
}

export default ProductPage;
