"use client";
import { updateStudent } from "@/api/student";
import { NavBar } from "@/components/Navbar";
import { useGamePlayEasy } from "@/contexts/GamePlayEasyContext";
import { useFetchThemes } from "@/hooks/useGetThemes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AvatarSelector } from "@/components/AvatarSelector";
import { Form, Select, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const EditStudent = () => {
  const [form] = Form.useForm();
  const { themes } = useFetchThemes();
  const { editStudent, setStudent } = useGamePlayEasy();
  const queryClient = useQueryClient();

  const route = useRouter();

  const mutation = useMutation({
    mutationFn: updateStudent,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      message.success("Aluno(a) editado com sucesso!");
      route.push("/inicio");
    },
    onError: () => {
      message.error("Erro ao editar aluno(a)");
    },
  });

  const onFinish = async (values: any) => {
    await mutation.mutate({
      id: editStudent.id,
      name: values.name,
      year: values.year,
      class: values.class,
      level: values.level,
      theme_id: values.theme_id,
      avatar: values.avatar,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const student = localStorage.getItem("aluno");
      setStudent(JSON.parse(student || "{}"));
      if (student) {
        form.setFieldsValue({
          name: JSON.parse(student).name,
          year: JSON.parse(student).year,
          class: JSON.parse(student).class,
          level: JSON.parse(student).level,
          theme_id: JSON.parse(student).theme_id,
          avatar: JSON.parse(student).avatar,
        });
      }
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex items-center px-4 sm:px-8 md:px-16 lg:px-48 w-full">
        <div className="w-full items-center justify-items-center flex-col">
          <div className="p-8 flex flex-col items-center border border-primary rounded-xl w-full xl:w-[45%] lg:w-[70%]">
            <h2 className="text-[22px] font-bold mb-5">Editar</h2>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              style={{ width: "100%" }}
              initialValues={{
                name: editStudent?.name || "",
                year: editStudent?.year || undefined,
                class: editStudent?.class || "",
                level: editStudent?.level || undefined,
                theme_id: editStudent?.theme_id || undefined,
                avatar: editStudent?.avatar || undefined,
              }}
              form={form}
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
                label="Nível"
                name="level"
                rules={[{ required: true, message: "Selecione o nível" }]}
              >
                <Select
                  options={Array.from({ length: 12 }, (_, i) => ({
                    label: `Nível ${i + 1}`,
                    value: i + 1,
                  }))}
                  allowClear
                />
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
              <Form.Item style={{ marginBottom: 10 }} label="Escolha um avatar" name="avatar">
                <AvatarSelector />
              </Form.Item>
              <Form.Item label={null}>
                <button type="submit" className="bg-primary text-white w-full py-[5px] rounded-lg">
                  Editar aluno(a)
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

export default EditStudent;
