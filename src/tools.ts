import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { registeredTools, server } from "@server"
import type { RegistrationType } from "@types"

export const registerTool = (tool: RegistrationType) => {
  // Register for tool listing
  registeredTools.push({
    id: tool.id,
    title: tool.title,
    description: tool.description,
  } as RegistrationType)

  // Register with the server
  server.registerTool(
    tool.id,
    {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.inputSchema,
    },
    tool.tool,
  )
}

export const registerTools = async () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const toolsDir = path.join(__dirname, "tools")
  const files = fs.readdirSync(toolsDir)

  // Check if we're running from the dist directory
  const isProduction = __dirname.includes('/dist')
  const fileExtension = isProduction ? '.js' : '.ts'

  const importPromises = files
    .filter(file => file.endsWith(fileExtension))
    .map(file => import(`./tools/${file}`))

  await Promise.all(importPromises)
}
