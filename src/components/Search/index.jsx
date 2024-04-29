import React from 'react';
import debounce from 'lodash.debounce';

import searchIcon from './searchIcon.svg';
import clearIcon from './x_Icon.svg';
import styles from './Search.module.scss';

import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');

  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  const onMouseDownClear = (event) => {
    // фикс бага кнопки очистки поля поиска
    event.preventDefault();
    onClickClear();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 300),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="Пошук"></img>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Знайти товар..."
      />
      {value && (
        <img
          onMouseDown={onMouseDownClear}
          onClick={onClickClear}
          className={styles.clearIcon}
          src={clearIcon}
          alt="Очистити поле пошуку"></img>
      )}
    </div>
  );
};

export default Search;
