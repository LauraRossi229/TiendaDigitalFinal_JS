const getProducts = async () => {
    const response = await fetch('data/stock.json')
    const data = await response.json()
  
    return data
  }
  
