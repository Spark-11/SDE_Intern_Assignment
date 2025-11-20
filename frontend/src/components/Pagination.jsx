import React from "react";

const Pagination = ({ total, page, setPage }) => {
  
  const buttons = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <>
      <div className="flex justify-center mt-4 gap-2">
        {buttons.map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-4 py-2 rounded border ${
              num === page ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </>
  );
};

export default Pagination;
