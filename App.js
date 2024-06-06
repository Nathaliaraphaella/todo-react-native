import { StatusBar } from "expo-status-bar";
import * as Crypto from "expo-crypto";
import { useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [title, setTitle] = useState("");

  function handleTarefa() {
    const id = Crypto.randomUUID();
    const novaTarefa = {
      title,
      id,
      completed: false,
    };

    setTarefas((tarefas) => [...tarefas, novaTarefa]);
    setTitle("");
    return;
  }

  function handleComplete(id) {
    console.log(id);
    const todo = tarefas.filter((tarefa) => {
      return tarefa.id === id;
    });

    console.log(todo[0].title);

    const novaTarefa = {
      id,
      title: todo[0].title,
      completed: !todo[0].completed,
    };

    const novasTarefas = tarefas.filter((tarefa) => {
      return tarefa.id !== id;
    });

    novasTarefas.push(novaTarefa);

    setTarefas(novasTarefas);
  }

  function handleDelete(id) {
    const novasTarefas = tarefas.filter((tarefa) => {
      return tarefa.id !== id;
    });
    setTarefas(novasTarefas);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text
        style={{
          textTransform: "uppercase",
          fontWeight: 800,
          fontSize: 24,
          color: "#371F76",
        }}
      >
        Todo app
      </Text>
      <View style={styles.body}>
        <TextInput
          value={title}
          onChangeText={(texto) => setTitle(texto)}
          style={styles.form}
          placeholder="Digite o nome da tarefa"
        />
        <TouchableOpacity onPress={handleTarefa} style={styles.criar_btn}>
          <Text style={styles.criar_btn_text}>Criar tarefa</Text>
        </TouchableOpacity>
        <View style={styles.tarefas_wrapper}>
          <FlatList
            data={tarefas}
            renderItem={({ item }) => (
              <View style={styles.todo_wrapper}>
                <Text>{item.title}</Text>
                <View style={styles.todo_actions_wrapper}>
                  <TouchableOpacity onPress={() => handleComplete(item.id)}>
                    <AntDesign
                      name={
                        item.completed === true ? "checksquare" : "checksquareo"
                      }
                      size={24}
                      color={item.completed === true ? "#097969" : "white"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Feather name="trash-2" size={24} color={"red"} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 64,
  },
  body: {
    paddingTop: 48,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 24,
  },
  form: {
    gap: 12,
    borderColor: "#808080",
    borderWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: "100%",
    borderRadius: 4,
  },
  criar_btn: {
    marginVertical: 12,
    backgroundColor: "#371F76",
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  criar_btn_text: { color: "white" },
  tarefas_wrapper: {
    width: "100%",
    paddingHorizontal: 12,
  },
  todo_wrapper: {
    backgroundColor: "#F8C8DC",
    borderRadius: 4,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  todo_actions_wrapper: {
    width: 56,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
