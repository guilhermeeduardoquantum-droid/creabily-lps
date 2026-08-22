# CLAUDE.md — Skill v3 | Landing Pages Clínica Creabily

**Versão:** 3.0
**Última atualização:** após LP Acupuntura/Fibromialgia (v1 → v2 → v3)
**Novidades da v3:**
- Estrutura para LPs **multidisciplinares** (2+ especialidades combinadas)
- **Background termográfico animado** (dither WebGL) para LPs com componente de imagem térmica
- Nova seção **"Diferencial Técnico"** (para exames/equipamentos exclusivos)
- Blocos de mecanismo divididos por especialidade

---

## Contexto do Projeto

Conjunto de Landing Pages de alta conversão para a **Clínica Creabily** (creabily.com), clínica de saúde integrada com +15 anos de atuação e +500 mil atendimentos em São Paulo.

**Unidades:**
- **Av. Paulista:** Avenida Paulista 1159, conj. 311/312/313 — São Paulo/SP
  - WhatsApp: 5511933130234 · Instagram: @creabily_avpaulista
- **Granja Viana:** R. do Golf, 47 — Jandira/SP
  - WhatsApp: 5511914429741 · Instagram: @creabily_granjaviana

**Horário:** Seg–Sex 7h às 19h45 · Sábado: Paulista fechada, Granja Viana 8h–12h

**Especialidades:** Acupuntura, Fisioterapia (incluindo Fisioterapia Orofacial), Nutrição, Pilates, Psicologia, Psicoterapia, Quiropraxia, RPG

**Diferencial exclusivo:** Termografia (imagem térmica para diagnóstico funcional)

**Convênios:** apenas mencionar "Aceitamos convênios" — nunca listar nomes específicos

---

## Estratégia de LPs

A partir da v3, priorizamos **LPs por dor/condição multidisciplinar** em vez de LPs por especialidade única. Cada LP apresenta 2-3 especialidades combinadas como solução integrada, aproveitando o diferencial competitivo da clínica.

### Mapa de LPs
1. ✅ Acupuntura → Fibromialgia (monoespecialidade — feita antes da v3)
2. 🔨 **Bruxismo/DTM** → Fisioterapia Orofacial + Psicoterapia (usa termografia)
3. Ansiedade/Burnout → Psicoterapia + Acupuntura
4. Dor Lombar Crônica → Quiropraxia + RPG + Pilates
5. Postura Home Office → RPG + Pilates + Quiropraxia
6. Enxaqueca Crônica → Fisioterapia + Acupuntura + Psicoterapia
7. Emagrecimento Sustentável → Nutrição + Pilates + Psicoterapia

---

## Stack Técnica

- HTML + CSS + JS puro (sem frameworks)
- Mobile-first
- Google Fonts: **Playfair Display** (títulos) + **Inter** (corpo) — carregar com `preconnect`
- Intersection Observer para animações de scroll (JS puro)
- **WebGL puro** para o efeito de background termográfico (quando aplicável)
- Lighthouse mobile target: 90+
- Deploy: uma pasta por LP, deploy independente via Vercel, cada LP auto-contida (com `shared/` copiada dentro)

### Estrutura do Monorepo

```
creabily-lps/
├── CLAUDE.md                             ← esta skill (v3)
├── CLAUDE-v1.md, CLAUDE-v2.md           ← backups
├── shared/
│   ├── styles/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   └── components.css
│   ├── components/
│   │   ├── header.html
│   │   ├── footer.html
│   │   ├── whatsapp-sticky.js
│   │   ├── scroll-reveal.js
│   │   ├── faq-accordion.js
│   │   └── dither-background.js          ← NOVO na v3 (WebGL puro)
│   └── assets/
│       └── logo.png
├── acupuntura/                           ← LP mono (v1/v2)
├── bruxismo/                             ← LP multi (v3) [próxima]
│   ├── index.html
│   ├── styles.css
│   ├── shared/                           ← cópia auto-contida
│   └── assets/
│       ├── hero-video.mp4
│       └── hero-poster.webp
└── README.md
```

---

## Identidade Visual

- **Cores:** definidas em `shared/styles/variables.css` — sempre usar CSS variables
- **Logo:** `shared/assets/logo.png` — no header (40px altura) + no footer
- **Tom:** clínico, acolhedor, confiável. NÃO "vendedor" agressivo

### Tipografia
- **H1 (Hero):** Playfair Display, 48px mobile / 64px desktop, weight 700, line-height 1.1
- **H2 (seções):** Playfair Display, 32px mobile / 42px desktop, weight 600
- **Body:** Inter, 16px mobile / 18px desktop, line-height 1.7, cor #333
- **Microtexto:** Inter, 14px, cor #666, letter-spacing 0.02em, weight 500

### Paleta Termográfica (para LPs com dither)
Quando a LP usar o background termográfico, aplicar esta escala real de termografia médica:
- **Cor 1 (fria):** `#1a3a52` (azul escuro profundo)
- **Cor 2 (média):** `#f4a742` (âmbar/laranja)
- **Cor 3 (quente):** `#d63838` (vermelho de inflamação)
- **Background:** `#0a1520` (fundo escuro para contraste)

---

## Framework de Copy: PAS + Multidisciplinar

O PAS (Problema → Agitação → Solução) segue como espinha dorsal. Nas LPs multidisciplinares, adaptamos a Solução para mostrar como **cada especialidade ataca uma parte diferente do problema**, e como a combinação delas é o que torna o tratamento realmente eficaz.

### Estrutura Obrigatória (10 seções para LPs multidisciplinares)

*Comparação com v2: seções 1-3 e 7-11 iguais. Seção 4 (Mecanismo) foi dividida em blocos por especialidade. Nova seção 5 (Diferencial Técnico) adicionada quando aplicável.*

#### 1. HERO
- Vídeo em loop de fundo com overlay `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.35))`
- Poster (fallback): imagem WebP do primeiro frame
- Badge: "[CONDIÇÃO] · CLÍNICA CREABILY" — fundo semi-transparente com `backdrop-filter: blur`
- **Headline (H1):** descreve a DOR (nunca o serviço)
- Subheadline: conecta problema → solução multidisciplinar → Creabily
- CTA: botão verde WhatsApp (#25D366)
- Microtexto: "Atendimento humanizado · Aceitamos convênios · +15 anos de experiência"
- Animação cascata de entrada

#### 2. IDENTIFICAÇÃO DO PROBLEMA
- Título valida a dor
- Checklist visual com 5-6 sintomas
- Background off-white
- Frase de fechamento emocional em destaque

#### 3. AGITAÇÃO — "Por que o que você já tentou não resolveu"
- Título que quebra objeção do concorrente/tratamento comum (ex: "Por que a plaquinha não basta", "Por que só remédio não resolve")
- Corpo: 2-3 parágrafos explicando o mecanismo fisiológico + emocional do problema
- **NA V3:** quando aplicável, usar o **background dither/termografia animado** aqui como estrela visual — combinado com ilustração SVG do órgão/região afetada
- **max-width texto:** 680px

#### 4. MECANISMO MULTIDISCIPLINAR — "Por que uma só abordagem não basta"
- Título: "Como [Especialidade 1] + [Especialidade 2] tratam a raiz"
- **Layout:** 2-3 blocos lado a lado (empilhados no mobile), um por especialidade
- **Cada bloco tem:**
  - Ícone/SVG específico da especialidade
  - Nome da especialidade em destaque
  - Subtítulo: "Ataca [qual parte do problema]"
  - Descrição: 2-3 frases explicando como aquela especialidade atua
  - Bullet list de 2-3 benefícios concretos
- **Fecha o bloco com uma imagem/diagrama de integração:** um infográfico simples mostrando como as especialidades se somam
- Nota de compliance: "Resultados podem variar. Tratamentos complementares conduzidos por profissionais qualificados."

#### 5. DIFERENCIAL TÉCNICO (opcional — só quando existe algo exclusivo)
Quando a LP envolve termografia, equipamento diferenciado ou exame que a maioria dos concorrentes não oferece, dedicar uma seção só pra isso.

- Título: "[Nome do exame/técnica]: veja o que ninguém mais vê"
- Descrição: o que é, como funciona, o que revela
- **Visual:** background dither/termografia animado + imagem/SVG ilustrativo
- Bullets: 3 benefícios concretos do exame ("mapeia áreas de inflamação em tempo real", "não invasivo, sem radiação", "guia o tratamento personalizado")
- Frase de autoridade: "Poucas clínicas em São Paulo oferecem esse recurso"

#### 6. AUTORIDADE — Por que na Creabily
- Título: "Cuidado integrado, não fragmentado"
- Corpo: destacar o diferencial multidisciplinar único
- Contadores animados:
  - +15 anos de experiência
  - +500 mil atendimentos
  - 2 unidades em São Paulo
  - Convênios aceitos

#### 7. COMO FUNCIONA — Jornada do Paciente
- Título: "Seu primeiro passo até o alívio"
- **NA V3:** stepper de 5 passos (não mais 4)
  1. Avaliação integrada inicial
  2. Diagnóstico funcional (com termografia quando aplicável)
  3. Plano personalizado com [Especialidade 1] + [Especialidade 2]
  4. Sessões coordenadas entre profissionais
  5. Reavaliação e ajustes contínuos

#### 8. FAQ (accordion)
- Design limpo, ícone "+" que rotaciona
- Mínimo 5 perguntas (nas multi, uma delas cobre "como funcionam duas especialidades juntas?")
- Cobrir: mecânica do tratamento, quantidade de sessões, convênio, tempo até resultado, coordenação entre especialidades

#### 9. CTA FINAL
- Background gradiente ou cor sólida
- Título emocional
- Dois botões (unidade Paulista + unidade Granja Viana) com texto pré-preenchido no WhatsApp
- Endereços + horários abaixo

#### 10. FOOTER
- Background #1A1A1A
- Logo em branco + texto "creabily"
- 3 colunas: Info | Paulista | Granja Viana
- Links Instagram
- Copyright + nota de compliance discreta

---

## Regras Aprendidas (mantidas da v2)

### REGRA 1: Nunca deixar placeholders visíveis em produção
Sem depoimentos placeholder. Seção comentada no HTML até ter material real.

### REGRA 2: Ilustrações SEMPRE com significado
SVGs devem comunicar visualmente o conceito da seção. Nada de círculos abstratos genéricos.

### REGRA 3: Vídeo do Hero via fluxo image-to-video
Nunca gerar vídeo direto. Sempre imagem estática primeiro → image-to-video (Veo3). Exigir câmera 100% estática + frame final = frame inicial.

### REGRA 4: Tipografia premium desde o início
Google Fonts obrigatório: Playfair Display + Inter.

### REGRA 5: Animações de scroll são padrão
Intersection Observer implementado em toda LP. Respeitar `prefers-reduced-motion`.

### REGRA 6: LP auto-contida no monorepo
Cada LP tem sua própria cópia de `shared/` (`bruxismo/shared/`, `acupuntura/shared/`, etc). Root Directory na Vercel aponta pra pasta da LP. Caminhos SEMPRE relativos (`shared/...`, `assets/...`), NUNCA absolutos com `/` inicial.

### 🆕 REGRA 7 (v3): Background termográfico só onde faz sentido
- Só usar o efeito dither/termografia em LPs que envolvem termografia ou têm forte apelo visual térmico (bruxismo, dor localizada, inflamação)
- Aplicar em MÁXIMO 2-3 seções por LP (Agitação + Diferencial Técnico + eventualmente CTA final)
- Nunca aplicar no Hero (o Hero já tem vídeo — sobrecarrega)
- Cores obrigatórias: escala termográfica definida acima
- Performance: o componente `dither-background.js` já vem otimizado, roda em WebGL na GPU

### 🆕 REGRA 8 (v3): LPs multidisciplinares apresentam integração, não competição
Nunca escrever de forma que uma especialidade pareça "melhor" que a outra. A copy sempre reforça: "cada uma resolve uma parte diferente, e juntas atacam a raiz".

---

## Compliance de Saúde (OBRIGATÓRIO)

1. **NUNCA prometer cura.** Sempre: "alívio", "redução de sintomas", "tratamento complementar", "qualidade de vida"
2. **NUNCA usar "antes e depois"** de pacientes
3. **NUNCA garantir resultados.** Sempre: "Resultados podem variar de pessoa para pessoa"
4. **Termos proibidos:** "cura garantida", "resultado comprovado", "o melhor tratamento", "100% eficaz"
5. **Termos seguros:** "alívio", "tratamento complementar", "qualidade de vida", "bem-estar", "melhora", "cuidado integrado"
6. **🆕 Termografia:** apresentar como "exame de imagem funcional" ou "mapeamento térmico" — NUNCA como diagnóstico definitivo. Usar sempre "auxilia no diagnóstico", "complementa a avaliação clínica".

---

## SEO Técnico

- **Meta title:** "[Condição] em São Paulo | Tratamento Integrado | Clínica Creabily"
- **Meta description:** foco em "alívio", "tratamento multidisciplinar", cidade/bairro
- **Schema markup:** LocalBusiness + MedicalClinic (para AS 2 unidades)
- **H1 único** (headline do hero)
- **Alt text** em TODAS as imagens
- **Open Graph tags** completas

---

## UX de Conversão

- ZERO menu de navegação
- Logo no topo (sem link ou linkando pra creabily.com)
- **WhatsApp sticky mobile** — bottom-right, 56px, bg #25D366, entrada com bounce após 2s
- Máximo 2 links de saída: WhatsApp + Instagram (footer)
- Scroll suave: `html { scroll-behavior: smooth; }`
- Backgrounds alternados branco / off-white / termográfico (quando aplicável)
- Espaçamento generoso: padding 80px mobile / 120px desktop
- Max-width: 1200px, centralizado
- Transições em todos os hovers: `transition: all 0.3s ease`

---

## Fluxo de Criação de Nova LP Multidisciplinar

### Pré-Claude Code (você prepara):
- [ ] Definir **condição-âncora** e as **especialidades envolvidas**
- [ ] Ter o **brief de copy validado** (todas as seções escritas)
- [ ] Gerar **imagem estática do Hero** (Midjourney/DALL-E, 16:9)
- [ ] Gerar **vídeo em loop** no Veo3 (image-to-video)
- [ ] Salvar vídeo em `~/Downloads/hero-[nome].mp4`
- [ ] Ter o **brief salvo em Markdown** e copiado pros Downloads

### Comando único no Claude Code:

> Cria a LP multidisciplinar **[NOME]** com foco em **[CONDIÇÃO]** seguindo o CLAUDE.md v3. Cria em `~/creabily-lps/[nome-pasta]/`. Especialidades envolvidas: **[ESP 1]** + **[ESP 2]**. Copia `~/Downloads/hero-[nome].mp4` para `[nome-pasta]/assets/hero-video.mp4`. Copia toda a pasta `shared/` para `[nome-pasta]/shared/` (auto-contida). Ajusta caminhos para relativos. Segue o brief de copy em `~/Downloads/brief-[nome].md` (lê e usa exatamente esse texto, sem inventar). Aplica o background dither/termografia (via `shared/components/dither-background.js`) nas seções Agitação e Diferencial Técnico. Gera SVG animado ilustrativo específico para o conteúdo (não decorativo). Segue todas as regras de compliance. Ao terminar, faz commit e push.

### Pós-Claude Code:
- [ ] `cd ~/creabily-lps && npx serve . -p 3000`
- [ ] Testa em `localhost:3000/[nome-pasta]/`
- [ ] Ajusta se necessário
- [ ] Vercel: novo projeto → Root Directory = `[nome-pasta]` → Deploy
- [ ] Adiciona domínio `[nome].creabily.com` na Vercel
- [ ] Cria CNAME na Wix apontando pra Vercel

---

## Evolução da Skill

A cada 2-3 LPs, revisar e evoluir:
- O que funcionou de primeira?
- O que precisou ser corrigido?
- Que padrão novo emergiu?

Codificar tudo aqui pra próxima LP nascer melhor.
