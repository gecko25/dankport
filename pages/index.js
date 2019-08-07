import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
// import Nav from '../components/nav'
import './index.scss';

const Home = () => (
  <div>
    <Head title="Dankport" />
		<section className="Home">
			<div className="Home__intro">
				<h1 className="Home__title dp-title">Dankport.</h1>
				<h2 className="Home__subtitle dp-subtitle">The shopping portal for all your herbal needs.</h2>
			</div>
		</section>
  </div>
)

export default Home
