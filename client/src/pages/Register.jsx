import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";

const Register = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (values) => {
    const base = new FormData()
    base.append("name",values?.name);
    base.append("email",values?.email);
    base.append("password",values?.password);
     axios.post("/register", base).then(data=>{
      console.log(data.data);
      localStorage.setItem("user", JSON.stringify(data.data));
      
     }).catch(err=>{
      console.log(err?.response?.data?.error);
      alert(err?.response?.data?.error)
     });
    // if (data.response.data.error) {
    // } else {
    //   localStorage.setItem("user", JSON.stringify(data));
    //   console.log(data);
    // }
  };

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
      className="page"
    >
      <div className="register">
        <div className="register_div">
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
              className="mt-2 mb-2"
            />
          </Form.Item>
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
                Sign in
              </Button>
            )}
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default Register;
