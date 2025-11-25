<template>
<!-- // template fra vuetify -->
  <div>
    <h3 v-if="alternatives.length">Vælg grønt alternativ</h3>
    <v-select
    bg-color="dark-green"
      clearable
      chips
      label="Vælg alternativ"
      :items="alternatives"
      item-title="prodName"
      item-value="prodName"
      v-if="alternatives.length"
variant="solo-filled"
    >
    
    </v-select>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/utility/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";


// modtag produktets id som prop
const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

const alternatives = ref([]);

onMounted(async () => {
  try {
    const prodRef = doc(db, "Products", props.productId);
    const prodSnap = await getDoc(prodRef);

    if (!prodSnap.exists()) return;

    const data = prodSnap.data();
    if (Array.isArray(data.prodAlternatives)) {
      alternatives.value = data.prodAlternatives;
    
    } else {
      alternatives.value = [];
    }
  } catch (err) {
    console.error("Fejl ved hentning af alternativer:", err);
  }
  
});

</script>
<style scoped>
h3{
    font-size: small;
    font-weight: 100;
    color: green;
  
}

</style>
