import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { motion } from 'framer-motion';

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Index = (props) => (
  <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
    <div className="container center">
      <div className="title">
        <h1>Select a protein</h1>
      </div>
      <motion.div variants={stagger} className="product-row">
        {props.products.map((product) => (
          <Link key={product.id} href="/products/[id]" as={`/products/${product.id}`}>
            <motion.div variants={fadeInUp} className="card">
              <span className="category">Protein</span>
              <motion.img
                key={product.image}
                src="https://cdn.shopify.com/s/files/1/2060/6331/products/Vegan.png?v=1574882358"
                width={250}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
              <div className="product-info">
                <h4>{product.name}</h4>
                <span>{product.price}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

Index.getInitialProps = async function () {
  const res = await fetch('http://my-json-server.typicode.com/wrongakram/demo/products');
  const data = await res.json();
  return {
    products: data,
  };
};

export default Index;
