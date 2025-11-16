export type CodeBlockData = {
  language: string;
  filename: string;
  code: string;
};

export type CodeBlockContextType = {
  value: string | undefined;
  onValueChange: ((value: string) => void) | undefined;
  data: CodeBlockData[];
};
