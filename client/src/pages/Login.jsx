import React, { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProduct } from "./Context";

const Login = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [state,setState] = useProduct()
  const navigate = useNavigate()

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (values) => {
    const base = new FormData()
    base.append("email",values?.email);
    base.append("password",values?.password);
    let { data } = await axios.post("/login", base);
    console.log(data);
    if (data.error) {
      alert(data.error);
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      setState(data)
      alert("Login in")
      navigate('/')
    }
  };
  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
      className="page2"
    >
      <div className="login">
        <div className="login_div">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="mt-2 mb-2"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              className="mt-2 mb-2"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default Login;
