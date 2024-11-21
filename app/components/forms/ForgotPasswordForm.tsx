"use client";

import { IResetToken } from "@/app/utils/interface";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input } from "antd";
import { useResetToken } from "@/app/hooks/auth/auth.hook";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCookies } from 'react-cookie';



function ForgotPasswordForm(): JSX.Element { 
  const { resetToken } = useResetToken();
  const router = useRouter();
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [cookies, setCookie] = useCookies(['forgot_email']);


  const onFinish: FormProps<IResetToken>["onFinish"] = async (value) => {
    if (value) {
      const response = await resetToken?.mutateAsync(value);
      if (response.status === 200) {
        form.resetFields();
        setCookie('forgot_email', value.email);
        router.push('/password-reset')
      }
    }
  };

  const onFinishFailed: FormProps<IResetToken>["onFinishFailed"] = (
    errorInfo
  ) => {
    return errorInfo;
  };

  return (
    <Form
      name="validateOnly"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
      className="w-full font-BricolageGrotesqueRegular flex flex-col"
      style={{ fontFamily: "BricolageGrotesqueRegular" }}
    >
      <Form.Item
        label="Email Address"
        style={{ fontFamily: "BricolageGrotesqueRegular" }}
        className="font-BricolageGrotesqueRegular"
      >
        <Form.Item
          name={"email"}
          noStyle
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="placeholder:font-BricolageGrotesqueRegular"
          />
        </Form.Item>
      </Form.Item>

      <div className="flex flex-row items-center justify-between">
        <div
          onClick={() => router.back()}
          className="flex-center gap-2 cursor-pointer text-OWANBE_PRY underline hover:text-OWANBE_PRY font-BricolageGrotesqueSemiBold font-semibold"
        >
          <ArrowLeftOutlined /> <span>I remember my password</span>
        </div>
      </div>
      <br />
      <Form.Item style={{ marginTop: "20px" }}>
        <Button
          type="primary"
          htmlType="submit"
          className="font-BricolageGrotesqueLight text-base"
          style={{
            background: "#E20000",
            borderRadius: "25px",
            width: "100%",
            height: "51px",
          }}
          loading={resetToken?.isPending}
        >
          Continue
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ForgotPasswordForm;