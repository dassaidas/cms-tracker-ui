import "./Input.css";

export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        name={name}
        className="form-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
