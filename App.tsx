import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

type MenuItem = {
  name: string;
  description: string;
  course: string;
  price: string;
};

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [adding, setAdding] = useState<boolean>(false);

  const courses = ["Starters", "Main", "Dessert"];

  const [newItems, setNewItems] = useState<MenuItem[]>([
    { name: "", description: "", course: "Starters", price: "" },
    { name: "", description: "", course: "Starters", price: "" },
    { name: "", description: "", course: "Starters", price: "" },
  ]);

  const handleSaveNewItems = () => {
    const filledItems = newItems.filter((item) => item.name.trim() !== "");
    setMenuItems([...menuItems, ...filledItems]);
    setAdding(false);
    setNewItems(
      newItems.map(() => ({ name: "", description: "", course: "Starters", price: "" }))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>FoodNStuff</Text>

      {/* Home Screen */}
      {!adding && (
        <View style={{ flex: 1 }}>
          <Text style={styles.subtitle}>Menu ({menuItems.length} items)</Text>

          {menuItems.length === 0 ? (
            <Text style={{ marginBottom: 10 }}>No menu items yet.</Text>
          ) : (
            <FlatList
              data={menuItems}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.menuItem}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text>Course: {item.course}</Text>
                  <Text>Price: R{item.price}</Text>
                </View>
              )}
            />
          )}

          <View style={{ marginTop: 20 }}>
            <Button title="Go to Add Menu Items" onPress={() => setAdding(true)} />
          </View>
        </View>
      )}

      {/* Add Menu Items Screen */}
      {adding && (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <Text style={styles.subtitle}>Add Menu Items</Text>
          <Text>Please enter the details of each menu item:</Text>

          {newItems.map((item, index) => (
            <View key={index} style={styles.inputGroup}>
              <Text style={styles.dishLabel}>Dish {index + 1}</Text>

              <TextInput
                style={styles.input}
                placeholder="Dish Name"
                value={item.name}
                onChangeText={(text) => {
                  const updated = [...newItems];
                  updated[index].name = text;
                  setNewItems(updated);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={item.description}
                onChangeText={(text) => {
                  const updated = [...newItems];
                  updated[index].description = text;
                  setNewItems(updated);
                }}
              />
              <Text>Course:</Text>
              <Picker
                selectedValue={item.course}
                onValueChange={(value) => {
                  const updated = [...newItems];
                  updated[index].course = value;
                  setNewItems(updated);
                }}
                style={styles.picker}
              >
                {courses.map((course) => (
                  <Picker.Item label={course} value={course} key={course} />
                ))}
              </Picker>
              <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={item.price}
                onChangeText={(text) => {
                  const updated = [...newItems];
                  updated[index].price = text;
                  setNewItems(updated);
                }}
              />

              {/* Divider between dishes */}
              {index < newItems.length - 1 && <View style={styles.divider} />}
            </View>
          ))}

          <View style={styles.buttonRow}>
            <Button title="Cancel" color="grey" onPress={() => setAdding(false)} />
            <Button title="Save" onPress={handleSaveNewItems} />
            <Button title="Back Home" onPress={() => setAdding(false)} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginVertical: 20 },
  subtitle: { fontSize: 20, fontWeight: "600", marginVertical: 10, textAlign: "center" },
  menuItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    width: "100%",
  },
  itemName: { fontSize: 18, fontWeight: "bold" },
  inputGroup: { marginVertical: 10 },
  dishLabel: { fontWeight: "bold", marginBottom: 5, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  picker: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginVertical: 5 },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    marginVertical: 10,
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 20 },
});
