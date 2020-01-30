import { navigateBack, redirectTo } from "remax/wechat";
import { useCallback } from "react";

export function useNavigateUp() {
  return useCallback(() => {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      navigateBack()
    } else {
      redirectTo({ url: '/pages/project/project' })
    }
  }, [])
}
