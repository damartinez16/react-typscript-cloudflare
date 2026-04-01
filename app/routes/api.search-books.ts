import { data, type LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query) {
    return data({ docs: [] });
  }

  const res = await fetch(
    `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Response("Failed to fetch books", { status: 500 });
  }

  const result = await res.json();
  return data(result);
}