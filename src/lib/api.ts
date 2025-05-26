// src/lib/api.ts
const STRAPI_API = process.env.STRAPI_API_URL;

export async function fetchMenuItems() {
  const res = await fetch(`${STRAPI_API}/menu-items?populate=*`);
  const data = await res.json();
  return data.data;
}

export async function fetchMenuItemBySlug(slug: string) {
  const res = await fetch(`${STRAPI_API}/menu-items?filters[slug][$eq]=${slug}&populate=*`);
  const data = await res.json();
  return data.data[0];
}
