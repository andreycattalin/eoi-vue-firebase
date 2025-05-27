<script>
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: 'HomeView',
  data() {
    return {
      inputCity: "",
      inputCountry: "",
      cities: [],
      editingCity: null,
      message: "",
      user: null
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
      //this.getCities();

    },
    async getCities() {
      // this.cities = [];
      // const viajes = collection(db, "viajes")
      // const todosLosViajes = await getDocs(viajes);
      // todosLosViajes.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());

      //   this.cities.push({
      //     id: doc.id,
      //     ...doc.data()
      //   })
      // });

      const viajesRef = collection(db, "viajes")

      // onSnapshot nos permite escuchar los cambios en tiempo real
      onSnapshot(viajesRef, (snapshot) => {
        // dentro del snapshot tenemos todos los datos de la colección
        this.cities = []; // vaciamos el array para que no se dupliquen los datos

        snapshot.forEach((doc) => {
          // llenamos el array con los datos de la colecciòn de firestore
          this.cities.push({
            id: doc.id,
            ...doc.data()
          })
        });
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
    },
    async deleteCity(city) {
      const ref = doc(db, "viajes", city.id) // ruta donde queremos eliminar
      await deleteDoc(ref) // la acción de eliminar
      // await this.getCities()
    },
    logout() {
      auth.signOut().then(() => {
        this.$router.push('/login')
      })
    }
  },
  // Cuando el componente o vista está lista para el usuario, es visible, se ejecuta el método mounted
  mounted() {
    this.getCities();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        this.user = user;
        this.message = 'Usuario logueado ' + user.email;
        // ...
      } else {
        // User is signed out
        // ...
        this.message = 'No hay usuario logueado';
      }
    });
  }
}
</script>

<template>
  <main style="margin-top: 100px;">

    <h1>{{ message }}</h1>
    <button v-if="user != null" @click="logout">Cerrar sesión</button>

    <div>
      <input v-model="inputCity" placeholder="Ciudad" type="text">
      <input v-model="inputCountry" placeholder="País" type="text">
      <button @click="addCity">{{ editingCity ? 'Actualizar' : 'Añadir' }}</button>
    </div>

    <ul style="margin-top: 50px;">
      <li v-for="city in cities" :key="city.id">{{ city.title }} - {{ city.country }}
        <button @click="editCity(city)">Editar</button>
        <button style="background-color: red;" @click="deleteCity(city)">Eliminar</button>
      </li>
    </ul>

  </main>
</template>
