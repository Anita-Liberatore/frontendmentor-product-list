<script setup>
import { ref } from 'vue'
import useCart from '../composables/useCart'
import emptyCake from '../assets/images/illustration-empty-cart.svg'
import OrderConfirmedModal from '../modal/OrderConfirmedModal.vue'  // <--- nuovo

const { state, count, subtotal, remove } = useCart()
const formatPrice = v => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)

// stato modale
const showModal = ref(false)
</script>


<template>
  <aside class="w-full max-w-md rounded-3xl bg-white shadow-sm p-6">
    <!-- Header -->
    <h2 class="text-[26px] font-extrabold text-[#c54822] mb-5">Your Cart ({{ count }})</h2>

    <!-- Empty -->
    <div v-if="count === 0" class="text-center py-10">
      <img :src="emptyCake" alt="" class="mx-auto w-24 h-24 mb-3 opacity-90" />
      <p class="text-gray-600">Your added items will appear here</p>
    </div>

    <!-- With items -->
    <div v-else class="space-y-6">
      <!-- LISTA: solo separatori orizzontali -->
      <ul class="divide-y divide-[#efe6df]">
        <li v-for="item in state.items" :key="item.id" class="py-4 first:pt-0 last:pb-0">
          <div class="flex items-start gap-3">
            <div class="flex-1 min-w-0">
              <p class="font-extrabold text-[17px] leading-snug text-[#2d1f1b]">
                {{ item.name }}
              </p>
              <div class="mt-1 text-[15px] flex items-center gap-2">
                <span class="font-extrabold text-[#d24a2c]">{{ item.qty }}x</span>
                <span class="text-[#bbaaa1]">@ {{ formatPrice(item.price) }}</span>
                <span class="text-[#7a6258] font-semibold">
                  {{ formatPrice(item.price * item.qty) }}
                </span>
              </div>
            </div>

            <!-- Remove tondo a destra -->
            <button @click="remove(item.id)" class="shrink-0 w-5 h-5 rounded-full border border-[#d9cfc9] text-[#8c6f64]
         flex items-center justify-center hover:bg-[#f7f1ed] transition" aria-label="Remove item" title="Remove">
              <img src="../assets/images/icon-remove-item.svg" alt="Remove" class="w-3 h-3" />
            </button>

          </div>
        </li>
      </ul>

      <!-- separatore grande prima del totale -->
      <hr class="border-t border-[#efe6df]" />

      <!-- Totale -->
      <div class="flex items-center justify-between">
        <span class="text-[#6f6b69]">Order Total</span>
        <span class="text-2xl font-extrabold text-[#2a1d1a]">
          {{ formatPrice(subtotal) }}
        </span>
      </div>

      <!-- Box carbon-neutral -->
      <div class="rounded-2xl bg-[#fbf4ef] border border-[#f0e6df] px-4 py-3 flex items-center gap-3">
        <img src="../assets/images/icon-carbon-neutral.svg" alt="Remove" class="w-5 h-5" />
        <p class="text-[#5a4f4a]">
          This is a <span class="font-semibold">carbon-neutral</span> delivery
        </p>
      </div>

      <button class="w-full rounded-full bg-[#c54822] hover:bg-[#b3411f] text-white font-semibold py-4 text-[17px]
         shadow-[inset_0_-2px_0_rgba(0,0,0,.12)] transition" :disabled="count === 0" @click="showModal = true">
        Confirm Order
      </button>

      <!-- mount modale -->
      <OrderConfirmedModal :show="showModal" :items="state.items" :total="subtotal" @close="showModal = false" />



    </div>
  </aside>
</template>
