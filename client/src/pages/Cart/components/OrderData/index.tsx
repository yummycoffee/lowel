import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { InCartItem } from '../../../../types/localStorage'
import { getCartItems } from '../../../../utils/localStorage'
import { Product } from '../../../Products'
import CartItems from './CartItems'
import OrderForm from './OrderForm'
import Summary from './Summary'

export type ShippingType = 'standard' | 'express'

export interface ProductWithQuantity extends Product {
  quantity: number
}

const fetchProducts = async () => {
  const res = await fetch('./src/data/products.json')
  const data: Product[] = await res.json()

  return data
}

const fetchProductsWithQuantity = (data: Product[]) => {
  const inCart: InCartItem[] = getCartItems()

  // finding item references available in localstorage array
  // adding 'quantity' key to every object in data array by
  // finding index of inCart item with its id, which gives quantity of product of this id
  const updated = data
    .filter((item) => inCart.map((cartItem) => cartItem.id).includes(item.id))
    .map((item) => ({
      ...item,
      quantity: inCart[inCart.findIndex((inCartItem) => inCartItem.id === item.id)].quantity,
    }))

  return updated
}

const OrderData = () => {
  const [productsData, setProductsData] = useState<Product[]>()
  const [items, setItems] = useState<ProductWithQuantity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [shippingType, setShippingType] = useState<ShippingType>('standard')

  const updateShippingType = (type: ShippingType) => {
    console.log('update shipping type')
    setShippingType(type)
  }
  const refreshItems = () => {
    if (productsData) {
      setTimeout(() => {
        setIsLoading(true)
        setItems(fetchProductsWithQuantity(productsData))
      }, 500)
      setTimeout(() => setIsLoading(false), 2000)
    }
  }

  useEffect(() => {
    fetchProducts().then((data) => setProductsData(data))
  }, [])

  useEffect(() => {
    refreshItems()
  }, [productsData])

  return (
    <section className='flex gap-8 w-[1200px] h-max'>
      <AnimatePresence mode='wait'>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='flex flex-col gap-8 w-full h-max text-4xl'
            key={`${isLoading}`}
          >
            loading...
          </motion.div>
        ) : (
          <CartItems items={items} refreshItems={refreshItems} key={`${isLoading}`} />
        )}
      </AnimatePresence>
      <div className='w-1 border-l-2 border-secondary'></div>
      <div className='flex flex-col gap-4 h-max'>
        <Summary items={items} shippingType={shippingType} />
        <hr className='border-secondary border-t-2 w-full' />
        <OrderForm updateShippingType={updateShippingType} />
      </div>
    </section>
  )
}

export default OrderData
