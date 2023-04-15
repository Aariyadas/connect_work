import React from "react";
import {message} from "antd";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../apicalls/user";

function Login() {
  const onFinish = async (values) => {
    console.log("Before try Block");
    try {
      console.log("Inside try Block");
      const response = await LoginUser(values);
      console.log(values);

      if (response.success) {
        localStorage.setItem("token",response.data);

        message.success(response.message);
        window.location.href = "/";
      } else {
        throw new Error(response.message);
      }
      console.log(Error);
    } catch (error) {
      console.log("Inside Catch");
      message.error(error.message);
    }
    console.log("Afteer Catch");
  };
  return (
    <div className="grid grid-cols-2">
      <div className="bg-primary h-screen flex  flex-col justify-center items-center">
        <div>
          <h1 className="text-7xl text-white">Connect-Work</h1>
          <span className="text-white mt-5">
            One place to track all your records
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w=[420px]">
          <h1 className="text-2xl text-gray-700">Login to your account</h1>
          <Divider />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
            <div className="flex justify-center mt-5">
              <span>
                Don't have an account?<Link to="/register">Register</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
