import { Text, TextInput } from "react-native";

import Button from "@/components/atoms/Button/Button";
import { SafeScreen } from "@/components/template";
import { useState } from "react";

export default function Chat() {
  const [text, setText] = useState("");

  const onSubmit = () => {
    console.log("text");
  };

  return (
    <SafeScreen>
      <Text>ChatPage</Text>
      <TextInput onChangeText={setText} value={text} placeholder="test" />
      <Button title="Submit" onPress={onSubmit} />
    </SafeScreen>
  );
}
