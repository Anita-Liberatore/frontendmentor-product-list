const API_URL = `${import.meta.env.BASE_URL}data.json`

const fetchProducts = async () => {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Errore nel fetch dei prodotti')
    return await res.json()
  } catch (err) {
    console.error('fetchProducts error:', err)
    return []
  }
}

export default fetchProducts
