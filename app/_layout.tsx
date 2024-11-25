import 'react-native-reanimated';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';

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
      backgroundColor: 'white',
    },
    buttonContainer: {
      flex: 3,
      backgroundColor: '#fff',
      justifyContent: 'space-around',
      borderTopColor: 'green',
      borderTopWidth: 0.3,
      paddingTop: 5,
    },
    topContainer: {
      height: SCREEN_HEIGHT / 6,
      backgroundColor: 'white',
    },
    topContainer1: {
      height: SCREEN_HEIGHT / 2,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    display: {
      width: '100%',
      fontSize: width * 0.09, // Responsive font size for display
      textAlign: 'right',
      color: '#000',
      borderRadius: 10,
      padding: 10,
    },
    buttonRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      paddingHorizontal: 10,
      paddingVertical: 10,
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
      fontSize: width * 0.06, // Responsive font size
      color: "#000",
    },
    clearText: {
      color: "green", // Red for "C"
      fontSize: width * 0.06,
    },
    equalText: {
      color: "white",
      fontSize: width * 0.08,
    }
  })

  let [userValue, setUserValue] = useState<any>("")
  console.log(userValue, "userValue");

  let clearFn = () => {
    setUserValue("")

  }

  let buttonPressed = (button: String | number) => {
    setUserValue(userValue + button.toString())
  }

  // let equalTheValue = async () => {
  //   try {
  //     let result = await eval(userValue)
  //     console.log("This is the result should be displayed on the input", result);
  //     console.log(userValue.replace("÷", "/").replace("×", "*").toString() , "userValue");
      
  //     setUserValue(eval(userValue.replace("÷", "/").replace("×", "*")).toString());
  //   } catch (e) {
  //     console.log("Error : ", e)
  //     setUserValue("Error")
  //   }
  // }

  let equalTheValue = () => {
    try {
      // Replace ÷ and × with valid JavaScript operators
      const sanitizedValue = userValue.replace(/÷/g, "/").replace(/×/g, "*");
  
      console.log("Sanitized Value for Eval:", sanitizedValue);
  
      // Use eval to calculate the result
      const result = eval(sanitizedValue);
  
      console.log("Calculation Result:", result);
  
      setUserValue(result.toString());
    } catch (e) {
      console.error("Error during evaluation:", e);
      setUserValue("Error");
    }
  };

  

  console.log(userValue, "userValue");
  return (
    <View style={style.container}>
      <View style={style.topContainer1}>
        <TextInput
          placeholder="0"
          editable={true}
          placeholderTextColor="#888"
          style={style.display}
          value={userValue}
        />
      </View>
      {/* <View style={style.topContainer}></View> */}
      <View style={style.buttonContainer}>
        {[
          ["C", "(", "%", "÷"],
          [7, 8, 9, "×"],
          [4, 5, 6, "-"],
          [1, 2, 3, "+"],
          [")", 0, ".", "="],
        ].map((row, rowIndex) => (
          <View style={style.row} key={rowIndex}>
            {row.map((button, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={[
                  style.button,
                  button === "=" && style.equalButton, // Different style for "="
                  button === "%" && style.equalButton, 
                  button === "+" && style.equalButton, 
                  button === "-" && style.equalButton, 
                  button === "×" && style.equalButton, 
                  button === "÷" && style.equalButton, 
                  button === "(" && style.equalButton, 
                  button === "." && style.equalButton, 
                ]}
                disabled={button === "=" && userValue == ""}
                onPress={() => {
                  if (button === "=" && userValue !== "") {
                    console.log("Equals Button pressed");
                    equalTheValue()
                  } else if (button === "C") {
                    clearFn()
                    console.log("Clear Button pressed");
                  } else if (button !== "C" && button !== "=" ) {
                    console.log("Other button pressed", button);
                    buttonPressed(button)
                  }
                }}
              >
                <Text
                  style={[
                    style.buttonText,
                    button === "C" && style.clearText,
                    button === "=" && style.equalText,
                    button === "%" && style.equalText,
                    button === "+" && style.equalText,
                    button === "-" && style.equalText,
                    button === "×" && style.equalText,
                    button === "÷" && style.equalText,
                    button === "(" && style.equalText,
                    button === "." && style.equalText,
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
