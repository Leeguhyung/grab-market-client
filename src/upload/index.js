import { Button, Form, InputNumber, Upload, message } from "antd";
import { Divider, Input } from "antd";
import "./index.css";
import { useState } from "react";
import { API_URL } from "../config/constant";
import axios from "axios";
import {useHistory} from "react-router-dom";
function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();
  const onSubmit = (values) => {
    console.log(values);
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        price: parseInt(values.price),
        seller: values.seller,
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log("성공", result);
        history.replace("/");
      }).catch((error) => {
        console.error("에러발생", error);
        message.error(`에러가 발생했습니다. ${error.message}`)
      });
  };
  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };
  return (
    <div id="upload-container">
      <Form name="상품업로드" onFinish={onSubmit}>
        <Form.Item
          name="upload"
          label={<div className="upload-label">상품 사진</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img id="upload-image" src={`${API_URL}/${imageUrl}`} />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png"></img>
                <span>이미지를 업로드해주세요.</span>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Divider />

        <Form.Item
          name="seller"
          label={<div className="upload-label">판매자 명</div>}
          rules={[{ required: true, message: "판매자이름을 입력해주세요" }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="이름을 입력해주세요"
          />
        </Form.Item>

        <Divider />

        <Form.Item
          name="name"
          label={<div className="upload-label">상품이름</div>}
          rules={[{ required: true, message: "상품이름을 입력해주세요" }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="상품이름을 입력해주세요"
          />
        </Form.Item>

        <Divider />

        <Form.Item
          name="price"
          label={<div className="upload-label">상품가격</div>}
          rules={[{ required: true, message: "상품가격을 입력해주세요" }]}
        >
          <InputNumber defaultValue={0} className="upload-price" size="large" />
        </Form.Item>

        <Divider />

        <Form.Item
          name="description"
          label={<div className="upload-label">상품 소개</div>}
          rules={[{ required: true, message: "상품소개를 입력해주세요" }]}
        >
          <Input.TextArea
            size="large"
            id="product-description"
            showCount={true}
            maxLength={300}
            placeholder="상품소개를 적어주세요"
          />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            문제 등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
