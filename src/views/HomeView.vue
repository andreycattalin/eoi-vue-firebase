<script>
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default {
  name: 'HomeView',
  data() {
    return {
      inputCity: "",
      inputCountry: "",
      cities: [],
      editingCity: null
    }
  },
  methods: {

    // ++++++ Añadir datos en firestore
    async addCity() {

      if (this.editingCity) {
        this.updateCity()
      } else {
        console.log("añadir ciudad", this.inputCity);

        const docRef = await addDoc(collection(db, "viajes"), {
          title: this.inputCity,
          country: this.inputCountry,
        });
        console.log("Document written with ID: ", docRef.id);

      }


      this.inputCity = "";
      this.inputCountry = "";
      this.editingCity = null
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
    },
    editCity(city) {
      this.editingCity = city
      this.inputCity = city.title
      this.inputCountry = city.country
    },
    async updateCity() {
      const citiRef = doc(db, "viajes", this.editingCity.id);
      await updateDoc(citiRef, {
        title: this.inputCity,
        country: this.inputCountry,
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
      <button @click="addCity">{{ editingCity ? 'Actualizar' : 'Añadir' }}</button>
    </div>

    <ul style="margin-top: 50px;">
      <li v-for="city in cities" :key="city.id">{{ city.title }} - {{ city.country }} <button
          @click="editCity(city)">Editar</button></li>
    </ul>

  </main>
</template>
