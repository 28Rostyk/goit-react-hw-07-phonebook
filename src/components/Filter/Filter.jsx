import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/filter/filter-selectors';
import { setFilter } from 'redux/filter/filter-slice';
import css from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  return (
    <label>
      Find contacts by name
      <input
        value={filter}
        className={css.Filter}
        type="text"
        onChange={event =>
          dispatch(setFilter(event.target.value.toLowerCase()))
        }
      />
    </label>
  );
};

export default Filter;
