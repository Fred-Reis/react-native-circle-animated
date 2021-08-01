import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CIRCLE_SIZE = 100;

interface Props {
  onPress: () => void;
  animatedValue: Animated.Value;
}

const Circle = ({ onPress, animatedValue }: Props) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];

  const containerBackground = animatedValue.interpolate({
    inputRange,
    outputRange: ["gold", "gold", "gold", "#444", "#444"],
  });

  const circleBackground = animatedValue.interpolate({
    inputRange,
    outputRange: ["#444", "#444", "#444", "gold", "gold"],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        { backgroundColor: containerBackground },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [
              {
                perspective: 400,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0%", "50%", "0%"],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={[
              styles.circle,
              styles.circleButton,
              { backgroundColor: circleBackground },
            ]}
          >
            <AntDesign name="arrowright" size={28} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default function App() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  const animationMethod = (toValue: number) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 3000,
      useNativeDriver: false,
    });

  const handleOnPress = () => {
    setIndex(index === 1 ? 0 : 1);
    animationMethod(index === 1 ? 0 : 1).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Circle onPress={handleOnPress} animatedValue={animatedValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gold",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 8,
    paddingBottom: 100,
  },
  circle: {
    backgroundColor: "#444",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleButton: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
});
