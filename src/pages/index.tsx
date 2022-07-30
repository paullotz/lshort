import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  const [link, setLink] = useState("");
  const [short, setShort] = useState("");
  const [error, setError] = useState({ show: false, message: "" });

  const handleBtnShortClick = async () => {
    if (!link || !link.startsWith("http") || !link.startsWith("https")) {
      setError({ show: true, message: "Please enter a link to short!" });

      setTimeout(() => {
        setError({ show: false, message: "" });
      }, 4000);
      return;
    }

    const response = await fetch("/api/add", {
      method: "POST",
      body: JSON.stringify({ url: link }),
    });

    const data = await response.json();

    setShort(window.location.href + data.link.slug);
  };

  const handleBtnClipboardClick = () => {
    navigator.clipboard.writeText(short);
    setShort("");
    setLink("");
  };

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <Head>
        <title>lshort</title>
      </Head>

      <h1 className="text-green-700 text-3xl font-cascadia font-bold">
        Link Shortener
      </h1>

      {error.show && <p className={"text-red-500"}>Error: {error.message}</p>}
      <input
        type={"text"}
        className="rounded-md p-2 w-80 mb-2 mt-2 sm:w-8/12"
        value={short ? short : link}
        onChange={(e) => setLink(e.target.value)}
        placeholder={"https://google.com"}
      />
      <button
        className="bg-green-700 rounded-md p-2 border-spacing-2 font-cascadia w-80 sm:w-8/12"
        onClick={short ? handleBtnClipboardClick : handleBtnShortClick}
      >
        {short ? "copy to clipboard" : "short"}
      </button>
      <a
        href="https://github.com/paullotz/lshort"
        className="mt-2 font-cascadia text-white"
        target={"_blank"}
      >
        @github
      </a>
    </div>
  );
};

export default Home;
