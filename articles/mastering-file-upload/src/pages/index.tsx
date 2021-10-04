import type { NextPage } from "next";
import React, { useState } from "react";

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File>();
  const handleSubmitFormData = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    file && form.append("file", file);
    text && form.append("text", text);
    fetch("/", {
      method: "POST",
      body: form,
    });
  };

  const handleSubmitOctetStream = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: file,
    });
  };

  return (
    <>
      <section>
        <h1>application/x-www-form-urlencoded</h1>
        <form method="POST">
          <label>
            firstName
            <input type="text" name="firstName" />
          </label>
          <br />
          <label>
            lastName
            <input type="text" name="lastName" />
          </label>
          <br />
          <input type="submit" />
        </form>
      </section>
      <section>
        <h1>multipart/form-data</h1>
        <form method="POST" encType="multipart/form-data">
          <label>
            text
            <input type="text" name="text" />
          </label>
          <br />
          <label>
            file
            <input type="file" name="file" />
          </label>
          <br />
          <input type="submit" />
        </form>
      </section>
      <section>
        <h1>multipart/form-data for xhr</h1>
        <form method="POST" onSubmit={handleSubmitFormData}>
          <label>
            text
            <input
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <br />
          <label>
            file
            <input
              type="file"
              name="file"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </label>
          <br />
          <input type="submit" />
        </form>
      </section>
      <section>
        <h1>application/octet-stream for xhr</h1>
        <form method="POST" onSubmit={handleSubmitOctetStream}>
          <label>
            file
            <input
              type="file"
              name="file"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </label>
          <br />
          <input type="submit" />
        </form>
      </section>
    </>
  );
};

export default Home;
