import { greenwoodPluginAdapterVercel } from "@greenwood/plugin-adapter-vercel";
import type { Config } from "@greenwood/cli";

// https://greenwoodjs.dev/docs/reference/configuration/
const config: Config = {
  plugins: [greenwoodPluginAdapterVercel()]
};

export default config;
