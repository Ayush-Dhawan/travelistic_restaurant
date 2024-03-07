import './Button.css'

export default function Button({children, color, isAnimated, link, type="button", onClick, submit=""}) {
    return (
      <div>
        <a onClick={onClick} href={link} className={`${type} button-${color} ${isAnimated ?  "button-animated": ""}`}>{children}</a>
      </div>
    )
  }