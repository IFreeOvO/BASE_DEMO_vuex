const products = [
  {id:1 , title: 'iPad Mini', price: 500, inventory: 2},
  {id:2 , title: 'T-shirt', price: 10, inventory: 10},
  {id:3 , title: 'Sucker CD', price: 20, inventory: 5}
]

export const getAllProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    },)
  })
}

export const buyProducts = (products, cb , errCb) =>{
  setTimeout(() => {
    Math.random() > 0.5 ? cb() : errCb()
  }, 100)
}