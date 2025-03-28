import Image from "next/image";

export const NavBar = () => (
  <nav className="bg-white">
    <div className="max-w-7xl mx-auto py-8 px-2">
      <div className="flex justify-between items-center h-16">
        <div className="flex space-x-4 items-center">
          <Image className="mr-5" src="/LetraMundo.png" alt="logo" width={100} height={100} />
          <a href="#" className="relative text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium">
            Alunos
            <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary"></span>
          </a>
          <a
            href="#"
            className="relative text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium group"
          >
            Configurações
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#"
            className="relative text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium group"
          >
            Sobre nós
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
        <div className="flex items-center">
          <span className="text-gray-700 px-3 py-2 rounded-md text-base font-medium">Prof Fulano</span>
        </div>
      </div>
    </div>
  </nav>
);
