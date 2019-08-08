import React from 'react'
import Link from 'next/link'
import './Nav.scss';

const links = [
  { href: '/', label: 'Home' },
	{ href: '/shop', label: 'Shop' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <nav className="Nav">
    <ul>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <Link href={href}>
            <a className="dp-supporting-text">{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default Nav
