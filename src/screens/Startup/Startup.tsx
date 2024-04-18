import { ActivityIndicator, Text, View } from "react-native";

import { Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";
import { navigateAndSimpleReset } from "@/navigators/utils";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/theme";
import { useTranslation } from "react-i18next";

function Startup() {
  const { layout, gutters, fonts } = useTheme();
  const { t } = useTranslation(["startup"]);

  const { isSuccess, isFetching, isError } = useQuery({
    queryKey: ["startup"],
    queryFn: () => {
      return Promise.resolve(true);
    },
  });

  useEffect(() => {
    navigateAndSimpleReset("Chat");
  }, [isSuccess]);

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <Brand />
        {isFetching && (
          <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
        )}
        {isError && (
          <Text style={[fonts.size_16, fonts.red500]}>
            {t("startup:error")}
          </Text>
        )}
      </View>
    </SafeScreen>
  );
}

export default Startup;
