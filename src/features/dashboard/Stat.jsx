import PropTypes from 'prop-types';
import './DashBoard.css'
// CSS


// JSX
function Stat({ icon, title, value, color }) {
  return (
    <div className="styled-stat">
      <div className="icon" style={{ backgroundColor: `var(--color-${color}-100)` }}>
        {icon}
      </div>
      <div style={{backgroundColor: 'transparent'}}>
            <h5 className="title">{title}</h5>
            <p className="value">{value}</p>
      </div>
    </div>
  );
}

Stat.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};

export default Stat;
