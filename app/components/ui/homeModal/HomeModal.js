import { View, Text, Modal, Pressable } from "react-native";
import React, { useState } from "react";

const HomeModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View className="flex-1 justify-center items-center">
        <View className="bg-red-500">
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text>Hello</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default HomeModal;
