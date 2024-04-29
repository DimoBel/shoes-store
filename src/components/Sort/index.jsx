import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSort } from '../../redux/slices/filterSlice';

function Sort({ setOrder }) {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = React.useRef();

  const [open, setOpen] = React.useState(false);
  const list = [
    { name: 'за популярністю', sortProperty: 'rating' },
    { name: 'за ціною', sortProperty: 'price' },
    { name: 'за алфавітом ', sortProperty: 'title' },
  ];

  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>Сортувати:</b>

        <span onClick={() => setOpen(!open)}>{sort.name}</span>
        <button onClick={() => setOrder('asc')}>↑</button>
        <button onClick={() => setOrder('desc')}>↓</button>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
