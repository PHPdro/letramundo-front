import { getStudents } from "@/api/student";
import { useQuery } from "@tanstack/react-query";

export const useFetchStudents = () => {
  const { data, error, isFetching } = useQuery({
    queryKey: ["students"],
    queryFn: () => getStudents(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return {
    students: data?.data.students || [],
    error,
    isFetching,
  };
};
