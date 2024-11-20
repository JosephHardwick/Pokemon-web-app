import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';

const IndexPage = () => {
  useEffect(() => {
    navigate('/pokeAll');
  }, []);

  return (
    <Layout pageTitle="Home Page">
      <p>Welcome to my pokemon companion app! Here, you can explore detailed information about all your favorite Pokémon, from their stats and abilities to their evolutions and habitats. Whether you're a seasoned trainer or just starting your journey, our comprehensive database has everything you need to become a Pokémon master. Dive in and discover the world of Pokémon like never before!</p>
      <p>you can also save you favorite pokemon to your team for later viewing!</p>
    </Layout>
  );
};

export const Head = () => <Seo title="Home Page" />

export default IndexPage;