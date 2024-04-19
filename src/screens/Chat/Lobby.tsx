import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";

import ChatComponent from "@/components/molecules/Chat/ChatComponent";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "@/components/molecules/Modal/Modal";
import { SafeScreen } from "@/components/template";
import { socket } from "@/services/utils/socket";
import { styles } from "./styles";

export default function Lobby() {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);

  const onSubmit = () => {
    console.log("text");
  };

  useLayoutEffect(() => {
    function fetchGroups() {
      fetch("http://localhost:4000/api")
        .then((res) => res.json())
        .then((data) => setRooms(data))
        .catch((err) => console.error(err));
    }
    fetchGroups();
  }, []);

  useEffect(() => {
    socket.on("roomsList", (rooms) => {
      setRooms(rooms);
    });
  }, [socket]);

  return (
    <SafeScreen>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>

          {/* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked */}
          <Pressable onPress={() => setVisible(true)}>
            <Text>ewfwefwef</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      {visible ? <Modal setVisible={setVisible} /> : ""}
    </SafeScreen>
  );
}
