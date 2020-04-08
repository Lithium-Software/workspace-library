import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function HomeScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  return (
    <View style={styles.main}>
      <Text>
        {" "}
        Es muy importante para nosotros que se tomen este desafío muy
        seriamente, que se enfoquen en desarrollar dicha tarea de manera que el
        código generado pueda ser re-utilizado en el futuro (esto último, es muy
        importante para Lithium ya que nuestra rapidez de delivery de soluciones
        depende de ello), cumpla con las mejores prácticas, comentarios
        pertinentes y justificación de decisiones tomadas
      </Text>
      <Button
        title="abrir article view"
        onPress={() => navigation.push("article")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "column",
    padding: 18,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  todoList: {
    flex: 1,
    width: "100%",
    backgroundColor: "red",
  },
  todoListG: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFC200",
  },
  todoListB: {
    flex: 1,
    width: "100%",
    backgroundColor: "green",
  },
});
