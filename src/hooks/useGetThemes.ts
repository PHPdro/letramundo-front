import { getThemes } from "@/api/themes";
import { useQuery } from "@tanstack/react-query";

export const useFetchThemes = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["themes"],
    queryFn: () => getThemes(),
    refetchOnMount: false,
  });

  return {
    themes: data?.data.themes || [],
    error,
    isLoading,
  };
};
