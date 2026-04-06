"use client";
import { createStudent } from "@/api/student";
import { NavBar } from "@/components/Navbar";
import { useFetchThemes } from "@/hooks/useGetThemes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AvatarSelector } from "@/components/AvatarSelector";
import { Form, Select, Input, message } from "antd";
import { useRouter } from "next/navigation";

const NewStudent = () => {
  const queryClient = useQueryClient();
  const route = useRouter();
  const { themes } = useFetchThemes();

  const mutation = useMutation({
    mutationFn: createStudent,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      message.success("Aluno(a) cadastrado com sucesso!");
      route.push("/inicio");
    },
    onError: () => {
      message.error("Erro ao cadastrar aluno(a)");
    },
  });

  const onFinish = async (values: any) => {
    await mutation.mutate({
      name: values.name,
      year: values.year,
      class: values.class,
      theme_id: values.theme_id,
      avatar: values.avatar,
    });
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center px-4 sm:px-8 md:px-16 lg:px-48 w-full">
        <div className="w-full items-center justify-items-center flex-col">
          <div className="p-8 flex flex-col items-center border border-primary rounded-xl w-full xl:w-[45%] lg:w-[70%]">
            <h2 className="text-[22px] font-bold mb-5">Cadastro</h2>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
            >
              <Form.Item
                style={{ marginBottom: 10 }}
                label="Nome"
                name="name"
                rules={[{ required: true, message: "Digite o nome" }]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="Série"
                name="year"
                rules={[{ required: true, message: "Digite a série" }]}
              >
                <Select
                  options={Array.from({ length: 9 }, (_, i) => ({
                    label: `${i + 1}ª`,
                    value: i + 1,
                  }))}
                  allowClear
                />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="Turma"
                name="class"
                rules={[{ required: true, message: "Digite a turma" }]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="Tema"
                name="theme_id"
                rules={[{ required: true, message: "Selecione o tema" }]}
              >
                <Select
                  options={themes.map((theme: any) => ({
                    label: theme.name,
                    value: theme.id,
                  }))}
                />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="Escolha um avatar"
                name="avatar"
                rules={[{ required: true, message: "Selecione um avatar" }]}
              >
                <AvatarSelector />
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
      <div className="hidden xl:flex justify-start fixed bottom-0 left-0 z-0">
        <div className="bg-[#fbe5a5] h-20 w-20 rounded-tr-full" />
        <div className="bg-[#f8a680] h-16 w-32 rounded-t-full self-end" />
      </div>
      <div className="hidden xl:flex justify-end fixed bottom-0 right-0 z-0">
        <div className="bg-[#f8a29e] h-40 w-44 rounded-tl-full" />
      </div>
    </div>
  );
};

export default NewStudent;
