import { Pressable, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";

import Icon from "react-native-vector-icons/Ionicons";
import { navigate } from "@/navigators/utils";
import { styles } from "@/screens/Chat/styles";

type ChatComponentProps = {
  item: {
    id: string;
    name: string;
    messages: Message[];
  };
};

type Message = {
  id: string;
  text: string;
  time: string;
  user: string;
};

const ChatComponent = ({ item }: ChatComponentProps) => {
  const [messages, setMessages] = useState<Message>();

  //👇🏻 Retrieves the last message in the array from the item prop
  useLayoutEffect(() => {
    // console.log("item.messages.length", item.);
    setMessages(item.messages[item.messages.length - 1]);
  }, []);

  ///👇🏻 Navigates to the Messaging screen
  const handleNavigation = () => {
    navigate("Chat", {
      id: item.id,
      name: item.name,
    });
  };

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>{item.name}</Text>

          <Text style={styles.cmessage}>
            {messages?.text ? messages.text : "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>
            {messages?.time ? messages.time : "now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
