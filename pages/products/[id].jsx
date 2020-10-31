import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { fadeInUp, stagger } from '../../animations';

const Product = (props) => (
  <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
    <div className="fullscreen">
      <div className="product">
        <motion.div className="img" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.img
            key={props.product.image}
            src="https://cdn.shopify.com/s/files/1/2060/6331/products/Vegan.png?v=1574882358"
            transition={{ delay: 0.2 }}
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          />
        </motion.div>
        <div className="product-details">
          <motion.div className="inner" variants={stagger}>
            <Link href="/">
              <motion.div variants={fadeInUp}>
                <a className="go-back">Back to products</a>
              </motion.div>
            </Link>
            <motion.div variants={fadeInUp}>
              <span className="category">Protein</span>
            </motion.div>
            <motion.h1 variants={fadeInUp}>{props.product.name}</motion.h1>
            <motion.p variants={fadeInUp}>{props.product.details}</motion.p>
            <motion.div className="additonals" variants={fadeInUp}>
              <span>Soy Free</span>
              <span>Gluten Free</span>
            </motion.div>
            <motion.div className="qty-price" variants={fadeInUp}>
              <div className="qty">
                <div className="minus">-</div>
                <div className="amount">1</div>
                <div className="add">+</div>
              </div>
              <span className="price">{props.product.price}</span>
            </motion.div>
            <motion.div className="btn-row" variants={fadeInUp}>
              <button className="add-to-cart"> Add to cart</button>
              <button className="subscribe"> Subscribe</button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

Product.getInitialProps = async function (context) {
  const { id } = context.query;
  const res = await fetch(`http://my-json-server.typicode.com/wrongakram/demo/products/${id}`);
  const product = await res.json();
  return { product };
};

export default Product;
