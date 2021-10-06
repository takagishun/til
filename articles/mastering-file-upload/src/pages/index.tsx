import type { NextPage } from "next";
import React, { useState } from "react";

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File>();
  const handleSubmitFormData = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    text && form.append("name", text);
    file && form.append("idPhoto", file);
    fetch("/", {
      method: "POST",
      body: form,
    });
  };

  const handleSubmitOctetStream = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/a", {
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
            姓: <input type="text" name="lastName" />
          </label>
          <br />
          <label>
            名: <input type="text" name="firstName" />
          </label>
          <br />
          <input type="submit" />
        </form>
      </section>
      <section>
        <h1>application/x-www-form-urlencoded with file</h1>
        <form method="POST">
          <input type="file" name="file" />
          <br />
          <input type="submit" />
        </form>
      </section>
      <section>
        <h1>multipart/form-data</h1>
        <form method="POST" encType="multipart/form-data">
          <label>
            名前:
            <input type="text" name="name" />
          </label>
          <br />
          <label>
            顔写真:
            <input type="file" name="idPhoto" />
          </label>
          <br />
          <input type="submit" />
        </form>
      </section>
      <section>
        <h1>multipart/form-data for xhr</h1>
        <form method="POST" onSubmit={handleSubmitFormData}>
          <label>
            名前:
            <input
              type="text"
              name="name"
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <br />
          <label>
            顔写真
            <input
              type="file"
              name="idPhoto"
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
              name="idPhoto"
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
