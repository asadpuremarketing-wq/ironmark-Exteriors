import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Gutter Cleaning offer now lives at /services/gutters (the URL
      // the Services nav links to) instead of a separate hub page, so any
      // existing links/bookmarks/search results for the old URL still land
      // on the right content instead of a 404.
      { source: "/gutter-cleaning", destination: "/services/gutters", permanent: true },
    ];
  },
};

export default nextConfig;
