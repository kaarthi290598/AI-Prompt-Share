import { useMutation, useQuery } from "@tanstack/react-query";

export async function getPrompts() {
  const response = await fetch("/api/prompt", { cache: "no-store" });
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

//update prompt

export const getPromptbyID = async () => {
  const response = await fetch(`/api/prompt/${promptId}`);
  const data = await response.json();

  setPost({
    prompt: data.prompt,
    tag: data.tag,
  });
};

export function usePromptDetails() {
  //mutate

  const { data: promptData, isLoading } = useMutation({
    mutationFn: getPromptbyID,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: "prompt",
      });
    },
  });
}
