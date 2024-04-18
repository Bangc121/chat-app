import {
  CommonActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

import { ApplicationStackParamList } from "@/types/navigation";

export const navigationRef =
  createNavigationContainerRef<ApplicationStackParamList>();

export function navigate(
  name: keyof ApplicationStackParamList,
  params?: never
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function navigateAndSimpleReset(name: string, index = 0, params = {}) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name, params }],
      })
    );
  }
}
