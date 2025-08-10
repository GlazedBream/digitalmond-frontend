import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import colors from "../styles/colors";

export default function DummyCameraScreen({ route }) {
  const { screenType } = route.params; // 'default', 'gps_disabled', 'auth_fail', 'auth_success'

  const getImage = () => {
    if (screenType === "auth_fail") {
      return require("../../assets/images/mission/fail.png");
    }
    return require("../../assets/images/mission/success.png");
  };

  const getModalInfo = () => {
    switch (screenType) {
      case "gps_disabled":
        return { visible: true, message: ["GPS가 비활성화", "GPS를 켜주세요"] };
      case "auth_fail":
        return {
          visible: true,
          message: [
            "인증 실패",
            "인증에 실패했습니다.\n다시 한 번 시도해보세요.",
          ],
        };
      case "auth_success":
        return {
          visible: true,
          message: ["인증 성공", "인증되었습니다!\n리워드를 수령하세요!"],
        };
      default:
        return { visible: false, message: "" };
    }
  };

  const [modalVisible, setModalVisible] = React.useState(
    getModalInfo().visible
  );
  const message = getModalInfo().message;

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={getImage()} style={styles.cameraView} />
      </View>

      <TouchableOpacity style={styles.captureButton}>
        <Text style={styles.captureButtonText}>촬영</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {Array.isArray(message) ? (
              <View style={{ alignItems: "center" }}>
                <Text style={[styles.modalText, styles.modalTextLarge]}>
                  {message[0]}
                </Text>
                <Text style={styles.modalText}>{message[1]}</Text>
              </View>
            ) : (
              <Text style={styles.modalText}>{message}</Text>
            )}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageWrapper: {
    width: "100%",
    height: "48%",
  },
  cameraView: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  captureButton: {
    position: "absolute",
    bottom: 50,
    width: 120,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  captureButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textOnPrimary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 20,
    textAlign: "center",
  },
  modalTextLarge: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  modalButtonText: {
    color: colors.textOnPrimary,
    fontSize: 16,
  },
});
