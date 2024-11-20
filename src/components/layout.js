import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle, 
  logo
} from './layout.module.css'
import pokemonLogo from '../images/pokemonlogo.png';

const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `)
  return (
    <div className={container}>
      <header className={siteTitle}>
        <img src={pokemonLogo} alt="Pokemon Logo" className={logo} />
        {/* {data.site.siteMetadata.title} */}
      </header>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              About
            </Link>
          </li>
          {/* <li className={navLinkItem}>
            <Link to="/blog" className={navLinkText}>
              Blog
            </Link>
          </li> */}
          

          <li className={navLinkItem}>
            <Link to="/pokemon" className={navLinkText}>
              Pokemon Lookup
            </Link>
          </li>

          <li className={navLinkItem}>
            <Link to="/pokeAll" className={navLinkText}>
              Pokedex
            </Link>
          </li>

          <li className={navLinkItem}>
            <Link to="/pokeTeam" className={navLinkText}>
              my team
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  )
}

export default Layout