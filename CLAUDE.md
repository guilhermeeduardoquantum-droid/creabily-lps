# CLAUDE.md — Skill v2 | Landing Pages Clínica Creabily

**Versão:** 2.0
**Última atualização:** após LP Acupuntura/Fibromialgia
**Aprendizados incorporados:** tipografia premium, animações scroll, ilustrações significativas, fluxo de vídeo Hero, remoção de placeholders visíveis.

---

## Contexto do Projeto

Conjunto de Landing Pages de alta conversão para a **Clínica Creabily** (creabily.com), clínica de saúde integrada com +15 anos de atuação e +500 mil atendimentos em São Paulo.

**Unidades:**
- **Av. Paulista:** Avenida Paulista 1159, conj. 311/312/313 — São Paulo/SP
  - WhatsApp: 5511933130234 · Instagram: @creabily_avpaulista
- **Granja Viana:** R. do Golf, 47 — Jandira/SP
  - WhatsApp: 5511914429741 · Instagram: @creabily_granjaviana

**Horário:** Seg–Sex 7h às 19h45 · Sábado: Paulista fechada, Granja Viana 8h–12h

**Especialidades:** Acupuntura, Fisioterapia, Nutrição, Pilates, Psicologia, Psicoterapia, Quiropraxia, RPG

**Convênios:** apenas mencionar "Aceitamos convênios" — nunca listar nomes específicos

---

## Stack Técnica (obrigatória)

- HTML + CSS + JS puro (sem frameworks)
- Mobile-first
- Google Fonts: **Playfair Display** (títulos) + **Inter** (corpo) — carregar com `preconnect` para performance
- Intersection Observer para animações de scroll (JS puro, sem AOS/GSAP)
- Lighthouse mobile target: 90+
- Deploy: uma pasta por LP, deploy independente via Vercel

### Estrutura do Monorepo

```
creabily-lps/
├── CLAUDE.md                             ← esta skill
├── shared/
│   ├── styles/
│   │   ├── reset.css                     ← inclui prefers-reduced-motion
│   │   ├── variables.css                 ← cores da marca, tipografia, espaçamentos
│   │   └── components.css                ← botões, cards, checklist, FAQ, stepper, contadores
│   ├── components/
│   │   ├── header.html                   ← canônico com logo + texto
│   │   ├── footer.html                   ← canônico
│   │   ├── whatsapp-sticky.js            ← botão flutuante configurável via data-attributes
│   │   ├── scroll-reveal.js              ← Intersection Observer para animações
│   │   └── faq-accordion.js
│   └── assets/
│       └── logo.png                      ← logo real da Creabily (JÁ existe)
├── acupuntura/                           ← LP pronta (referência)
├── [próxima-especialidade]/              ← replica estrutura de acupuntura/
│   ├── index.html
│   ├── styles.css                        ← só ajustes pontuais específicos desta LP
│   └── assets/
│       ├── hero-video.mp4
│       └── hero-poster.webp              ← primeiro frame do vídeo (fallback)
└── README.md
```

---

## Identidade Visual

- **Cores:** já definidas em `shared/styles/variables.css` — usar sempre as CSS variables, nunca hex hardcoded
- **Logo:** já disponível em `shared/assets/logo.png` — usar no header (40px altura) ao lado do texto "creabily" com gap de 8px, e no footer
- **Tom:** clínico, acolhedor, confiável. NÃO "vendedor" agressivo

### Tipografia (hierarquia)

- **H1 (Hero):** Playfair Display, 48px mobile / 64px desktop, weight 700, line-height 1.1
- **H2 (seções):** Playfair Display, 32px mobile / 42px desktop, weight 600
- **Body:** Inter, 16px mobile / 18px desktop, line-height 1.7, cor #333
- **Microtexto:** Inter, 14px, cor #666, letter-spacing 0.02em, weight 500

---

## Framework de Copy: PAS (Problema → Agitação → Solução)

Público em DOR (literal ou emocional) precisa se sentir VISTO antes de acreditar na solução.

### Estrutura Obrigatória de 9 Seções

*(a antiga seção 7 "Depoimentos" foi movida para opcional/comentada — ver seção "Regras Aprendidas")*

#### 1. HERO
- **Vídeo em loop de fundo** (`<video autoplay muted loop playsinline>`) com overlay `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.35))`
- **Poster (fallback):** imagem WebP do primeiro frame do vídeo
- **Badge:** "[ESPECIALIDADE] · CLÍNICA CREABILY" — fundo semi-transparente com `backdrop-filter: blur`, uppercase, tracking wide
- **Headline (H1):** frase que descreve a DOR do paciente (nunca o serviço)
- **Subheadline:** conecta problema → diagnóstico → solução → Creabily
- **CTA:** botão verde WhatsApp (#25D366), border-radius 50px, hover com scale 1.03 + sombra
- **Microtexto abaixo do CTA:** "Atendimento humanizado · Aceitamos convênios · +15 anos de experiência"
- **Animação de entrada cascata:** badge (0.3s) → H1 (0.5s) → subtítulo (0.7s) → botão (0.9s)

#### 2. IDENTIFICAÇÃO DO PROBLEMA
- **Título:** frase que valida a dor
- **Formato:** checklist visual com ícones SVG, 5-6 sintomas específicos
- **Background:** off-white (#F8F6F3) para contraste
- **Cards com border-left colorido** (4px, cor primária)
- **Frase de fechamento emocional** em destaque (italic, cor da marca)
- **Animação:** cada item aparece staggered (slide-in esquerda, 0.1s entre eles)

#### 3. AGITAÇÃO
- **Título:** algo como "Por que só remédio nem sempre resolve"
- **Layout:** texto à esquerda + **ILUSTRAÇÃO SVG SIGNIFICATIVA** à direita
- **⚠️ IMPORTANTE — ILUSTRAÇÃO:** NUNCA usar SVG decorativo genérico. A ilustração DEVE comunicar visualmente o conceito específico da condição. Exemplos:
  - Fibromialgia → silhueta humana com pontos de dor pulsando em várias regiões
  - Dor de coluna → coluna vertebral com pontos de tensão pulsando nas vértebras
  - Ansiedade → cabeça/cérebro com ondas caóticas que se acalmam ciclicamente
  - Postura → figura humana com linha de alinhamento e desvios destacados
- **Animação sutil na ilustração:** pulse, migração, ciclos — sempre com significado
- **Texto:** 2-3 parágrafos curtos explicando o mecanismo fisiológico em linguagem acessível
- **max-width texto:** 680px

#### 4. MECANISMO DE AÇÃO DA SOLUÇÃO
- **Título:** "Como a [Especialidade] ajuda no alívio da [Condição]"
- **Formato:** grid 2x2 desktop, empilhado mobile
- **Cada card:** ícone SVG dentro de círculo com bg da cor primária clara + título bold + descrição cinza
- **Hover:** card sobe 4px + sombra aumenta
- **Border-radius:** 16px
- **Nota de compliance:** "Resultados podem variar de pessoa para pessoa. [Especialidade] é um tratamento complementar e deve ser conduzido por profissionais qualificados."
- **Animação:** stagger 0.15s entre cards

#### 5. AUTORIDADE — Por que na Creabily
- **Título:** "Cuidado especializado, não um procedimento isolado"
- **Corpo:** destacar o diferencial multidisciplinar (fisio + psicologia + nutrição + etc. no mesmo lugar)
- **Contadores animados** (0 → valor final em 2s quando entra na viewport):
  - +15 anos de experiência
  - +500 mil atendimentos realizados
  - 2 unidades em São Paulo
  - Convênios aceitos
- **Layout:** 4 colunas desktop, 2x2 mobile
- **Números:** 48px+, bold, cor primária
- **Labels:** uppercase, letter-spacing, cor cinza

#### 6. COMO FUNCIONA O TRATAMENTO
- **Título:** "Seu primeiro passo até o alívio"
- **Formato:** stepper horizontal desktop / vertical mobile
- **Passos conectados por linha/barra de progresso**
- **Número em círculo com cor da marca**
- **4 passos:**
  1. Avaliação inicial
  2. Plano personalizado
  3. Sessões de [Especialidade]
  4. Acompanhamento da evolução
- **Animação:** cada passo aparece sequencialmente ao scrollar

#### 7. FAQ (accordion)
- **Design limpo:** sem borda externa, apenas linhas divisórias sutis
- **Ícone "+" que rotaciona pra "×"** ao abrir (transição 0.3s)
- **Abertura suave com max-height transition**
- **Mínimo 4 perguntas** cobrindo: dor/desconforto do procedimento, quantidade de sessões, cobertura de convênio, tempo até sentir resultado
- **Respostas curtas e honestas**

#### 8. CTA FINAL
- **Background:** gradiente sutil ou cor sólida da marca
- **Título emocional:** ex: "Você não precisa continuar convivendo com essa dor"
- **Subtítulo:** convite claro
- **Dois botões (lado a lado desktop, empilhados mobile):**
  - 📍 Unidade Av. Paulista → wa.me/5511933130234 + texto pré-preenchido
  - 📍 Unidade Granja Viana → wa.me/5511914429741 + texto pré-preenchido
- **Endereços completos + horários abaixo dos botões**

#### 9. FOOTER
- **Background escuro** (#1A1A1A)
- **Logo em branco/claro** + texto "creabily"
- **3 colunas:** Info | Unidade Paulista | Unidade Granja Viana
- **Links Instagram com ícone**
- **Copyright + nota de compliance discreta no rodapé**

---

## Regras Aprendidas (v2)

### ⚠️ REGRA 1: Nunca deixar placeholders visíveis em produção
- **NÃO criar seção de depoimentos com "[PLACEHOLDER]" visível.** Se não houver depoimentos reais, deixar a seção **comentada no HTML** para descomentar depois. Nada de "Marina S. [PLACEHOLDER]".

### ⚠️ REGRA 2: Ilustrações SEMPRE com significado
- SVGs devem comunicar visualmente o conceito da seção. Se o Claude Code criar um SVG abstrato genérico (alvo, círculos, formas sem contexto), refazer com instrução específica.

### ⚠️ REGRA 3: Vídeo do Hero via fluxo image-to-video
- Nunca gerar vídeo direto do zero — sempre gerar imagem estática primeiro, depois usar como input em ferramentas image-to-video (Veo3, Runway, Kling)
- Exigir explicitamente no prompt: câmera 100% estática + frame final igual ao inicial + movimentos ultra-sutis (cortina, luz, respiração)
- Duração 6-8s, exportar em WebM/MP4 < 3MB
- Sempre gerar poster (imagem do primeiro frame) como fallback

### ⚠️ REGRA 4: Tipografia premium desde o início
- Google Fonts obrigatório: Playfair Display + Inter. Nunca aceitar fontes sistema padrão.

### ⚠️ REGRA 5: Animações de scroll são padrão, não opcional
- Toda LP nasce com Intersection Observer implementado. Respeitar `prefers-reduced-motion`.

### ⚠️ REGRA 6: Reutilizar TUDO de /shared/
- Nunca duplicar componentes. Se precisar de algo novo, adicionar em `/shared/` primeiro, depois consumir na LP específica.

---

## Compliance de Saúde (OBRIGATÓRIO)

Regulamentação CFM/CRM/Anvisa:

1. **NUNCA prometer cura.** Sempre: "alívio", "redução de sintomas", "tratamento complementar", "melhora da qualidade de vida"
2. **NUNCA usar "antes e depois"** de pacientes
3. **NUNCA garantir resultados.** Sempre incluir: "Resultados podem variar de pessoa para pessoa"
4. **Termos proibidos:** "cura garantida", "resultado comprovado", "o melhor tratamento", "100% eficaz"
5. **Termos seguros:** "alívio", "tratamento complementar", "qualidade de vida", "bem-estar", "melhora", "cuidado integrado"

---

## SEO Técnico

- **Meta title:** "[Especialidade] para [Condição] em São Paulo | Clínica Creabily"
- **Meta description:** foco em "alívio", "tratamento complementar", cidade/bairro
- **Schema markup:** LocalBusiness + MedicalClinic (para AS 2 unidades)
- **H1 único** (headline do hero)
- **Alt text** em TODAS as imagens
- **Open Graph tags** (og:title, og:description, og:image, og:url) — para compartilhamento em WhatsApp/redes

---

## UX de Conversão

- **ZERO menu de navegação**
- **Logo no topo** (sem link ou linkando pra creabily.com)
- **Botão WhatsApp sticky mobile** — fixed bottom-right, 56px, bg #25D366, entrada com bounce após 2s de página carregada, z-index 999
- **Máximo 2 links de saída:** WhatsApp + Instagram (no footer)
- **Scroll suave:** `html { scroll-behavior: smooth; }`
- **Backgrounds alternados:** branco / off-white / branco / off-white para ritmo visual
- **Espaçamento generoso:** padding 80px mobile / 120px desktop entre seções
- **Max-width:** 1200px, centralizado
- **Transições em TODOS os hovers:** `transition: all 0.3s ease`

---

## Fluxo de Criação de Nova LP (checklist operacional)

### Pré-Claude Code (você prepara):
- [ ] Definir **especialidade** e **condição-âncora**
- [ ] Gerar **imagem estática do Hero** (Midjourney/DALL-E, 16:9)
- [ ] Gerar **vídeo em loop** a partir da imagem (Veo3 image-to-video)
- [ ] Salvar vídeo em `~/Downloads/hero-[nome].mp4`

### No Claude Code — comando único:

> Cria a LP de **[ESPECIALIDADE]** com foco em **[CONDIÇÃO-ÂNCORA]** seguindo integralmente o CLAUDE.md. Cria em `~/creabily-lps/[nome-pasta]/`. Reutiliza todos os componentes de `/shared/`. Copia `~/Downloads/hero-[nome].mp4` para `[nome-pasta]/assets/hero-video.mp4` e integra no Hero com overlay escuro. Para a seção de Agitação, gera um SVG ilustrativo animado que comunique visualmente **[DESCREVER O CONCEITO — ex: "coluna vertebral com pontos de tensão pulsando nas vértebras cervicais e lombares"]**. Copy segue as regras de compliance da Skill e framework PAS. **NÃO cria seção de depoimentos** — deixa apenas um comentário HTML no local para descomentar depois. Mostra o resultado seção por seção.

### Pós-Claude Code (você valida):
- [ ] `cd ~/creabily-lps && npx serve . -p 3000`
- [ ] Abrir `localhost:3000/[nome-pasta]/` no desktop
- [ ] Testar no mobile (via IP local ou DevTools)
- [ ] Ajustar copy/visual se necessário
- [ ] Deploy Vercel + configurar subdomínio DNS

---

## Sequência Estratégica das Próximas LPs

Ordem por prioridade de conversão/volume de busca:

1. **Quiropraxia** — âncora: dor de coluna crônica
2. **Psicologia + Psicoterapia** — âncora: ansiedade e burnout
3. **RPG** — âncora: má postura e dores posturais
4. **Nutrição** — âncora: saúde intestinal ou emagrecimento sustentável
5. **Pilates** — âncora: reabilitação pós-lesão ou fortalecimento lombar

---

## Evolução da Skill

Esta skill deve ser atualizada a cada 2-3 LPs. Após cada LP nova, revisar:
- O que funcionou de primeira?
- O que precisou ser corrigido?
- Que padrão novo emergiu?

Codificar os aprendizados aqui para que a próxima LP nasça ainda melhor.
