export default function MultiSelect({ options, value = [], onChange }) {
  function toggle(opt) {
    if (value.includes(opt)) {
      onChange(value.filter(v => v !== opt))
    } else {
      onChange([...value, opt])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
            value.includes(opt)
              ? 'bg-rose text-white border-rose'
              : 'bg-white text-brown border-brown/30 hover:border-rose'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
