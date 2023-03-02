import { useSelector, useDispatch } from 'react-redux';
import { filterValue, getFilter } from 'redux/contacts-slice';
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
          dispatch(filterValue(event.target.value.toLowerCase()))
        }
      />
    </label>
  );
};

export default Filter;
