"use client";

import { useEffect, useState } from "react";

export type Locale = "pt" | "en" | "de";

export const LOCALES: Locale[] = ["en", "pt", "de"];

const STORAGE_KEY = "ai-prompt-optimizer-locale";

export function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "pt" || stored === "en" || stored === "de") return stored;
  const nav = window.navigator.language.slice(0, 2).toLowerCase();
  if (nav === "pt" || nav === "de") return nav;
  return "en";
}

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  function setLocale(next: Locale) {
    window.localStorage.setItem(STORAGE_KEY, next);
    setLocaleState(next);
  }

  return { locale, setLocale };
}

type UiStrings = {
  signIn: string;
  signOut: string;
  admin: string;
  heroTitle: string;
  heroSubtitle: string;
  privateNote: string;
  cardImprovedPromptTitle: string;
  cardImprovedPromptDesc: string;
  cardImprovementsTitle: string;
  cardImprovementsDesc: string;
  cardMissingContextTitle: string;
  cardMissingContextDesc: string;
  cardTipsTitle: string;
  cardTipsDesc: string;
  modelsCaption: string;
  signInPrivateNote: string;
  accessDenied: string;
  placeholder: string;
  optimizerSubtitle: string;
  optimizeButton: string;
  optimizingButton: string;
  copy: string;
  copied: string;
  nothingToReport: string;
  thisCall: string;
  tokens: (total: number, promptTokens: number, completionTokens: number) => string;
  left: (remaining: string, limit: string | null) => string;
  perMillionTokens: (promptPrice: string, completionPrice: string) => string;
  tabOptimize: string;
  tabEvaluate: string;
  evalSubtitle: string;
  originalPromptPlaceholder: string;
  responsePlaceholder: string;
  evaluateButton: string;
  evaluatingButton: string;
  scoreLabel: string;
  instructionComplianceTitle: string;
  clarityTitle: string;
  completenessTitle: string;
  relevanceTitle: string;
  hallucinationsTitle: string;
  strengthsTitle: string;
  evalImprovementsTitle: string;
  evalSectionTitle: string;
  cookieBody: string;
  cookieAccept: string;
  cookieReject: string;
};

export const ui: Record<Locale, UiStrings> = {
  en: {
    signIn: "Sign in with Google",
    signOut: "Sign out",
    admin: "Admin",
    heroTitle: "AI Prompt Optimizer",
    heroSubtitle:
      "Paste a rough prompt. Get back a clearer, professional, ready-to-use version — plus what changed, what was missing, and how to write better prompts next time.",
    privateNote: "Private app — access limited to authorized accounts.",
    cardImprovedPromptTitle: "Improved Prompt",
    cardImprovedPromptDesc: "A rewritten, professional version of your prompt, ready to copy and paste anywhere.",
    cardImprovementsTitle: "Improvements",
    cardImprovementsDesc: "A plain-English list of exactly what changed and why, so you learn as you go.",
    cardMissingContextTitle: "Missing Context",
    cardMissingContextDesc: "The ambiguities and gaps in your original prompt that were worth flagging.",
    cardTipsTitle: "Tips",
    cardTipsDesc: "General pointers for writing sharper prompts, tailored to your specific case.",
    modelsCaption: "Choose between Gemini, GPT and Claude models via OpenRouter — with live token count, response time and remaining budget.",
    signInPrivateNote: "This app is private. Sign in with the Google account that was granted access.",
    accessDenied: "That Google account isn't authorized to use this app.",
    placeholder: "Paste your prompt...",
    optimizerSubtitle: "Paste a rough prompt and get a clearer, professional, ready-to-use version.",
    optimizeButton: "Optimize Prompt",
    optimizingButton: "Optimizing...",
    copy: "Copy",
    copied: "Copied",
    nothingToReport: "Nothing to report.",
    thisCall: "this call",
    tokens: (total, p, c) => `${total} tokens (${p} in / ${c} out)`,
    left: (remaining, limit) => `${remaining} left${limit ? ` of ${limit}` : ""}`,
    perMillionTokens: (p, c) => `${p} in / ${c} out per 1M tokens`,
    tabOptimize: "Optimize Prompt",
    tabEvaluate: "Evaluate Response",
    evalSubtitle: "Paste the original prompt and the response an AI gave for it, and get a critical evaluation.",
    originalPromptPlaceholder: "Paste the original prompt...",
    responsePlaceholder: "Paste the AI's response...",
    evaluateButton: "Evaluate Response",
    evaluatingButton: "Evaluating...",
    scoreLabel: "Score",
    instructionComplianceTitle: "Instruction Compliance",
    clarityTitle: "Clarity",
    completenessTitle: "Completeness",
    relevanceTitle: "Relevance",
    hallucinationsTitle: "Hallucinations",
    strengthsTitle: "Strengths",
    evalImprovementsTitle: "Improvements to Make",
    evalSectionTitle: "Also included: AI Response Evaluator",
    cookieBody: "I use Google Analytics to understand how many people visit this app. Do you accept analytics cookies?",
    cookieAccept: "Accept",
    cookieReject: "Reject",
  },
  pt: {
    signIn: "Iniciar sessão com Google",
    signOut: "Terminar sessão",
    admin: "Admin",
    heroTitle: "AI Prompt Optimizer",
    heroSubtitle:
      "Cola um prompt em bruto. Recebe de volta uma versão mais clara e profissional, pronta a usar — mais o que mudou, o que faltava, e dicas para escreveres melhores prompts no futuro.",
    privateNote: "App privada — acesso limitado a contas autorizadas.",
    cardImprovedPromptTitle: "Prompt Melhorado",
    cardImprovedPromptDesc: "Uma versão reescrita e profissional do teu prompt, pronta a copiar e colar em qualquer lado.",
    cardImprovementsTitle: "Melhorias",
    cardImprovementsDesc: "Uma lista simples do que mudou exatamente e porquê, para aprenderes ao longo do caminho.",
    cardMissingContextTitle: "Contexto em Falta",
    cardMissingContextDesc: "As ambiguidades e lacunas no teu prompt original que valia a pena assinalar.",
    cardTipsTitle: "Dicas",
    cardTipsDesc: "Sugestões gerais para escreveres prompts mais afiados, adaptadas ao teu caso específico.",
    modelsCaption: "Escolhe entre modelos Gemini, GPT e Claude via OpenRouter — com contagem de tokens, tempo de resposta e saldo restante em tempo real.",
    signInPrivateNote: "Esta app é privada. Inicia sessão com a conta Google à qual foi dado acesso.",
    accessDenied: "Essa conta Google não está autorizada a usar esta app.",
    placeholder: "Cola o teu prompt...",
    optimizerSubtitle: "Cola um prompt em bruto e recebe uma versão mais clara e profissional, pronta a usar.",
    optimizeButton: "Otimizar Prompt",
    optimizingButton: "A otimizar...",
    copy: "Copiar",
    copied: "Copiado",
    nothingToReport: "Nada a assinalar.",
    thisCall: "esta chamada",
    tokens: (total, p, c) => `${total} tokens (${p} entrada / ${c} saída)`,
    left: (remaining, limit) => `${remaining} restantes${limit ? ` de ${limit}` : ""}`,
    perMillionTokens: (p, c) => `${p} entrada / ${c} saída por 1M tokens`,
    tabOptimize: "Otimizar Prompt",
    tabEvaluate: "Avaliar Resposta",
    evalSubtitle: "Cola o prompt original e a resposta que uma IA deu, e recebe uma avaliação crítica.",
    originalPromptPlaceholder: "Cola o prompt original...",
    responsePlaceholder: "Cola a resposta da IA...",
    evaluateButton: "Avaliar Resposta",
    evaluatingButton: "A avaliar...",
    scoreLabel: "Nota",
    instructionComplianceTitle: "Cumprimento das Instruções",
    clarityTitle: "Clareza",
    completenessTitle: "Completude",
    relevanceTitle: "Relevância",
    hallucinationsTitle: "Alucinações",
    strengthsTitle: "Pontos Fortes",
    evalImprovementsTitle: "Pontos a Melhorar",
    evalSectionTitle: "Também incluído: Avaliador de Respostas de IA",
    cookieBody: "Uso o Google Analytics para perceber quantas pessoas visitam esta app. Aceitas cookies de análise?",
    cookieAccept: "Aceitar",
    cookieReject: "Rejeitar",
  },
  de: {
    signIn: "Mit Google anmelden",
    signOut: "Abmelden",
    admin: "Admin",
    heroTitle: "AI Prompt Optimizer",
    heroSubtitle:
      "Füg einen groben Prompt ein. Erhalte eine klarere, professionelle, sofort einsatzbereite Version zurück — dazu, was sich geändert hat, was gefehlt hat, und Tipps für bessere Prompts in Zukunft.",
    privateNote: "Private App — Zugriff auf autorisierte Konten beschränkt.",
    cardImprovedPromptTitle: "Verbesserter Prompt",
    cardImprovedPromptDesc: "Eine umgeschriebene, professionelle Version deines Prompts, bereit zum Kopieren und Einfügen.",
    cardImprovementsTitle: "Verbesserungen",
    cardImprovementsDesc: "Eine einfache Liste dessen, was sich geändert hat und warum, damit du dabei lernst.",
    cardMissingContextTitle: "Fehlender Kontext",
    cardMissingContextDesc: "Die Mehrdeutigkeiten und Lücken in deinem ursprünglichen Prompt, die es wert waren, angemerkt zu werden.",
    cardTipsTitle: "Tipps",
    cardTipsDesc: "Allgemeine Hinweise für schärfere Prompts, zugeschnitten auf deinen konkreten Fall.",
    modelsCaption: "Wähle zwischen Gemini-, GPT- und Claude-Modellen über OpenRouter — mit Live-Tokenzahl, Antwortzeit und verbleibendem Guthaben.",
    signInPrivateNote: "Diese App ist privat. Melde dich mit dem Google-Konto an, dem Zugriff gewährt wurde.",
    accessDenied: "Dieses Google-Konto ist nicht zur Nutzung dieser App berechtigt.",
    placeholder: "Füg deinen Prompt ein...",
    optimizerSubtitle: "Füg einen groben Prompt ein und erhalte eine klarere, professionelle, sofort einsatzbereite Version.",
    optimizeButton: "Prompt optimieren",
    optimizingButton: "Wird optimiert...",
    copy: "Kopieren",
    copied: "Kopiert",
    nothingToReport: "Nichts anzumerken.",
    thisCall: "dieser Aufruf",
    tokens: (total, p, c) => `${total} Tokens (${p} rein / ${c} raus)`,
    left: (remaining, limit) => `${remaining} übrig${limit ? ` von ${limit}` : ""}`,
    perMillionTokens: (p, c) => `${p} rein / ${c} raus pro 1M Tokens`,
    tabOptimize: "Prompt optimieren",
    tabEvaluate: "Antwort bewerten",
    evalSubtitle: "Füg den ursprünglichen Prompt und die Antwort einer KI darauf ein und erhalte eine kritische Bewertung.",
    originalPromptPlaceholder: "Füg den ursprünglichen Prompt ein...",
    responsePlaceholder: "Füg die Antwort der KI ein...",
    evaluateButton: "Antwort bewerten",
    evaluatingButton: "Wird bewertet...",
    scoreLabel: "Bewertung",
    instructionComplianceTitle: "Befolgung der Anweisungen",
    clarityTitle: "Klarheit",
    completenessTitle: "Vollständigkeit",
    relevanceTitle: "Relevanz",
    hallucinationsTitle: "Halluzinationen",
    strengthsTitle: "Stärken",
    evalImprovementsTitle: "Verbesserungspunkte",
    evalSectionTitle: "Ebenfalls enthalten: AI Response Evaluator",
    cookieBody: "Ich nutze Google Analytics, um zu verstehen, wie viele Personen diese App besuchen. Akzeptierst du Analyse-Cookies?",
    cookieAccept: "Akzeptieren",
    cookieReject: "Ablehnen",
  },
};
