# Frontend Mentor - Product list with cart

![Design preview for the Product list with cart coding challenge](./preview.jpg)

# 🍰 Product List with Cart – Frontend Mentor Challenge

Questa è la mia soluzione alla sfida **Product List with Cart** di [Frontend Mentor](https://www.frontendmentor.io/).  
L’obiettivo era replicare fedelmente il design e costruire un carrello funzionante, con logiche di aggiunta, rimozione e conferma dell’ordine.

---

## 🚀 Tech stack

- [Vue 3](https://vuejs.org/) – Composition API + `<script setup>`
- [Tailwind CSS](https://tailwindcss.com/) – utility-first per uno styling veloce e consistente
- [Vite](https://vitejs.dev/) – dev server e build rapidissima
- Reattività mobile-first e modale con `<teleport>`

---

## ⚙️ Funzionalità implementate

- ✅ Aggiunta prodotti al carrello
- ✅ Incremento/decremento quantità
- ✅ Rimozione prodotti (sia con **–** sia con ❌)
- ✅ Subtotale aggiornato in tempo reale (`computed`)
- ✅ Modale di conferma ordine (con lista prodotti + totale)
- ✅ Reset carrello con **Start New Order**
- ✅ Layout responsive (mobile / desktop)
- ✅ Hover & focus states per accessibilità

---

## 🏗️ Architettura

Componenti principali
ProductCard.vue – mostra prodotto con immagine, prezzo e pulsanti Add to Cart / + / -.

Cart.vue – mostra articoli nel carrello, subtotale e bottone Confirm Order.

OrderConfirmedModal.vue – modale che appare alla conferma dell’ordine, con lista articoli e totale finale.

🎨 Styling con Tailwind
Palette e font presi dal file style-guide.md del challenge.

Classi utility (flex, grid, rounded-3xl, shadow-lg) per replicare fedelmente il design.


🧪 Cosa ho imparato
Come gestire stato centralizzato in Vue con un composable.

Sincronizzare quantità tra stato locale della card e store globale con watch.

Usare <teleport> per modali accessibili.

Tailwind come strumento rapido per prototipare e rispettare i design pixel-perfect.

🚀 Deploy
Il progetto è pubblicato su Vercel 👉 Live demo (<-- Inserisci qui il tuo link!)

📝 Istruzioni per l’avvio in locale
Bash

# Clona il repo
git clone [https://github.com/tuo-username/product-list-cart.git](https://github.com/tuo-username/product-list-cart.git)

# Entra nella cartella
cd product-list-cart

# Installa le dipendenze
npm install

# Avvia il dev server
npm run dev
