export type RegistrationType = {
  id: string;
  title: string;
  description: string;
  inputSchema: Record<string, any>;
  tool: (params: any) => Promise<any>;
}
