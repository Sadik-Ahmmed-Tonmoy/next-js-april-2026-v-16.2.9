
type FetchMode = "ssr" | "ssg" | "isr";

type FetchOptions = {
  mode?: FetchMode;
  revalidate?: number;
  tags?: string[];
};

type NextRequestInit = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

export async function fetchData<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    mode = "ssr",
    revalidate = 60,
    tags,
  } = options;

  let fetchOptions: NextRequestInit = {};

  switch (mode) {
    case "ssr":
      fetchOptions = {
        cache: "no-store",
      };
      break;

    case "ssg":
      fetchOptions = {
        cache: "force-cache",
        next: { revalidate: false },
      };
      break;

    case "isr":
      fetchOptions = {
        cache: "force-cache",
        next: { revalidate, tags },
      };
      break;

    default:
      fetchOptions = {
        cache: "no-store",
      };
      break;
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(
      `API request failed: ${res.status} ${res.statusText}`
    );
  }

  return (await res.json()) as T;
}




//SSR

// import { fetchData } from "@/lib/api";

// type Product = {
//   id: number;
//   title: string;
// };



// export default async function ProductsPage() {
//   const products = await fetchData<Product[]>(
//     "https://jsonplaceholder.typicode.com/posts",
//     { mode: "ssr" }
//   );

//   return (
//     <main>
//       <h1>Products (SSR)</h1>

//       {products.slice(0, 10).map((product) => (
//         <p key={product.id}>{product.title}</p>
//       ))}
//     </main>
//   );
// }


//SSG

// import { fetchData } from "@/lib/api";

// type Blog = {
//   id: number;
//   title: string;
// };

// export default async function BlogsPage() {
//   const blogs = await fetchData<Blog[]>(
//     "https://jsonplaceholder.typicode.com/posts",
//     { mode: "ssg" }
//   );

//   return (
//     <main>
//       <h1>Blogs (SSG)</h1>

//       {blogs.slice(0, 10).map((blog) => (
//         <p key={blog.id}>{blog.title}</p>
//       ))}
//     </main>
//   );
// }


//ISR

// import { fetchData } from "@/lib/api";

// type Category = {
//   id: number;
//   title: string;
// };

// export default async function CategoriesPage() {
//   const categories = await fetchData<Category[]>(
//     "https://jsonplaceholder.typicode.com/posts",
//     {
//       mode: "isr",
//       revalidate: 60,
//       tags: ["categories"],
//     }
//   );

//   return (
//     <main>
//       <h1>Categories (ISR)</h1>

//       {categories.slice(0, 10).map((category) => (
//         <p key={category.id}>{category.title}</p>
//       ))}
//     </main>
//   );
// }
