import { FormEvent } from "react";

export default async function loginHandler(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  console.log(formData);
  const response = await fetch("http://localhost:3001/login", {
    method: "POST",
    body: formData,
  });

  // Handle response if necessary
  const data = await response.json();
  // ...
  console.log("Login response:", data);
  return data;
}
