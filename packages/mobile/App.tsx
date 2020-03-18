import * as React from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Theme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const theme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f"
  }
};

const { Navigator, Screen } = createStackNavigator();

function HomeScreen({ route, navigation }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>
        Hello! This is the first template from where we are going to work!
      </Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            parameter: "you can pass a parameter here"
          })
        }
      />
      {/* Pass data to previous screen: */}
      <Button
        title="Create post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Text style={{ textAlign: "center", color: "red" }}>
        Post: {route.params?.post}
      </Text>
      <Text style={{ textAlign: "center" }}>Lithium team</Text>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { parameter } = route.params;

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>Details Screen</Text>
      <Text style={{ textAlign: "center", color: "red" }}>{parameter}</Text>
      <Button
        title="Go to Details... again (navigate)"
        onPress={() =>
          navigation.navigate("Details", {
            parameter: parameter
          })
        }
      />
      <Button
        title="Go to Details... again (push)"
        onPress={() =>
          navigation.push("Details", {
            parameter:
              parameter == "and change it on each call"
                ? "this is good"
                : parameter == "this is good"
                ? parameter
                : "and change it on each call"
          })
        }
      />
      <Button
        title="Go to Home (navigate)"
        onPress={() => navigation.navigate("Home")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function CreatePostScreen({ navigation }) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate("Home", { post: postText });
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Navigator>
          <Screen name="Home" component={HomeScreen} />
          <Screen
            name="Details"
            component={DetailsScreen}
            initialParams={{
              parameter:
                "if you didn't specify any params when navigating to the screen"
            }}
          />
          <Screen name="CreatePost" component={CreatePostScreen} />
        </Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});
