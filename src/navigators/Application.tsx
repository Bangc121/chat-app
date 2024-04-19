import { Chat, Example, Lobby, Login, Startup } from "@/screens";

import type { ApplicationStackParamList } from "@/types/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./utils";
import { useTheme } from "@/theme";

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();

  return (
    <NavigationContainer theme={navigationTheme} ref={navigationRef}>
      <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="Example" component={Example} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Lobby" component={Lobby} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
