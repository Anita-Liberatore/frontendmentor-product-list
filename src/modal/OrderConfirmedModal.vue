<script setup>
const props = defineProps({
  show: { type: Boolean, required: true },
  items: { type: Array, default: () => [] },
  total: { type: Number, default: 0 }
})
const emit = defineEmits(['close'])

const formatPrice = v =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)
</script>

<template>
  <teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50">
      <!-- overlay -->
      <div class="absolute inset-0 bg-black/50" @click="emit('close')"></div>

      <!-- panel -->
      <div class="absolute inset-0 grid place-items-center p-4">
        <div class="w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 shadow-xl">
          <!-- check icon -->
          <div class="w-10 h-10 rounded-full grid place-items-center mb-3">
            <img src="../assets/images/icon-order-confirmed.svg" alt="Remove" class="w-10 h-10" />
          </div>

          <!-- title + subtitle -->
          <h2 class="text-[28px] md:text-[32px] font-extrabold text-[#2a1d1a] leading-tight">
            Order Confirmed
          </h2>
          <p class="text-[#8a7a73] mt-1 mb-6">We hope you enjoy your food!</p>

          <!-- items card -->
          <div class="rounded-2xl bg-[#fbf4ef] border border-[#f0e6df] p-4 md:p-5">
            <ul class="divide-y divide-[#efe6df]">
              <li v-for="item in items" :key="item.id" class="py-4 first:pt-0 last:pb-4 flex items-center gap-3">
                <img v-if="item.image" :src="item.image" alt="" class="w-12 h-12 rounded-lg object-cover" />
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-[#2d1f1b] truncate">
                    {{ item.name }}
                  </p>
                  <div class="text-sm flex items-center gap-2">
                    <span class="font-extrabold text-[#d24a2c]">{{ item.qty }}x</span>
                    <span class="text-[#bbaaa1]">@ {{ formatPrice(item.price) }}</span>
                  </div>
                </div>
                <span class="text-sm font-semibold text-[#2d1f1b]">
                  {{ formatPrice(item.price * item.qty) }}
                </span>
              </li>
            </ul>

            <!-- separatore grande prima del totale -->
            <hr class="border-t border-[#efe6df]" />
            <!-- total row -->
            <div class="mt-4 flex items-center justify-between">
              <span class="text-[#6f6b69]">Order Total</span>
              <span class="text-2xl font-extrabold text-[#2a1d1a]">
                {{ formatPrice(total) }}
              </span>
            </div>
          </div>

          <!-- CTA -->
          <button class="mt-6 w-full rounded-full bg-[#c54822] hover:bg-[#b3411f] text-white font-semibold py-4 text-[17px]
                   shadow-[inset_0_-2px_0_rgba(0,0,0,.12)] transition" @click="emit('close')">
            Start New Order
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
