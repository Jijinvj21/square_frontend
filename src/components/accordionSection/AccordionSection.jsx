import React from "react";

const AccordionSection = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="pb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <button
          onClick={onToggle}
          className="text-2xl px-2 hover:text-gray-600 transition-colors"
          aria-label={`Toggle ${title.toLowerCase()} section`}
        >
          {isOpen ? "−" : "+"}
        </button>
      </div>
      {isOpen && <div className="pt-2">{children}</div>}
    </div>
  );
};

export default AccordionSection;
