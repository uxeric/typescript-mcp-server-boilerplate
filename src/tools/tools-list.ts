import { registeredTools } from "@server"
import { registerTool } from "@register"

registerTool({
  id: "tools-list",
  title: "List Available Tools",
  description: "Returns a list of all available tools",

  inputSchema: {},

  tool: async () => {
    return {
      content: [{
        type: "text",
        text: `Available tools:\n${registeredTools.map(tool =>
          `- ${tool.id}: ${tool.title} - ${tool.description}`
        ).join('\n')}`
      }]
    }
  }
})
