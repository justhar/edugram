import { FormEvent } from "react";

export default async function loginHandler(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const response = await fetch("/api/scrapper", {
    method: "POST",
    body: formData,
  });

  // Handle response if necessary
  const data = await response.json();
  return data;
}
