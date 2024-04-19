import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationStackParamList = {
  Startup: undefined;
  Example: undefined;
  Chat: {
    id: string;
    name: string;
  };
  Login: undefined;
  Lobby: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
