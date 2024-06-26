import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";

import Button from "@/components/atoms/Button/Button";
import ChatComponent from "@/components/molecules/Chat/ChatComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import MessageComponent from "@/components/molecules/Chat/MessageComponent";
import Modal from "@/components/molecules/Modal/Modal";
import { SafeScreen } from "@/components/template";
import { socket } from "@/services/utils/socket";
import { storage } from "@/App";
import { styles } from "./styles";

export default function Chat({ route, navigation }) {
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      text: "Hello guys, welcome!",
      time: "07:50",
      user: "Tomer",
    },
    {
      id: "2",
      text: "Hi Tomer, thank you! 😇",
      time: "08:50",
      user: "David",
    },
  ]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  //👇🏻 Access the chatroom's name and id
  const { name, id } = route.params;

  //👇🏻 This function gets the username saved on AsyncStorage
  const getUsername = async () => {
    try {
      const value = storage.getString("username");
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      console.error("Error while loading username!");
    }
  };

  //👇🏻 Sets the header title to the name chatroom's name
  useLayoutEffect(() => {
    // navigation.setOptions({ title: name });
    console.log("idididididid", id);
    getUsername();
    socket.emit("findRoom", id);
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, []);

  useEffect(() => {
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, [socket]);
  /*👇🏻 
    This function gets the time the user sends a message, then 
    logs the username, message, and the timestamp to the console.
 */
  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    socket.emit("newMessage", {
      message,
      room_id: id,
      user,
      timestamp: { hour, mins },
    });
  };

  return (
    <SafeScreen>
      <View style={styles.messagingscreen}>
        <View
          style={[
            styles.messagingscreen,
            { paddingVertical: 15, paddingHorizontal: 10 },
          ]}
        >
          {chatMessages[0] ? (
            <FlatList
              data={chatMessages}
              renderItem={({ item }) => (
                <MessageComponent item={item} user={user} />
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            ""
          )}
        </View>

        <View style={styles.messaginginputContainer}>
          <TextInput
            style={styles.messaginginput}
            onChangeText={(value) => setMessage(value)}
          />
          <Pressable
            style={styles.messagingbuttonContainer}
            onPress={handleNewMessage}
          >
            <View>
              <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeScreen>
  );
}
