import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets src/proxy.ts see the router headers (rsc, next-router-prefetch) so it
  // can tell real visits apart from link prefetches.
  skipProxyUrlNormalize: true,
  // Dev only: lets phones on the same Wi-Fi (http://<mac-lan-ip>:3000) and
  // ngrok tunnels load client JS (quiz, form, route beacon). Ignored in production.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.app", "*.ngrok.dev"],
};

export default nextConfig;
