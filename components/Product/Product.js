import React from 'react'
import Link from 'next/link'
import { withRouter, RouterProps as router } from 'next/router'
import './Product.scss';

const Product = ({
	router,
	product,
}) => {
  return (
    <div className="Product">
      <h2 className="Product__title dp-product-title">{product.name}</h2>

			<div className="Product__product-container">
				<div className="Product__image-container">
					<img className="Product__image" src={product.image} alt={product.name} className="Product__image"/>
					<div className="Product__price dp-paragraph">${product.price.toFixed(2)}</div>
				</div>

				<p className="Product__description dp-paragraph">{product.description}</p>
			</div>

			<div className="Product__price-button-container">
        <button
          className="snipcart-add-item Button dp-paragraph"
          data-item-id={product.id}
          data-item-name={product.name}
          data-item-price={product.price}
          data-item-url={router.pathname}
          data-item-image={product.image}
					data-item-metadata={JSON.stringify(
						{
							supplier_id: product.supplierId
						}
					)}
					data-item-weight={100}
				>
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default withRouter(Product);
