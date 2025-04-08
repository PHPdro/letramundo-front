"use client";
import { CustomTable } from "@/components/CustomTable";
import { EmptyTable } from "@/components/EmptyTable";
import { NavBar } from "@/components/Navbar";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <NavBar />
      <EmptyTable />
      {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href={"/novoaluno"} className="ml-5">
            <button className="bg-primary text-white p-2 text-sm rounded-lg mb-6 w-[25%]">
              Adicionar aluno(a)
            </button>
          </Link>
          <CustomTable />
        </div>
      </div> */}
      <div className="xl:flex lg:hidden md:hidden sm:hidden justify-start">
        <div className="bg-[#fbe5a5] absolute bottom-0 h-20 w-20 rounded-tr-full" />
        <div className="bg-[#f8a680] absolute bottom-0 left-[70px] h-16 w-32 rounded-t-full" />
      </div>
      <div className="xl:flex lg:hidden md:hidden sm:hidden justify-end">
        <div className="bg-[#f8a29e] absolute bottom-0 h-40 w-44 right-0 rounded-tl-full" />
      </div>
    </div>
  );
};

export default Home;
