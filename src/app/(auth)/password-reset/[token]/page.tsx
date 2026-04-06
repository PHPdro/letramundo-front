"use client";
import { request } from "@/api/config";
import { Form, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const token = params.token as string;
  const email = searchParams.get("email");

  const onFinish = async (values: { password: string; password_confirmation: string }) => {
    if (values.password !== values.password_confirmation) {
      message.error("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    try {
      await request({
        method: "post",
        endpoint: "reset-password",
        data: {
          token,
          email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        },
      });
      message.success("Senha redefinida com sucesso!");
      router.push("/login");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Erro ao redefinir senha. Tente novamente.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <div className="bg-[#f4a460] h-16 w-16 md:h-32 md:w-32 rounded-bl-full" />
      </div>
      <div className="flex align-middle justify-center flex-col lg:flex-row container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="lg:block relative flex flex-col w-[50%]">
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
        <div className="p-12 lg:w-[40%] w-full">
          <h2 className="text-[32px] font-bold mb-9">Redefinir senha</h2>
          <Form name="basic" onFinish={onFinish} autoComplete="off" layout="vertical">
            <Form.Item
              label="Nova senha"
              name="password"
              rules={[
                { required: true, message: "Digite a nova senha" },
                {
                  validator: (_, value) => {
                    if (!value || value.length >= 8) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("A senha deve ter pelo menos 8 caracteres"));
                  },
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirmar senha"
              name="password_confirmation"
              rules={[
                { required: true, message: "Confirme a nova senha" },
                {
                  validator: (_, value) => {
                    if (!value || value.length >= 8) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("A senha deve ter pelo menos 8 caracteres"));
                  },
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white w-full py-[5px] rounded-lg disabled:opacity-50"
              >
                {loading ? "Redefinindo..." : "Redefinir senha"}
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

export default PasswordReset;
