"use client";
import { createUser } from "@/api/user";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const route = useRouter();
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: async (response) => {
      message.success("Usuário cadastrado com sucesso!");
      localStorage.setItem("auth", response.data.token);
      route.push("/inicio");
    },
    onError: () => {
      message.error("Erro ao cadastrar usuário");
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate(values);
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
        <div className="p-8 flex flex-col justify-center w-[400px] border border-primary rounded-xl">
          <h2 className="text-[22px] font-bold mb-8">Cadastrar</h2>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            style={{ width: "100%" }}
          >
            <Form.Item
              style={{ marginBottom: 15 }}
              label="Nome"
              name="name"
              rules={[{ required: true, message: "Digite o email!" }]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 15 }}
              label="Email"
              name="email"
              rules={[{ required: true, message: "Digite o email!" }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 15 }}
              label="Senha"
              name="password"
              rules={[{ required: true, message: "Digite a senha!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirmar senha"
              name="password_confirmation"
              rules={[{ required: true, message: "Digite a senha!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label={null}>
              <button type="submit" className="bg-primary text-white w-full py-[5px] rounded-lg">
                Cadastrar
              </button>
            </Form.Item>
          </Form>
          <p className="text-sm font-light text-center">
            Não possui conta?{" "}
            <Link href={"/login"} className="text-primary underline cursor-pointer">
              Entre aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
