import { useQuery } from "@tanstack/react-query";

export async function getPrompts() {
  const response = await fetch("/api/prompt");
  const data = await response.json();
  return data;
}

export function usePrompts() {
  const { data: promptData, isLoading } = useQuery({
    queryKey: ["prompt"],
    queryFn: getPrompts,
  });

  return { promptData, isLoading };
}
