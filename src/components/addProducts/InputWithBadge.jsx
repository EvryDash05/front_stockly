
function InputWithBadge({ 
  label, 
  badge, 
  badgePosition = 'right', 
  helperText, 
  ...props 
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold text-gray-600">{label}</label>}
      <div className={`flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#3B46C4] focus-within:ring-1 focus-within:ring-[#3B46C4] ${props.readOnly ? 'bg-gray-50/70 border-gray-100' : ''}`}>
        
        {badge && badgePosition === 'left' && (
          <span className="bg-gray-50 px-4 py-2.5 text-xs font-semibold text-gray-500 border-r border-gray-200 flex items-center">{badge}</span>
        )}
        
        <input 
          {...props} 
          className={`w-full px-4 py-2.5 text-sm focus:outline-none bg-transparent ${props.readOnly ? 'text-gray-500 font-medium cursor-not-allowed' : 'text-gray-700'}`}
        />
        
        {badge && badgePosition === 'right' && (
          <span className="bg-gray-50 px-4 py-2.5 text-xs font-semibold text-gray-400 border-l border-gray-200 flex items-center">{badge}</span>
        )}
        
      </div>
      {helperText && <span className="text-[11px] text-gray-400">{helperText}</span>}
    </div>
  );
}

export default InputWithBadge;