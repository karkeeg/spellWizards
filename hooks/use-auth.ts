import { useMutation } from "@tanstack/react-query";
import {
  authenticateParent,
  registerParent,
  AuthRequest,
  AuthResponse,
} from "@/services/auth.service";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export function useLogin() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation<AuthResponse, Error, AuthRequest>({
    mutationFn: authenticateParent,

    onSuccess: (data) => {
      // Save to context + localStorage
      login(data);
      toast.success("Welcome back! ✨");

      // Redirect based on onboarding status
      if (data.onboarding_status === "completed") {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    },

    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(error.message || "Invalid email or password. Please try again.");
    },
  });
}

export function useSignup() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation<AuthResponse, Error, any>({
    mutationFn: registerParent,

    onSuccess: (data) => {
      login(data);
      toast.success("Account created successfully! ✨");
      router.push("/onboarding");
    },

    onError: (error: any) => {
      console.error("Signup failed:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Signup failed. Please try again."
      );
    },
  });
}
