import {
  Braces,
  ChartNoAxesCombined,
  Database,
  Fingerprint,
  KeyRound,
  LucideIcon,
  LockKeyhole,
} from "lucide-react";

export type ToolConfig = {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
};

export const tools: ToolConfig[] = [
  {
    title: "Dashboard",
    description: "Visao geral das ferramentas disponiveis.",
    path: "/",
    icon: ChartNoAxesCombined,
  },
  {
    title: "JSON Formatter",
    description: "Valide e formate payloads JSON.",
    path: "/json-formatter",
    icon: Braces,
  },
  {
    title: "Base64",
    description: "Codifique e decodifique textos em Base64.",
    path: "/base64",
    icon: LockKeyhole,
  },
  {
    title: "UUID Generator",
    description: "Gere identificadores UUID v4.",
    path: "/uuid-generator",
    icon: Fingerprint,
  },
  {
    title: "Password Generator",
    description: "Crie senhas fortes para testes e rotinas internas.",
    path: "/password-generator",
    icon: KeyRound,
  },
  {
    title: "SQL Formatter",
    description: "Organize consultas SQL para leitura rapida.",
    path: "/sql-formatter",
    icon: Database,
  },
];
