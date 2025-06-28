// path: @server
import type { RegistrationType } from "@types"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { registerTools } from "@register"
import packageJson from "../package.json" assert { type: "json" }
export const registeredTools: RegistrationType[] = []

export const server = new McpServer({
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
})

async function startServer() {
  await registerTools()
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("MCP server is running...") // error to avoid interfering with JSON-RPC stdout
}

startServer().catch((error) => {
  console.error("Server error:", error)
  process.exit(1)
})
