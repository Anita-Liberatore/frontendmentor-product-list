const API_URL = './src/data.json'

const fetchProducts = async () => {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Errore nel fetch dei prodotti')
    const data = await res.json()
    return data
  } catch (err) {
    console.error('fetchProducts error:', err)
    return []
  }
}

export default fetchProducts
