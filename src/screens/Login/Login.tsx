import { Controller, useForm } from "react-hook-form";
import { Text, TextInput } from "react-native";

import Button from "@/components/atoms/Button/Button";
import { SafeScreen } from "@/components/template";
import { navigate } from "@/navigators/utils";
import { storage } from "@/App";

type FormData = {
  username: string;
};
export default function Chat() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data: FormData) => {
    if (data.username) {
      storage.set("username", data.username);
      navigate("Chat");
    }
  };

  return (
    <SafeScreen>
      <Text>Login</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="First name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </SafeScreen>
  );
}
