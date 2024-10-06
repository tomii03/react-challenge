import './../styles/button.css';

export const Button = ({ onClick, children }) => {
  return (
    <div className="Button" onClick={onClick}>{children}</div>
  )
}