import React from "react";

const Footer = () => {
  return (
    <>
      <div
        className="fixed right-2 bottom-4 font-medium z-10 mx-auto flex w-auto items-center justify-center rounded border py-2 px-3 text-xs mont border-zinc-700 bg-white/30 backdrop-blur-3xl text-white shadow-lg shadow-white/20 sm:right-8 sm:bottom-10"
        style={{ boxShadow: "0 5px 20px  #0000FF." }}
      >
        Made with{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="heart mx-1 inline-block h-5 w-5 text-rose-600"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
        </svg>
        by
        <a
          href="https://github.com/subhadeeproy3902"
          className="ml-1 font-bold text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Subhadeep
        </a>
      </div>
    </>
  );
};

export default Footer;
