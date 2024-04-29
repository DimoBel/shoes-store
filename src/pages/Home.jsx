import React from 'react';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectFilter, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchShoes, selectShoesData } from '../redux/slices/shoesSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ShoesBlock from '../components/ShoesBlock';
import Skeleton from '../components/ShoesBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectShoesData);

  const onChangeCategory = React.useCallback((id) => {
    dispatch(setCategoryId(id));
    dispatch(setCurrentPage(1));
  }, []);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const [order, setOrder] = React.useState('desc');

  const getShoes = async () => {
    console.log(order);
    const sortBy = sort.sortProperty.replace('-', '');

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchShoes({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getShoes();
  }, [categoryId, sort.sortProperty, searchValue, currentPage, order]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });

    navigate(`?${queryString}`);
  }, [categoryId, sort.sortProperty, currentPage]);

  let docTitle = document.title;
  window.addEventListener('blur', () => {
    document.title = 'Верніться будь ласка ◉_◉';
  });
  window.addEventListener('focus', () => {
    document.title = docTitle;
  });

  const shoes = items.map((obj) => <ShoesBlock {...obj} />);

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort setOrder={setOrder} />
      </div>
      <h2 className="content__title">Каталог</h2>
      {status === 'error' && (
        <div className="content__error-info">
          <h2>Сталася помилка 😕</h2>
          <p>
            На жаль, не вдалося знайти моделі взуття. Перевірте правильність пошукового запиту або
            зверніться в службу підтримки.
          </p>
        </div>
      )}
      <div className="content__items">{status === 'loading' ? skeletons : shoes}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
