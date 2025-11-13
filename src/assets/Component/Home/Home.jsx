import React from 'react'
import { Banner } from '../Pages/Banner/Banner'
import { LatestProducts } from '../LatestProducts/LatestProducts'
import { EachLatestProduct } from '../EachLatestProduct/EachLatestProduct'
import WhyChoose from '../Pages/WhyChoose/WhyChoose'
import HowItWorks from '../Pages/HowItWorks/HowItWorks'
import Footer from '../Pages/Footer/Footer'

const latestProductsPromise =fetch('http://localhost:3000/latest-products')
.then(result=>result.json())
export const Home = () => {

  return (
    <div>
  <Banner></Banner>
  <LatestProducts latestProductsPromise={latestProductsPromise}>

  </LatestProducts >
  <WhyChoose></WhyChoose>
  <HowItWorks></HowItWorks>

  </div>
  )
}
