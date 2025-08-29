<script setup>
import { ref, watch } from 'vue'
import useCart from '../composables/useCart'

/* opzionale: tieni pure l'icona carrello per lo stato iniziale */
import iconAddToCart from '/Users/anitaliberatore/Projects/frontementor-challenge/product-list/src/assets/images/icon-add-to-cart.svg'

const props = defineProps({
  id: [String, Number],
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
})

/* ---- cart state ---- */
const { state, addItem, setQty } = useCart()
const key = props.id ?? props.name
const qty = ref(state.items[key]?.qty ?? 0)

/* controlli locale quantità */
const add = () => (qty.value = Math.min(qty.value + 1, 99))
const sub = () => (qty.value = Math.max(qty.value - 1, 0))

watch(qty, (v, old) => {
  if (v === 0 && old > 0) setQty(key, 0)
  else if (old === 0 && v > 0) addItem({ id: key, name: props.name, price: props.price, image: props.image }, v)
  else if (v > 0) setQty(key, v)
})

watch(
  () => state.items[key]?.qty ?? 0,
  (storeQty) => {
    if (storeQty !== qty.value) qty.value = storeQty
  },
  { immediate: true }
)


const formatPrice = v =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)

const pressed = ref(null) // 'minus' | 'plus' | null
const onDown = k => (pressed.value = k)
const onUp = () => (pressed.value = null)
</script>

<template>
  <div class="group rounded-2xl">
    <!-- immagine -->
    <div class="relative">
      <img :src="image" :alt="name" class="block w-full h-56 object-cover rounded-2xl" loading="lazy" />

      <!-- PILLOLA sovrapposta -->
      <div class="absolute left-1/2 -translate-x-1/2 -bottom-5">
        <!-- stato: Add to Cart -->
        <button v-if="qty === 0" @click="add" class="flex justify-center items-center gap-2 bg-white border border-[#e7e1db]
         px-6 py-2.5 rounded-full text-sm font-semibold text-[#353535]
         whitespace-nowrap shadow-[0_2px_6px_rgba(0,0,0,.08)]
         hover:bg-[#f7f5f4] transition w-[180px]"
          >
          <img :src="iconAddToCart" alt="" class="w-5 h-5" />
          <span>Add to Cart</span>
        </button>


        <!-- stato: Quantity (attivo) -->
        <div v-else class="pill-qty relative inline-flex items-center justify-center
                 bg-[#d24a2c] text-white rounded-full h-10 px-12
                 shadow-[0_2px_6px_rgba(0,0,0,.10)] select-none">
          <!-- minus -->
          <button @pointerdown="onDown('minus')" @pointerup="onUp" @pointerleave="onUp" @click="sub"
            class="pill-btn absolute left-2" :class="{ 'is-pressed': pressed === 'minus' }"
            aria-label="Decrease quantity">
            <span class="icon-minus"></span>
          </button>

          <!-- quantità centrata -->
          <span class="font-semibold text-[15px] leading-none">{{ qty }}</span>

          <!-- plus -->
          <button @pointerdown="onDown('plus')" @pointerup="onUp" @pointerleave="onUp" @click="add"
            class="pill-btn absolute right-2" :class="{ 'is-pressed': pressed === 'plus' }"
            aria-label="Increase quantity">
            <span class="icon-plus"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- testo -->
    <div class="pt-8 pb-5 px-2">
      <p class="text-sm font-semibold text-[#9a8f88]">{{ category }}</p>
      <h3 class="mt-1 text-lg md:text-xl font-normal leading-snug">
        {{ name }}
      </h3>
      <p class="mt-1 font-extrabold text-[#d24a2c]">{{ formatPrice(price) }}</p>
    </div>
  </div>
</template>

<style scoped>
/* larghezza consigliata per una pill consistente */
.pill-qty {
  min-width: 152px;
}

/* cerchi bianchi ai lati */
.pill-btn {
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  background: #fff;
  border: 1px solid #efdfd9;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .06);
  transition: background .12s ease, border-color .12s ease, transform .06s ease;
}

.pill-btn.is-pressed {
  transform: scale(.97);
}

/* icona - realizzata via CSS (linea orizzontale) */
.icon-minus,
.icon-plus {
  position: relative;
  display: block;
  width: 14px;
  height: 14px;
}

.icon-minus::before,
.icon-plus::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 2px;
  transform: translateY(-50%);
  background: #d24a2c;
  border-radius: 2px;
}

.icon-plus::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: #d24a2c;
  border-radius: 2px;
}
</style>
