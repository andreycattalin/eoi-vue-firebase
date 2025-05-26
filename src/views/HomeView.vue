<script>
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

export default {
  name: 'HomeView',
  data() {
    return {
      inputCity: "",
      inputCountry: "",
      cities: []
    }
  },
  methods: {

    // ++++++ Añadir datos en firestore
    async addCity() {
      console.log("añadir ciudad", this.inputCity);

      const docRef = await addDoc(collection(db, "viajes"), {
        title: this.inputCity,
        country: this.inputCountry,
      });
      console.log("Document written with ID: ", docRef.id);

      this.inputCity = "";
      this.inputCountry = "";

      this.getCities();

    },
    async getCities() {
      this.cities = [];
      const viajes = collection(db, "viajes")
      const todosLosViajes = await getDocs(viajes);
      todosLosViajes.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

        this.cities.push({
          id: doc.id,
          ...doc.data()
        })
      });
    }
  },
  // Cuando el componente o vista está lista para el usuario, es visible, se ejecuta el método mounted
  mounted() {
    this.getCities();
  }
}
</script>

<template>
  <main style="margin-top: 100px;">

    <div>
      <input v-model="inputCity" placeholder="Ciudad" type="text">
      <input v-model="inputCountry" placeholder="País" type="text">
      <button @click="addCity">Añadir</button>
    </div>

    <ul style="margin-top: 50px;">
      <li v-for="city in cities" :key="city.id">{{ city.title }} - {{ city.country }}</li>
    </ul>

  </main>
</template>
