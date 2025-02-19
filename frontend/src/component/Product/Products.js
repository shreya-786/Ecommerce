

// import React, { Fragment, useEffect, useState } from 'react';
// import "./Products.css";
// import { useSelector, useDispatch } from 'react-redux';
// import { clearErrors, getProduct } from '../../actions/productAction';
// import Loader from '../layout/Loader/Loader';
// import ProductCard from '../Home/ProductCard';
// import { useParams } from 'react-router-dom';
// import Pagination from "react-js-pagination";
// import Slider from"@material-ui/core/Slider";
// import Typography from "@material-ui/core/Typography";

// const Products = () => {
//   const dispatch = useDispatch();

//   const [currentPage, setCurrentPage] = useState(1);

//   const [price, setPrice] = useState([0, 25000]);

//   const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(
//     state => state.products
//   );

//   const { keyword } = useParams();

//   const setCurrentPageNo = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const priceHandler = (event, newPrice) => {
//     setPrice(newPrice);
//   }

//   useEffect(() => {
//     if (error) {
//       alert(error);
//       dispatch(clearErrors());
//     }

//     dispatch(getProduct(keyword, currentPage, price));
//   }, [dispatch, keyword, currentPage, error, price]);

//   let count = filteredProductsCount;

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <h2 className='productsHeading'>Products</h2>
//           <div className='products'>
//             {products &&
//               products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//           </div>

//           <div className='filterBox'>
//             <Typography>Price</Typography>
//             <Slider
//             value={price}
//             onChange={priceHandler}
//             valueLabelDisplay='auto'
//             aria-labelledby='range-slider'
//             min={0}
//             max={25000}
//             />
//           </div>

//           {resultPerPage < count && (
//             <div className='paginationBox'>
//               <Pagination
//                 activePage={currentPage}
//                 itemsCountPerPage={resultPerPage}
//                 totalItemsCount={productsCount}
//                 onChange={setCurrentPageNo}
//                 nextPageText="Next"
//                 prevPageText="Prev"
//                 firstPageText="1st"
//                 lastPageText="Last"
//                 itemClass="page-item"
//                 linkClass="page-link"
//                 activeClass="pageItemActive"
//                 activeLinkClass="pageLinkActive"
//               />
//             </div>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default Products;
// import React, { Fragment, useEffect, useState } from 'react';
// import "./Products.css";
// import { useSelector, useDispatch } from 'react-redux';
// import { clearErrors, getProduct } from '../../actions/productAction';
// import Loader from '../layout/Loader/Loader';
// import ProductCard from '../Home/ProductCard';
// import { useParams } from 'react-router-dom';
// import Pagination from "react-js-pagination";
// import Slider from "@material-ui/core/Slider";
// import Typography from "@material-ui/core/Typography";

// const categories = [
//   "Laptop",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones",
// ];

// const Products = () => {
//   const dispatch = useDispatch();

//   const [currentPage, setCurrentPage] = useState(1);
//   const [price, setPrice] = useState([0, 25000]);
//   const [category, setCategory] = useState("");

//   const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(
//     state => state.products
//   );

//   const { keyword } = useParams();

//   const setCurrentPageNo = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const priceHandler = (event, newPrice) => {
//     setPrice(newPrice);
//   }

//   useEffect(() => {
//     if (error) {
//       alert(error);  // Ideally, replace this with a more user-friendly notification
//       dispatch(clearErrors());
//     }

//     dispatch(getProduct(keyword, currentPage, price, category));
//   }, [dispatch, keyword, currentPage, error, price, category]);

//   // Use filteredProductsCount for the count
//   let count = filteredProductsCount || productsCount;

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <h2 className='productsHeading'>Products</h2>
//           <div className='products'>
//             {products && products.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>

//           <div className='filterBox'>
//             <Typography>Price</Typography>
//             <Slider
//               value={price}
//               onChange={priceHandler}
//               valueLabelDisplay='auto'
//               aria-labelledby='range-slider'
//               min={0}
//               max={25000}
//             />
          

//           <Typography>Categories</Typography>
//           <ul className='categoryBox'>
//             {categories.map((category) => (
//               <li
//               className='category-link'
//               key={category}
//               onClick={() => setCategory(category)}
//               >
//                 {category}

//               </li>
//             ))}
//           </ul>

//           </div>

//           {resultPerPage < count && (
//             <div className='paginationBox'>
//               <Pagination
//                 activePage={currentPage}
//                 itemsCountPerPage={resultPerPage}
//                 totalItemsCount={count}
//                 onChange={setCurrentPageNo}
//                 nextPageText="Next"
//                 prevPageText="Prev"
//                 firstPageText="1st"
//                 lastPageText="Last"
//                 itemClass="page-item"
//                 linkClass="page-link"
//                 activeClass="pageItemActive"
//                 activeLinkClass="pageLinkActive"
//               />
//             </div>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default Products;
import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(
    state => state.products
  );

  const { keyword } = useParams();

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  // Use filteredProductsCount for the count
  let count = filteredProductsCount || productsCount;

  useEffect(() => {
    if (error) {
      alert(error);  // Ideally, replace this with a more user-friendly notification
      dispatch(clearErrors());
    }


    console.log(category);
    console.log(products);

    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, error, price, category]);

  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className='productsHeading'>Products</h2>
          <div className='products'>
            {/* {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))} */}
            {
              products.length>0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p>No product in this price range</p>
              )
            }
          </div>

          <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={25000}
            />
          
            <Typography>Categories</Typography>
            <ul className='categoryBox'>
              {categories.map((category) => (
                <li
                  className='category-link'
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
              value={rating}
              onChange={(e, newRating) => {
                setRating(newRating);
              }}
              aria-labelledby='continuous-slider'
              min={0}
              max={5}/>
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className='paginationBox'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={count}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;