import { registerTool } from "@register"
import { z } from "zod"

registerTool({
  id: "greet",
  title: "Greet User",
  description: "Returns a greeting message for a given name",

  inputSchema: {
    name: z.string()
  },

  tool: async ({ name }: { name: string }) => {
    return {
      content: [{
        type: "text",
        text: `Hello, ${name}! Welcome to the basic MCP server!`
      }]
    }
  }
})
