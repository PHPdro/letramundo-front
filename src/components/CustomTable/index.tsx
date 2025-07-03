import { Col, message, Pagination, Popconfirm, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudent } from "@/api/student";
import { useGame } from "@/contexts/GameContext";

interface CustomTableProps {
  data: any;
}

export const CustomTable = ({ data }: CustomTableProps) => {
  const queryClient = useQueryClient();
  const { setEditStudent } = useGame();

  const mutationDelete = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      message.success("Aluno excluído com sucesso");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: any) => {
      message.error(`Erro ao excluir aluno: ${error.message}`);
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("aluno");
    }
  }, []);

  return (
    <div>
      <table className="min-w-full border-separate border-spacing-4">
        <thead className="bg-white">
          <tr>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              {""}
            </th>
            <th
              scope="col"
              className="py-3.5 px-12 bg-secondary rounded-lg text-sm font-semibold text-gray-900"
            >
              ALUNO
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 bg-secondary rounded-lg text-sm font-semibold text-gray-900"
            >
              NÍVEL
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 bg-secondary rounded-lg text-sm font-semibold text-gray-900"
            >
              TURMA
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 bg-secondary rounded-lg text-sm font-semibold text-gray-900"
            >
              AÇÕES
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((aluno: any, index: number) => (
            <tr key={index}>
              <td>
                {/* TODO: fazer dinamico */}
                <Link
                  href={`niveis/${aluno.theme.toLocaleLowerCase()}`}
                  onClick={() => localStorage.setItem("aluno", JSON.stringify(aluno))}
                >
                  <Image
                    src="/play.svg"
                    alt="Botão de começar jogo"
                    width={35}
                    height={35}
                    className="w-[35px] h-[35px] rounded-full object-cover"
                  />
                </Link>
              </td>
              <td className="whitespace-nowrap  p-4 text-sm bg-[#fbe5a5] rounded-lg flex items-center gap-3 flex-row">
                <Image
                  src="/avatar.png"
                  alt="Avatar"
                  width={27}
                  height={27}
                  className="w-[27px] h-[27px] rounded-full object-cover"
                />
                {aluno.name}
              </td>
              <td className="whitespace-nowrap p-4 text-center text-sm bg-[#fbe5a5] rounded-lg">
                {aluno.level}
              </td>
              <td className="whitespace-nowrap p-4 text-center text-sm bg-[#fbe5a5] rounded-lg">
                {aluno.year}º {aluno.class.toLocaleUpperCase()}
              </td>
              <td>
                <Row gutter={[16, 16]} justify="center" align="middle" className="flex items-center">
                  <Col>
                    <Link
                      href={"/editar"}
                      onClick={() => {
                        localStorage.setItem("aluno", JSON.stringify(aluno));
                        setEditStudent(aluno);
                      }}
                    >
                      <Image
                        src="/edit.png"
                        alt="Botão de editar"
                        width={25}
                        height={25}
                        className="w-[25px] h-[25px]"
                      />
                    </Link>
                  </Col>
                  <Col>
                    <Popconfirm
                      title="Tem certeza que deseja excluir este aluno?"
                      onConfirm={() => {
                        mutationDelete.mutate(aluno.id);
                      }}
                      okText="Sim"
                      cancelText="Não"
                      placement="left"
                    >
                      <DeleteOutlined style={{ fontSize: 25 }} />
                    </Popconfirm>
                  </Col>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        align="end"
        defaultCurrent={1}
        total={data?.length}
        style={{
          marginTop: "20px",
          marginRight: "35px",
          marginBottom: "20px",
        }}
      />
    </div>
  );
};
