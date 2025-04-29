import React from "react";

const ColorSelector = ({ colors, selectedColor, onColorSelect }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-900">
        Color: {selectedColor?.name}
      </h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorSelect(color)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedColor?.name === color.name
                ? "border-black scale-110"
                : "border-gray-200 hover:border-gray-400"
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;