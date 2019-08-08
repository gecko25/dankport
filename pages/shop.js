import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import { Nav } from '../components/'
import { useState } from 'react';
import './index.scss';

const Shop = () => {
	return (
		<div>
			<Head />
			<Nav />
			<div>Here is what we got</div>
		</div>
	)
}

export default Shop;
