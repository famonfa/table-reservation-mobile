import React from "react";
import { Modal as RNModal, View, StyleSheet, ViewStyle } from "react-native";
import { palette } from "./palette";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  containerStyle,
  contentStyle,
}) => {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, containerStyle]}>
        <View style={[styles.modalContent, contentStyle]}>{children}</View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.overlay,
  },
  modalContent: {
    backgroundColor: palette.background,
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
});
