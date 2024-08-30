import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import responseCars from '../assets/cars.json'
import { useNavigate } from 'react-router-dom'

export const ProductContext = createContext()
const cars = responseCars
const localStorage = window.localStorage

const ProductContextProvider = ({ children }) => {
  ProductContextProvider.propTypes = {
    children: PropTypes.node.isRequired
  }
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products')
    return storedProducts ? JSON.parse(storedProducts) : cars.map(product => ({ ...product, liked: false }))
  })
  const [carSelected, setCarSelected] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    // Load products from localStorage on component mount
    console.log(cars)
    const storedProducts = localStorage.getItem('products')
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    } else {
      setProducts(cars)
    }
  }, [])

  useEffect(() => {
    // Save products to localStorage whenever it changes
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  const addProduct = (product) => {
    setProducts([...products, { ...product, liked: false }])
  }

  const updateProduct = (updatedProduct) => {
    console.log(updatedProduct)
    setProducts(products.map((product) => (product.id === updateProduct.id ? updatedProduct : product)))
  }

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const toggleLike = (id) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, liked: !product.liked } : product
      )
    )
  }

  const isLiked = (id) => {
    const product = products.find(product => product.id === id)
    return product ? product.liked : false
  }

  const handleSeeSelectedCar = (event, id) => {
    event.preventDefault()
    setCarSelected(products.find(product => product.id === id))
    navigate(`/car/${id}`)
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, carSelected, handleSeeSelectedCar, toggleLike, isLiked }}>
      {children}
    </ProductContext.Provider>
  )
}

const useProducts = () => {
  const context = React.useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductContextProvider')
  }
  return context
}

export { ProductContextProvider, useProducts }
