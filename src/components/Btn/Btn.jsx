import s from './Btn.module.css'
import PropTypes from 'prop-types';

function Btn ({onClick}) {
  return(
<button className = {s.Button}onClick= {onClick}>Load more</button>
  )
}

Btn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Btn
