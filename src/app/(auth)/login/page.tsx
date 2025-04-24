"use client";
import { request } from "@/api/config";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { Form, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const route = useRouter();
  const onFinish = async (values: any) => {
    try {
      const response = await request({
        endpoint: "login",
        data: values,
        method: "POST",
      });
      localStorage.setItem("auth", response.data.token);
      route.push("/inicio");
    } catch (error) {
      message.error("Erro ao fazer login, verifique suas credenciais.");
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="flex justify-end">
        <div className="bg-[#f4a460] h-32 w-32 rounded-bl-full" />
      </div>
      <div className="flex flex-row justify-between container mx-auto sm:px-6 lg:px-8">
        <div>
          <Image alt="logo" src="/LetraMundo.png" width={200} height={200} />
          <h2 className="mt-12 text-[33px] font-semibold">Aprender é para todos!</h2>
          <h3 className="mt-4 mb-8 text-[20px] font-light max-w-[28rem]">
            Acreditamos no poder da educação inclusiva para transformar vidas.
          </h3>
          <ul>
            <li className="flex flex-row items-center gap-1 font-bold">
              <CheckCircleIcon width={20} height={20} color="#36bc9b" /> Ferramentas inclusivas
            </li>
            <li className="flex flex-row items-center gap-1 font-bold">
              <CheckCircleIcon width={20} height={20} color="#36bc9b" />
              Educação personalizada
            </li>
            <li className="flex flex-row items-center gap-1 font-bold">
              <CheckCircleIcon width={20} height={20} color="#36bc9b" />
              Comunidade de apoio
            </li>
            <li className="flex flex-row items-center gap-1 font-bold">
              <CheckCircleIcon width={20} height={20} color="#36bc9b" />
              100% gratuito
            </li>
          </ul>
        </div>
        <div className="p-12 flex flex-col justify-center w-[400px] max-h-[460px] border border-primary rounded-xl">
          <h2 className="text-[22px] font-bold mb-9">Entrar</h2>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            style={{ width: "100%" }}
          >
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Digite o email!" }]}>
              <Input type="email" />
            </Form.Item>

            <Form.Item label="Senha" name="password" rules={[{ required: true, message: "Digite a senha!" }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item label={null}>
              <Link href={"/recuperarsenha"} className="font-light text-gray-700 mb-5 underline">
                Esqueceu sua senha?
              </Link>
            </Form.Item>
            <Form.Item label={null}>
              <button type="submit" className="bg-primary text-white w-full py-[5px] rounded-lg">
                Entrar
              </button>
            </Form.Item>
          </Form>
          <p className="text-sm font-light text-center">
            Não possui conta?{" "}
            <Link href={"/cadastrar"}>
              <span className="text-primary underline">Cadastre-se</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
