"use client";
import { updateStudent } from "@/api/student";
import { NavBar } from "@/components/Navbar";
import { useGame } from "@/contexts/GameContext";
import { useFetchThemes } from "@/hooks/useGetThemes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Select, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const EditStudent = () => {
  const [form] = Form.useForm();
  const { themes } = useFetchThemes();
  const { editStudent, setStudent } = useGame();
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
      theme_id: values.theme_id,
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
          theme_id: JSON.parse(student).theme_id,
        });
      }
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex items-center px-48 w-full">
        <div className="w-full items-center justify-items-center flex-col">
          <div className="p-8 flex flex-col items-center border border-primary rounded-xl xl:w-[45%] lg:w-[70%] md:w-[100%] sm:w-[100%]">
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
                theme_id: editStudent?.theme_id || undefined,
              }}
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
              <Form.Item label={null}>
                <button type="submit" className="bg-primary text-white w-full py-[5px] rounded-lg">
                  Editar aluno(a)
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

export default EditStudent;
