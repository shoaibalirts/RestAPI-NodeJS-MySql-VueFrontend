<template>
  <v-container class="mobile-container pa-4">
    <h1 class="text-h6 font-weight-medium mb-4 text-center">
      Dine Indkøbslister
    </h1>

    <v-list density="compact" class="rounded-lg elevation-1">
      <v-list-item
        v-for="list in sortedLists"
        :key="list.id"
        @click="goToList(list.id)"
        class="mb-2 rounded-lg border"
      >
        <v-list-item-title class="text-body-1 font-weight-medium">
          {{ list.name }}
        </v-list-item-title>

        <v-list-item-subtitle class="text-caption text-grey-darken-1">
          {{ formatDate(list.date) }}
        </v-list-item-subtitle>

        <template #append>
          <v-chip
            :color="getLevelColor(list.co2Level)"
            size="small"
            text-color="white"
            label
          >
            {{ list.co2Level }}
          </v-chip>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '@/utility/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

const router = useRouter()
const lists = ref([])

onMounted(async () => {
  try {
    const snapshot = await getDocs(collection(db, 'indkoebsliste'))
    const data = snapshot.docs.map((doc) => {
      const d = doc.data()

      const totalCO2 = Array.isArray(d.Products)
        ? d.Products.reduce((sum, product) => {
            if (Array.isArray(product.alternatives)) {
              return (
                sum +
                product.alternatives.reduce(
                  (altSum, alt) =>
                    altSum + (Number(alt.alternative_co2_per_kg) || 0),
                  0
                )
              )
            }
            return sum
          }, 0)
        : 0

      const co2Level = totalCO2 > 8 ? 'Høj' : totalCO2 > 3 ? 'Medium' : 'Lav'
      const date = d.CreatedDate?.toDate ? d.CreatedDate.toDate() : new Date()

      return {
        id: doc.id,
        name: d.CategoryName || 'indkøbsliste',
        date,
        totalCO2,
        co2Level,
      }
    })

    console.log('Retrieved Firestore data:', data)
    lists.value = data
  } catch (err) {
    console.error(' Firestore fetch error:', err)
  } 



})

const sortedLists = computed(() =>
  [...lists.value].sort((a, b) => b.date - a.date)
)

const formatDate = (date) =>
  date instanceof Date ? date.toLocaleDateString('da-DK') : 'Ugyldig dato'

const getLevelColor = (level) => {
  if (level === 'Høj') return 'red'
  if (level === 'Medium') return 'orange'
  return 'green'
}

const goToList = (id) => router.push(`/lists/${id}`)
</script>

<style scoped>
.mobile-container {
  max-width: 425px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #fff;
  min-height: 100vh;
}
</style>
