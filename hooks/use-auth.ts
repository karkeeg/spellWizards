import { useMutation } from "@tanstack/react-query";
import {
  authenticateParent,
  AuthRequest,
  AuthResponse,
} from "@/services/auth.service";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export function useLogin() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation<AuthResponse, Error, AuthRequest>({
    mutationFn: authenticateParent,

    onSuccess: (data) => {
      // Save to context + localStorage
      login(data);

      // Redirect based on onboarding status
      if (data.onboarding_status === "completed") {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}
