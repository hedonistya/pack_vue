export function seedDatabase(firebase) {
  // Dishes
  firebase.firestore().collection("dishes").add({
    title: "Salted Pasta with mushroom sauce",
    price: "3.05",
    category: "appetizer",
    available: "11"
  });
  firebase.firestore().collection("dishes").add({
    title: "Spicy instant noodle with special omelette",
    price: "2.37",
    category: "appetizer",
    available: "13"
  });
  firebase.firestore().collection("dishes").add({
    title: "Spicy noodle with special omelette",
    price: "2.67",
    category: "coldDishes",
    available: "19"
  });
  firebase.firestore().collection("dishes").add({
    title: "Healthy noodle with spinach leaf",
    price: "2.56",
    category: "grill",
    available: "12"
  });
  firebase.firestore().collection("dishes").add({
    title: "Hot spicy noodle with omelet",
    price: "2.49",
    category: "dessert",
    available: "14"
  });
  firebase.firestore().collection("dishes").add({
    title: "Beef dumpling in hot and sour soup",
    price: "2.59",
    category: "hotDishes",
    available: "20"
  });
  firebase.firestore().collection("dishes").add({
    title: "Salted noodle with mushroom sauce",
    price: "3.55",
    category: "hotDishes",
    available: "6"
  });
  firebase.firestore().collection("dishes").add({
    title: "Hot spicy fried rice with omelet",
    price: "2.29",
    category: "soup",
    available: "16"
  });
  firebase.firestore().collection("dishes").add({
    title: "Spicy seasoned seafood noodles",
    price: "2.58",
    category: "soup",
    available: "14"
  });
}
