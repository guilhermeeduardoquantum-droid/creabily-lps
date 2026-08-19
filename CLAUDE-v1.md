# Skill: Landing Page de Conversão — Clínica Creabily

## Contexto do Projeto

Estou criando um conjunto de Landing Pages (LPs) de alta conversão para a **Clínica Creabily** (creabily.com), uma clínica de saúde integrada com +15 anos de atuação e +500 mil atendimentos em São Paulo.

**Unidades:**
- **Av. Paulista:** Avenida Paulista 1159, conj. 311, 312, 313 — São Paulo/SP
  - WhatsApp: 5511933130234
  - Instagram: @creabily_avpaulista
- **Granja Viana:** R. do Golf, 47 - Granja Viana, Jandira/SP
  - WhatsApp: 5511914429741
  - Instagram: @creabily_granjaviana

**Horário de atendimento:**
- Segunda a Sexta: 7h às 19h45
- Sábado: Unidade I (Paulista) fechada / Unidade II (Granja Viana) 8h às 12h

**Especialidades da clínica:** Acupuntura, Fisioterapia, Nutrição, Pilates, Psicologia, Psicoterapia, Quiropraxia, RPG (Reeducação Postural Global)

**Convênios:** A clínica aceita convênios (planos de saúde). Não listar nomes de convênios — usar apenas "Aceitamos convênios".

---

## Stack Técnica

- **HTML + CSS + JS puro** (sem frameworks como React/Next.js)
- **Mobile-first obrigatório** (maioria do tráfego vem de WhatsApp/Instagram Ads no celular)
- **Performance:** Lighthouse mobile 90+
- **Deploy:** cada LP será deployada independentemente via Vercel (uma pasta por LP no monorepo)

### Estrutura do Repositório (monorepo)

```
creabily-lps/
├── shared/
│   ├── styles/
│   │   └── variables.css      → cores, fontes, espaçamentos
│   │   └── components.css     → estilos reutilizáveis (botões, cards, FAQ accordion, etc)
│   │   └── reset.css          → CSS reset/normalize
│   ├── components/
│   │   └── whatsapp-sticky.js → botão WhatsApp flutuante (mobile)
│   │   └── header.html        → header simples (só logo, sem menu de navegação)
│   │   └── footer.html        → footer padrão (logo, endereços, horários, redes sociais)
│   └── assets/
│       └── logo.png           → logo da Creabily
├── acupuntura/
│   └── index.html
│   └── styles.css             → estilos específicos da LP (se necessário)
│   └── assets/                → imagens/vídeos específicos da LP
├── nutricao/
├── pilates/
├── psicologia-psicoterapia/
├── quiropraxia/
├── rpg/
└── README.md
```

### Identidade Visual

- **Cores:** extrair do site creabily.com. Predominância de tons sóbrios, clínicos e acolhedores. Usar variáveis CSS no `/shared/styles/variables.css`.
- **Tipografia:** fontes limpas, sem serifa, profissionais. Boa legibilidade em mobile.
- **Tom visual geral:** clínico, acolhedor, confiável — NÃO "vendedor" demais. Saúde, não marketing agressivo.

---

## Framework de Copy: PAS (Problema → Agitação → Solução)

Toda LP segue este framework porque o público-alvo está em DOR (literal e emocional). A pessoa precisa se sentir VISTA antes de acreditar na solução.

### Estrutura obrigatória de seções (nesta ordem):

#### 1. HERO
- **Elemento visual:** vídeo em loop (mudo, autoplay) ou imagem de fundo com overlay escuro para legibilidade
- **Headline (H1):** frase que descreve a DOR/PROBLEMA do paciente (não o serviço). Ex: "Vive com dor no corpo todo?" — NÃO "Venha fazer acupuntura"
- **Subheadline:** conecta o problema ao diagnóstico + apresenta a solução (especialidade) + menciona a Creabily
- **CTA primário:** botão de WhatsApp com texto "Quero agendar minha avaliação →"
  - Link: `https://api.whatsapp.com/send/?phone=5511914429741&text=[MENSAGEM PERSONALIZADA]`
  - Mensagem pré-preenchida deve mencionar a especialidade específica
- **Microtexto abaixo do CTA:** "Atendimento humanizado · Aceitamos convênios · +15 anos de experiência"

#### 2. IDENTIFICAÇÃO DO PROBLEMA
- **Título:** frase que valida a dor do leitor (ex: "Se você se reconhece nesses sinais, não é frescura")
- **Formato:** checklist visual com ícones — listar 5-6 sintomas específicos da condição abordada
- **Frase de fechamento emocional:** validação ("Você não está exagerando. E não precisa continuar assim.")

#### 3. AGITAÇÃO — Por que o caminho convencional não basta
- **Título:** algo como "Por que só remédio nem sempre resolve"
- **Corpo:** 2-3 parágrafos curtos explicando (em linguagem acessível, não técnica) o mecanismo fisiológico do problema e por que tratamentos apenas sintomáticos não resolvem a raiz
- **Objetivo:** criar a mudança de mentalidade — "preciso de algo mais completo"

#### 4. MECANISMO DE AÇÃO DA SOLUÇÃO (a especialidade)
- **Título:** "Como a [Especialidade] ajuda no alívio da [Condição]"
- **Formato:** 3-4 cards com ícone + benefício + explicação curta (1-2 frases)
- **Nota de compliance no rodapé do bloco:** "Resultados podem variar de pessoa para pessoa. [Especialidade] é um tratamento complementar e deve ser conduzido por profissionais qualificados."

#### 5. AUTORIDADE — Por que na Creabily
- **Título:** algo como "Cuidado especializado, não um procedimento isolado"
- **Corpo:** destacar o diferencial multidisciplinar — o paciente pode ter acompanhamento integrado (fisio + psicologia + nutrição etc.) tudo no mesmo lugar
- **Provas sociais (formato de contadores visuais):**
  - +15 anos de experiência
  - +500 mil atendimentos realizados
  - 2 unidades em São Paulo
  - Convênios aceitos

#### 6. COMO FUNCIONA O TRATAMENTO (reduz ansiedade pré-agendamento)
- **Título:** "Seu primeiro passo até o alívio"
- **Formato:** stepper horizontal ou vertical com 4 passos:
  1. Avaliação inicial
  2. Plano personalizado
  3. Sessões de [Especialidade]
  4. Acompanhamento da evolução

#### 7. DEPOIMENTOS (prova social)
- **Placeholder:** criar espaço para 2-3 depoimentos com foto/iniciais, nome, e frase curta
- **Usar dados fictícios marcados como [PLACEHOLDER]** até que a clínica forneça depoimentos reais
- **Nunca inventar depoimentos como se fossem reais**

#### 8. FAQ (quebra de objeções)
- **Formato:** accordion (pergunta clicável, resposta expandível)
- **Mínimo 4 perguntas** cobrindo: dor/desconforto do procedimento, quantidade de sessões, cobertura de convênio, tempo até sentir resultado
- **Respostas honestas e curtas** — sem enrolação

#### 9. CTA FINAL
- **Título emocional:** frase que reforça a transformação (ex: "Você não precisa continuar convivendo com essa dor")
- **Subtítulo:** convite claro para ação
- **Dois botões de WhatsApp (um por unidade):**
  - Unidade Av. Paulista → wa.me/5511933130234 + texto pré-preenchido
  - Unidade Granja Viana → wa.me/5511914429741 + texto pré-preenchido
- **Endereços completos e horário de atendimento abaixo dos botões**

#### 10. FOOTER
- Logo Creabily
- Endereços das 2 unidades
- Horário de atendimento
- Links Instagram de cada unidade

---

## Regras de Compliance (OBRIGATÓRIO)

A publicidade de serviços de saúde no Brasil é regulamentada pelo CFM, CRM e Anvisa. Toda LP DEVE seguir:

1. **NUNCA prometer cura.** Usar sempre: "alívio", "redução de sintomas", "tratamento complementar", "melhora da qualidade de vida"
2. **NUNCA usar "antes e depois"** de pacientes
3. **NUNCA garantir resultados.** Incluir sempre: "Resultados podem variar de pessoa para pessoa"
4. **NUNCA usar termos como:** "cura garantida", "resultado comprovado", "o melhor tratamento", "100% eficaz"
5. **Termos seguros:** "alívio", "tratamento complementar", "qualidade de vida", "bem-estar", "melhora", "cuidado integrado"

---

## Elementos Técnicos Obrigatórios

### SEO
- **Meta title:** "[Especialidade] para [Condição] em São Paulo | Clínica Creabily"
- **Meta description:** foco em "alívio", "tratamento complementar", cidade/bairro
- **Schema markup:** LocalBusiness + MedicalClinic
- **H1 único** (a headline do hero)
- **Alt text** em todas as imagens

### Performance
- Imagens comprimidas (WebP preferencialmente)
- Vídeo do hero em formato leve (WebM) ou substituir por imagem com parallax se pesar demais
- Lazy loading em imagens abaixo da dobra
- CSS e JS minificados em produção

### UX de Conversão
- **ZERO menu de navegação** — é página de conversão, não site institucional
- **Logo no topo sem link** (ou linkando para creabily.com, nunca para outra LP)
- **Botão WhatsApp sticky no mobile** — sempre visível ao rolar, posição inferior direita
- **Máximo 2 links de saída:** WhatsApp + Instagram (no footer)
- **Scroll suave** entre seções

---

## Como usar esta Skill

Quando eu pedir uma nova LP, vou fornecer:
1. **Especialidade** (ex: Acupuntura, Nutrição, Quiropraxia...)
2. **Condição/dor foco** (ex: Fibromialgia, Dor de coluna, Ansiedade...)
3. **Brief de copy** com o conteúdo específico de cada seção

Você deve:
1. Seguir EXATAMENTE a estrutura de seções definida acima
2. Usar o brief de copy que eu fornecer (não inventar copy diferente)
3. Reutilizar os componentes de `/shared/`
4. Criar os arquivos na pasta correta do monorepo (ex: `/acupuntura/index.html`)
5. Garantir compliance com as regras de saúde
6. Testar responsividade mobile
7. Me mostrar o progresso seção por seção

Se eu não fornecer brief de copy e pedir pra você criar, siga o framework PAS e as regras de compliance para gerar a copy, sempre priorizando a DOR do paciente como gancho principal.
