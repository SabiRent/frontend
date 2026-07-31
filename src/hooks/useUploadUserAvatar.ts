import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadUserAvatar } from "@/services/api/user.service";
import { useAuthStore } from "@/stores/authStore";

export function useUploadUserAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadUserAvatar,
    onSuccess: (user) => {
      useAuthStore.getState().setUser(user);
      queryClient.setQueryData(["current-user"], user);
    },
  });
}
