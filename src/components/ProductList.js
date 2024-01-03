import React, { useEffect, useState } from 'react';

export default function ProductList(props) {
  const { searchText } = props;
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(`https://dummyjson.com/products/search?q=${searchText}`)
      .then((resp) => resp.json())
      .then((rs) => {
        setData(rs);
      });
  }, [searchText]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.products?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const renderItems = currentItems.map((el) => (
    <div key={el.id} className="product-item">
      <div className="product-details">
        <h3>{el.title}</h3>
        <p>Price: ${el.price}</p>
      </div>
    </div>
  ));

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(data.products?.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="product-list">
      <ul>{renderItems}</ul>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <div className="page-indicator">
          Page {currentPage} of {Math.ceil(data.products?.length / itemsPerPage)}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(data.products?.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
