import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import { useState } from 'react';
import './index.scss';

const Home = () => {
	const [animationState, setAnimation] = useState('starting');

	const startAnimation = () => {
		setAnimation('done');
	}

	setTimeout(startAnimation);

	return (
		<div>
			<Head title="Dankport" />
			<section className={`Home ${animationState === 'starting' ? 'Home--start': 'Home--end'}`}>
				<div className="Home__overlay">
					<div className="Home__intro">
						<h1 className="Home__title dp-title">Dankport</h1>
						<h2 className="Home__subtitle dp-subtitle">The shopping portal for all your herbal needs.</h2>
					</div>

					<a href="/shop" className="Button dp-supporting-text">
						Enter
					</a>

					<div className="Home__blurb dp-footnote">Currently under construction</div>
				</div>
			</section>

		</div>
	)
}

export default Home
