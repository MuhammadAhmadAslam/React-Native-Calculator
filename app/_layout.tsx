import 'react-native-reanimated';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  let SCREEN_HEIGHT = Dimensions.get('window').height;

  const { width } = Dimensions.get("window");
  let style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
    },
    buttonContainer: {
      flex: 3,
      backgroundColor: '#fff',
      justifyContent: 'space-around',
    },
    topContainer: {
      height: SCREEN_HEIGHT / 6,
      backgroundColor: 'white',
    },
    buttonRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    button: {
      flex: 1,
      aspectRatio: 1, // Ensures square buttons
      marginHorizontal: 5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      backgroundColor: "#E1E1E1",
    },
    equalButton: {
      backgroundColor: "#4CAF50",
      color: "white",
    },
    buttonText: {
      fontSize: width * 0.05, // Responsive font size
      color: "#000",
    },
    clearText: {
      color: "#fff", // Red for "C"
    },
  })

  return (
    <View style={style.container}>
      <View style={style.topContainer}>
      </View>
      <View style={style.topContainer}></View>
      <View style={style.buttonContainer}>
        {[
          ["C", "()", "%", "÷"],
          [7, 8, 9, "×"],
          [4, 5, 6, "-"],
          [1, 2, 3, "+"],
          ["±", 0, ".", "="],
        ].map((row, rowIndex) => (
          <View style={style.row} key={rowIndex}>
            {row.map((button, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={[
                  style.button,
                  button === "=" && style.equalButton, // Different style for "="
                ]}
              >
                <Text
                  style={[
                    style.buttonText,
                    button === "C" && style.clearText, // Different text style for "C"
                  ]}
                >
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
