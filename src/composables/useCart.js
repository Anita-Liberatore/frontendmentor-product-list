import { reactive, computed } from 'vue'

/**
 * items: Map-like { [id]: { id, name, price, image, qty } }
 */
const state = reactive({
  items: {} 
})

const count = computed(() =>
  Object.values(state.items).reduce((acc, it) => acc + it.qty, 0)
)

const subtotal = computed(() =>
  Object.values(state.items).reduce((acc, it) => acc + it.price * it.qty, 0)
)

function addItem(product, qty = 1) {
  const id = product.id ?? product.name
  const existing = state.items[id]
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, 99)
  } else {
    state.items[id] = {
      id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: Math.min(qty, 99),
    }
  }
}

function setQty(id, qty) {
  qty = Math.max(0, Math.min(99, qty))
  if (!state.items[id] && qty > 0) return
  if (qty === 0) delete state.items[id]
  else state.items[id].qty = qty
}

function increment(id) {
  if (!state.items[id]) return
  setQty(id, state.items[id].qty + 1)
}
function decrement(id) {
  if (!state.items[id]) return
  setQty(id, state.items[id].qty - 1)
}
function getQty(id) {
  return state.items[id]?.qty ?? 0
}

function remove(id) {
  setQty(id, 0)          // delega a setQty: elimina reattivamente
}

export default function useCart() {
  return {
    state,
    items: state.items,
    count,
    subtotal,
    addItem,
    setQty,
    increment,
    decrement,
    remove,
    getQty
  }

}
