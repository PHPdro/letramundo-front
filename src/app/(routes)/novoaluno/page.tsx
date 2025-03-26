"use client";
import { NavBar } from "@/components/Navbar";
import { Form, Select, Input } from "antd";
import Link from "next/link";

const NewStudent = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center px-48 w-full">
        <div className="w-full items-center justify-items-center flex-col">
          <div className="p-8 flex flex-col items-center border border-primary rounded-xl xl:w-[45%] lg:w-[70%] md:w-[100%] sm:w-[100%]">
            <h2 className="text-[22px] font-bold mb-5">Cadastro</h2>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
            >
              <Form.Item
                style={{ marginBottom: 10 }}
                label="Nome"
                name="username"
                rules={[{ required: true, message: "Digite o email!" }]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="Série"
                name="email"
                rules={[{ required: true, message: "Digite a série!" }]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="Turma"
                name="institute"
                rules={[{ required: true, message: "Digite a turma" }]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="Tema"
                name="password"
                rules={[{ required: true, message: "Digite a senha!" }]}
              >
                <Select />
              </Form.Item>
              <Form.Item
                label="Nível"
                name="password"
                rules={[{ required: true, message: "Digite a senha!" }]}
              >
                <Select />
              </Form.Item>
              <Form.Item label={null}>
                <button type="submit" className="bg-primary text-white w-full py-[5px] rounded-lg">
                  Adicionar aluno(a)
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div className="xl:flex lg:hidden md:hidden sm:hidden  justify-start">
        <div className="bg-[#fbe5a5] absolute bottom-0 h-20 w-20 rounded-tr-full" />
        <div className="bg-[#f8a680] absolute bottom-0 left-[70px] h-16 w-32 rounded-t-full" />
      </div>
      <div className="xl:flex lg:hidden md:hidden sm:hidden flex justify-end">
        <div className="bg-[#f8a29e] absolute bottom-0 h-40 w-44 right-0 rounded-tl-full" />
      </div>
    </div>
  );
};

export default NewStudent;
