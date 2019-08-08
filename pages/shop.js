import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import { Nav, Product } from '../components/'
import './index.scss';

const Shop = ({ products }) => {
	return (
		<div>
			<Head />
			<Nav />
			<div className="ProductList">
				{ products.map(product => <Product product={product} key={product.id}/>) }
			</div>
		</div>
	)
}

// This stuff would go in a CMS
// Using snipcart product definition (?)-- https://docs.snipcart.com/configuration/product-definition
Shop.getInitialProps = async ({ req }) => {
  return {
		products: [
		  {
				id: 1,
				name: 'Sleepy C',
				price: 45,
				url: 'https://madebyhemp.com/product/therapeutic-cbd-chocolate/?sscid=81k3_7x3of',
				description: 'These artisanal chocolate bars are infused with edible CBD. Each bar includes four snack-sized bits that contain 15 milligrams of CBD each (so the full-size bar includes 60 milligrams of CBD). It comes in several flavors like raspberry and cinnamon, peach hazelnut, caramel coconut, peanut butter and honey, and classic dark chocolate. Plus, each bar comes in a resealable ziplock so you can break of one piece at a time and know exactly how much CBD you\'re consuming in one sitting.',
				image: 'https://img.huffingtonpost.com/asset/5c4b660324000053019fa31f.png'
			},
			{
				id: 2,
				name: 'Vertly CBD Infused Bath Salts',
				price: 29,
				url: 'https://credobeauty.com/products/cbd-infused-bath-salts?sscid=81k3_7x2qo&utm_source=shareasale&utm_medium=referral&utm_campaign=shareasale',
				description: 'For tired, stressed-out bodies, these natural bath salts provide 50 milligrams of CBD to calm the body and mind. This signature formula may also provide relief for aches and soreness from exercise, travel and everyday life stress. It\'s made of a soothing blend of lavender, lemon and clary sage. Soak for at least 20 minutes for maximum relaxation.',
				image: 'https://img.huffingtonpost.com/asset/5c4b5be43b00001402689333.png?ops=scalefit_960_noupscale&format=webp'
			},
		]
	}
}

export default Shop;
