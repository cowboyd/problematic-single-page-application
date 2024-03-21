import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    loader: async() => {
      const response = await fetch("/api/v2/episodes");
      const episodes = await response.json();
      return episodes.slice(0,10);
      
    },
    children: [
      {
        path: "/:slug",
        element: <Episode />,
        loader: async ({ params }) => {
	  const response = await fetch(`/api/v2/episode/${params.slug}`);
	  return await response.json();
	},
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

type EpisodeMeta = {
  slug: string;
  title: string;
}

export function Nav() {
  const data = useLoaderData() as EpisodeMeta[];
  return (
    <div>
      <ul>{data.map(episode => <li key={episode.slug}>
				 <NavLink to={episode.slug}>{episode.title}</NavLink>
			       </li>)}</ul>
      <Outlet />
    </div>
  );
}

export function Episode() {
  const data = useLoaderData() as any;
  return <article>{data.transcript}</article>;
}
