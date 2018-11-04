const myPlugin = store => {
  store.subscribe((mutation, state) => {
    console.log(mutation)
  })
}

export { myPlugin }
