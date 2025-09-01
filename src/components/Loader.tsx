import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#E8E6E6]">
      {/* Loader */}
      <span className="loader">
        <span className="loader-inner">
          <div></div>
        </span>
      </span>

      {/* Inline CSS */}
      <style>{`
        .loader {
          display: inline-block;
          width: 30px;
          height: 30px;
          position: relative;
          border: 2px solid #fff;
          animation: loader 2s infinite ease;
        }

        .loader-inner {
          vertical-align: top;
          display: inline-block;
          width: 100%;
          background-color: #8C2C92;
          animation: loader-inner 2s infinite ease-in;
        }

        .loader-inner div {
          width: 30px;
          height: 30px;
          background: #000;
          position: absolute;
          left: calc(50% - 15px);
          top: calc(50% - 15px);
          z-index: -1;
        }

        @keyframes loader {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(180deg); }
          50% { transform: rotate(180deg); }
          75% { transform: rotate(360deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes loader-inner {
          0% { height: 0%; }
          25% { height: 0%; }
          50% { height: 100%; }
          75% { height: 100%; }
          100% { height: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
