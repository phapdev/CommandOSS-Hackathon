import { useRouter } from "expo-router";

import { useCaptureStore } from "@/storages/capture-store";

export function useNavigation() {
  const router = useRouter();
  const { step, reset } = useCaptureStore();

  const handleCancel = () => {
    if (step === "preview") {
      reset();
    } else {
      router.back();
    }
  };

  return {
    handleCancel,
  };
} 