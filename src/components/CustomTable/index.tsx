import { Pagination } from "antd";
import Image from "next/image";

export const CustomTable = () => {
  const alunos = [
    {
      nome: "Aluno Teste",
      nivel: 5,
      turma: "5º B",
      avatar: "/avatar.png",
    },
    {
      nome: "Aluno Teste 2",
      nivel: 5,
      turma: "5º B",
      avatar: "/avatar.png",
    },
    {
      nome: "Aluno Teste 3",
      nivel: 5,
      turma: "5º B",
      avatar: "/avatar.png",
    },
    {
      nome: "Aluno Teste 4",
      nivel: 5,
      turma: "5º B",
      avatar: "/avatar.png",
    },
    {
      nome: "Aluno Teste 5",
      nivel: 5,
      turma: "5º B",
      avatar: "/avatar.png",
    },
  ];
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
            <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900">
              {""}
            </th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno, index) => (
            <tr key={index}>
              <td>
                <Image
                  src="/play.svg"
                  alt="Botão de começar jogo"
                  width={35}
                  height={35}
                  className="w-[35px] h-[35px] rounded-full object-cover"
                />
              </td>
              <td className="whitespace-nowrap  p-4 text-sm bg-[#fbe5a5] rounded-lg flex items-center gap-3 flex-row">
                <Image
                  src="/avatar.png"
                  alt="Avatar"
                  width={27}
                  height={27}
                  className="w-[27px] h-[27px] rounded-full object-cover"
                />
                {aluno.nome}
              </td>
              <td className="whitespace-nowrap p-4 text-center text-sm bg-[#fbe5a5] rounded-lg">
                {aluno.nivel}
              </td>
              <td className="whitespace-nowrap p-4 text-center text-sm bg-[#fbe5a5] rounded-lg">
                {aluno.turma}
              </td>
              <td>
                <Image
                  src="/edit.png"
                  alt="Botão de editar"
                  width={25}
                  height={25}
                  className="w-[25px] h-[25px]"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        align="end"
        defaultCurrent={1}
        total={50}
        style={{
          marginTop: "20px",
          marginRight: "35px",
          marginBottom: "20px",
        }}
      />
    </div>
  );
};
