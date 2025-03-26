"use client";
import { Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";

const PasswordRecovery = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="flex justify-end">
        <div className="bg-[#f4a460] h-32 w-32 rounded-bl-full" />
      </div>
      <div className="flex align-middle justify-center lg:flex-row sm:flex-col md:flex-col container mx-auto mt-10 sm:px-6 lg:px-8">
        <div className="lg:block sm:hidden md:hidden relative flex flex-col w-[50%]">
          <div className="absolute bottom-6 z-10">
            <Image alt="criança se questionando" src="/criança_duvida.svg" width={173} height={271} />
          </div>
          <div className="absolute left-[25%] -top-3 rotate-12 z-10">
            <Image alt="interrogação" src="/interrogaçao.svg" width={54} height={54} />
          </div>
          <div className="absolute left-[30%] bottom-11 z-10">
            <Image alt="bola" src="/ball.png" width={54} height={54} />
          </div>
          <div className="absolute left-[50%] bottom-8 z-10">
            <Image alt="brinquedo" src="/toy.png" width={64} height={81} />
          </div>
          <div className="absolute bottom-5 z-0">
            <Image alt="tapete" src="/tapete.svg" width={482} height={90} />
          </div>
        </div>
        <div className="p-12 lg:w-[40%] sm:w-full md:w-full">
          <h2 className="text-[32px] font-bold mb-9">Esqueceu sua senha?</h2>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item label={null} name="username" rules={[{ required: true, message: "Digite o email!" }]}>
              <Input type="email" placeholder="Digite o email" />
            </Form.Item>

            <Form.Item label={null}>
              <button type="submit" className="bg-primary text-white w-full py-[5px] rounded-lg">
                Resgatar senha
              </button>
            </Form.Item>
          </Form>
          <p className="text-sm font-light text-center">
            <Link href={"/login"}>
              <span className="text-primary underline">Voltar ao login</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-[#f4a460] absolute bottom-0 h-40 w-40 rounded-tr-full" />
        <div className="bg-[#fbe5a5] absolute bottom-0 left-[120px] h-28 w-56 rounded-t-full" />
      </div>
    </div>
  );
};

export default PasswordRecovery;
