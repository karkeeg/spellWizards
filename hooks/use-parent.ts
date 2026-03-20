import { useMutation } from "@tanstack/react-query";
import {
  updateParent,
  UpdateParentRequest,
  UpdateParentResponse,
} from "@/services/parent.service";

export function useUpdateParent() {
  return useMutation<UpdateParentResponse, Error, UpdateParentRequest>({
    mutationFn: updateParent,
  });
}
