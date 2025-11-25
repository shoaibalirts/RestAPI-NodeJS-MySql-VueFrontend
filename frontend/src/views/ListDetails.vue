<template>
  <v-container class="mobile-container pa-4 d-flex flex-column justify-space-between">
    <div>
      <div class="d-flex align-center mb-2">
        <v-btn variant="plain" size="small" @click="$router.back()">
          <v-icon :icon="mdiArrowLeft" size="25" />


        </v-btn>
        <h2 class="text-h6 font-weight-bold mb-0 ml-2">{{ list?.name }}</h2>
      </div>

      <div v-if="list">
        <div class="d-flex align-center mb-2 ml-2">
          <p class="text-subtitle-2 font-weight-medium mb-0">
            CO₂e: {{ list.totalCO2.toFixed(1) }} kg
          </p>
          <div :class="['co2-dot', getLevelColor(list.co2Level), 'ml-2', 'mr-1']"></div>
          <span class="text-body-2 font-weight-medium">{{ list.co2Level }}</span>
        </div>

        <div class="divider mb-4"></div>

        <v-list density="compact" lines="false">
          <v-list-item
            v-for="(item, i) in list.items"
            :key="i"
            class="py-1"
            @click="toggleChecked(i)"
          >
            <div class="d-flex align-center justify-space-between w-100">
              <div class="d-flex align-center">
                <div class="round-checkbox" :class="{ checked: item.checked }">
<v-icon
  v-if="item.checked"
  size="14"
  color="white"
  :icon="mdiCheck"
/>
              </div>

                <div :class="['item-text', { 'checked-text': item.checked }]">
                  <v-list-item-title class="text-body-1 font-weight-bold">
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ item.amount || '' }}
                  </v-list-item-subtitle>
                </div>
              </div>

              <span
                class="text-body-2 font-weight-medium"
                :class="{ 'checked-text': item.checked }"
              >
                {{ item.co2 }} kg CO₂
              </span>
            </div>
<green-drop-down :product-id="item.id" />
          </v-list-item>
        </v-list>
      </div>

      <div v-else>
        <v-alert type="warning" variant="tonal">
          Ingen data fundet for denne liste.
        </v-alert>
      </div>
    </div>

    <v-bottom-navigation height="56" class="bottom-bar">
      <v-btn
        variant="text"
        class="text-body-2 font-weight-medium"
        @click="$router.push('/lists')"
      >
<v-icon start :icon="mdiFormatListBulleted" />
        dine indkøbslister
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '@/utility/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import GreenDropDown from "@/components/GreenDropDown.vue";
import { mdiArrowLeft, mdiCheck, mdiFormatListBulleted } from '@mdi/js'

const route = useRoute()
const list = ref(null)

onMounted(async () => {
  const id = String(route.params.id)
  const listSnap = await getDoc(doc(db, 'indkoebsliste', id))
  if (!listSnap.exists()) return

  const data = listSnap.data()
  const productRefs = Array.isArray(data.Products) ? data.Products : []
  if (productRefs.length === 0) {
    console.warn(`List ${id} has no product references`)
  }

  const productDocs = await Promise.all(
    productRefs.map(async (prodId) => {
      const prodSnap = await getDoc(doc(db, 'Products', prodId))
      if (!prodSnap.exists()) return null

      if (!prodSnap.exists()) {
      return {
        id: prodId,
        name: 'Produkt fjernet', 
        co2: 0,
        amount: '',
        checked: false,
        alternatives: [],
      }
    }
      const p = prodSnap.data()
      return {
        id: prodId,
        name: p.prodName || 'Ukendt produkt',
        co2: Number(p.co2_per_kg) || 0,
        amount: p.amount || '',
        checked: false,
        alternatives: Array.isArray(p.alternatives)
          ? p.alternatives.map((alt) => ({
              name: alt.alternative_prod_name || 'Ukendt alternativ',
              co2: Number(alt.alternative_co2_per_kg) || 0,
            }))
          : [],
      }
    })
  )

  const items = productDocs.filter(Boolean)
  const total = items.reduce((sum, it) => sum + it.co2, 0)
  const level = total > 8 ? 'Høj' : total > 3 ? 'Medium' : 'Lav'

  list.value = {
    id: listSnap.id,
    name: data.CategoryName || data.listName || 'indkøbsliste',
    createdAt: data.CreatedDate?.toDate
      ? data.CreatedDate.toDate().toLocaleDateString('da-DK')
      : 'Ukendt dato',
    items,
    totalCO2: total,
    co2Level: level,
  }

  console.log(' Denormalized list:', list.value)
})

const toggleChecked = (index) => {
  if (!list.value) return
  list.value.items[index].checked = !list.value.items[index].checked
}

const getLevelColor = (level) => {
  if (level === 'Høj') return 'red-dot'
  if (level === 'Medium') return 'yellow-dot'
  return 'green-dot'
}
</script>


<style scoped>
.mobile-container {
  max-width: 425px;
  height: 100vh;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.divider {
  height: 1px;
  background-color: #e5e5e5;
}

.round-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #555;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.round-checkbox.checked {
  background-color: #4caf50;
  border-color: #4caf50;
}

.item-text { transition: color 0.2s ease; }
.checked-text { text-decoration: line-through; color: #9e9e9e; }

.co2-dot { width: 12px; height: 12px; border-radius: 50%; }
.red-dot { background-color: red; }
.yellow-dot { background-color: orange; }
.green-dot { background-color: green; }

.bottom-bar { border-top: 1px solid #ddd; }

.v-list, .v-list-item { padding-left: 0 !important; padding-right: 0 !important; }
</style>