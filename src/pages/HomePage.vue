<script setup>
import { ref, onMounted } from 'vue'
import fetchProducts from '../services/productService'
import ProductPage from '../pages/ProductPage.vue'
import Cart from '../components/Cart.vue'

const products = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    products.value = await fetchProducts()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="min-h-screen py-10 ">
    <div class="mx-auto max-w-[1440px] px-6 grid gap-10 lg:grid-cols-[1fr_400px] items-start">
      
      <!-- COLONNA PRODOTTI -->
      <div>
        <h1 class="text-3xl font-bold mb-6 text-gray-900">Desserts</h1>

        <p v-if="loading" class="text-gray-500">Caricamento...</p>
        <p v-else-if="error" class="text-red-600">Errore: {{ error }}</p>

        <div
          v-else
          class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          <ProductPage
            v-for="(p, i) in products"
            :key="p.id ?? i"
            :id="p.id ?? p.name"
            :name="p.name"
            :category="p.category"
            :price="p.price"
            :image="p.image.desktop"
          />
        </div>
      </div>

      <!-- COLONNA CARRELLO -->
      <Cart />
    </div>
  </section>
</template>

