# Prompt para Claude Code — Upgrade Visual Completo da LP Acupuntura

Cola isso no Claude Code:

---

A LP de Acupuntura está funcional mas visualmente parece um template genérico. Preciso de um upgrade completo para nível profissional. Segue tudo que precisa mudar:

## 1. TIPOGRAFIA PROFISSIONAL

Troca as fontes por Google Fonts premium. Sugestão:
- **Headlines/títulos:** "Playfair Display" (serif elegante, transmite credibilidade médica) ou "DM Serif Display"
- **Corpo de texto:** "Inter" ou "DM Sans" (sans-serif moderna, ótima legibilidade)
- **Microtextos/labels:** "Inter" weight 500

Hierarquia tipográfica clara:
- H1 (Hero): 48px mobile / 64px desktop, font-weight 700, line-height 1.1
- H2 (títulos de seção): 32px mobile / 42px desktop, font-weight 600
- Body: 16px mobile / 18px desktop, line-height 1.7, cor #333 (não preto puro)
- Microtexto: 14px, cor #666, letter-spacing 0.02em

## 2. ANIMAÇÕES DE SCROLL (Intersection Observer)

Implementa animações de entrada suaves usando Intersection Observer API (JS puro, sem biblioteca externa). Cada seção aparece com uma animação quando o usuário scrolla até ela:

### Padrão de animação por tipo de elemento:
- **Títulos de seção (H2):** fade-in + slide-up (translateY 30px → 0), duration 0.8s, ease-out
- **Parágrafos de texto:** fade-in + slide-up (translateY 20px → 0), duration 0.6s, delay 0.2s após o título
- **Cards (mecanismo de ação):** fade-in + slide-up, staggered (cada card aparece 0.15s depois do anterior)
- **Checklist (sintomas):** cada item aparece um por um, slide-in da esquerda, staggered 0.1s
- **Contadores (números da clínica):** fade-in + counter animation (número sobe de 0 até o valor final em 2s)
- **Stepper (como funciona):** cada passo aparece sequencialmente, slide-in da esquerda
- **FAQ:** fade-in simples
- **CTAs (botões):** subtle scale (0.95 → 1) + fade-in

### Regras técnicas das animações:
- Usar `prefers-reduced-motion: reduce` para respeitar acessibilidade — se o usuário desativou animações no SO, mostra tudo sem animação
- Threshold do Intersection Observer: 0.15 (elemento aparece quando 15% dele está visível)
- Animar apenas UMA VEZ (não re-animar ao scrollar pra cima e voltar)
- Transições CSS com `will-change: transform, opacity` para performance GPU
- Não usar bibliotecas externas (AOS, GSAP etc.) — JS puro com Intersection Observer

## 3. HERO — UPGRADE VISUAL

- **Estrutura pra vídeo de fundo:** prepara o HTML/CSS para um `<video>` em background (autoplay, muted, loop, playsinline), com overlay escuro gradiente (linear-gradient rgba(0,0,0,0.5) → rgba(0,0,0,0.3)) por cima. Por enquanto usa uma imagem placeholder ou mantém o gradiente, mas a estrutura do vídeo tem que estar pronta.
- **Texto do Hero sobre o overlay:** branco, com text-shadow sutil para legibilidade
- **Badge "ACUPUNTURA · CLÍNICA CREABILY":** fundo semi-transparente (backdrop-filter: blur), border-radius arredondado, letra uppercase tracking wide
- **CTA do Hero:** botão grande, arredondado (border-radius 50px), com hover que faz um leve grow (scale 1.03) + sombra que aumenta. Cor do botão: verde WhatsApp (#25D366)
- **Animação de entrada do Hero:** o badge aparece primeiro (fade-in, 0.3s), depois o H1 (fade-in + slide-up, 0.5s), depois o subtítulo (0.7s), depois o botão (0.9s) — cascata sutil

## 4. SEÇÃO IDENTIFICAÇÃO (checklist de sintomas)

- Cada sintoma com ícone SVG à esquerda (pode usar emojis estilizados ou SVG inline simples)
- Background da seção: off-white (#F8F6F3) para contrastar com as seções brancas
- Cards de sintoma com leve sombra (box-shadow) e border-left colorido (4px, cor primária)
- A frase final ("Você não está exagerando...") em destaque: tamanho maior, italic, cor da marca

## 5. SEÇÃO AGITAÇÃO ("Por que só remédio...")

- Layout: texto à esquerda, ilustração/ícone grande à direita (pode ser um SVG abstrato de sistema nervoso ou simplesmente um ícone grande)
- Background: branco
- Texto com max-width de 680px para leitura confortável

## 6. CARDS DO MECANISMO DE AÇÃO

- Layout: grid 2x2 no desktop, empilhados no mobile
- Cada card com:
  - Ícone SVG no topo (dentro de um círculo com background da cor primária em tom claro)
  - Título em bold
  - Descrição em cinza
  - Hover: card sobe 4px (translateY) + sombra aumenta
  - Border-radius: 16px
  - Background: branco com borda sutil (#E5E5E5)

## 7. CONTADORES (provas sociais)

- Números grandes (48px+), bold, cor primária
- Animação de contagem (0 → valor final) quando entra na viewport
- Layout: 4 colunas no desktop, 2x2 no mobile
- Separador sutil entre cada contador
- Labels abaixo de cada número em cinza, uppercase, letter-spacing

## 8. STEPPER ("Como funciona")

- Layout vertical no mobile, horizontal no desktop
- Cada passo conectado por uma linha/barra de progresso
- Número do passo dentro de um círculo com cor da marca
- Passo ativo/visível destaca com cor sólida, os seguintes em tom mais claro
- Animação: cada passo aparece sequencialmente ao scrollar

## 9. FAQ ACCORDION

- Design limpo: sem borda externa, apenas linhas divisórias sutis entre perguntas
- Ícone de "+" que rotaciona pra "×" ao abrir (transição CSS 0.3s)
- Abertura suave com max-height transition
- Texto da resposta com padding confortável e cor #555

## 10. CTA FINAL

- Background: gradiente sutil (ou cor sólida da marca)
- Título em branco, grande
- Dois botões lado a lado no desktop, empilhados no mobile
- Cada botão com ícone de localização (📍) + nome da unidade
- Hover com efeito de glow/sombra colorida
- Abaixo dos botões: endereços completos e horários em texto branco/claro

## 11. FOOTER

- Background escuro (#1A1A1A ou similar)
- Logo em branco/claro
- Layout em colunas: Info | Unidade Paulista | Unidade Granja Viana
- Links do Instagram com ícone
- Texto de copyright no rodapé
- Nota de compliance discreta

## 12. BOTÃO WHATSAPP STICKY

- Circular, 56px, cor #25D366
- Posição: fixed, bottom-right (24px de margem)
- Sombra pronunciada
- Hover: scale 1.1
- Animação de entrada: aparece após 2s de página carregada, com bounce sutil
- Z-index alto (999)

## 13. EFEITOS GERAIS

- Scroll suave: `html { scroll-behavior: smooth; }`
- Seções alternando backgrounds (branco / off-white / branco / off-white) para criar ritmo visual
- Espaçamento generoso entre seções (padding: 80px 0 mobile, 120px 0 desktop)
- Max-width do conteúdo: 1200px, centralizado
- Transições em TODOS os hovers (buttons, cards, links): `transition: all 0.3s ease`

## IMPORTANTE:
- Tudo em CSS e JS puros (sem bibliotecas externas, exceto Google Fonts)
- Mobile-first
- Performance: sem layout shift, sem jank nas animações
- Atualiza o shared/styles/ e o shared/components/ para que as próximas LPs herdem essas melhorias automaticamente
- Me mostra o resultado seção por seção

Começa pelas fontes + sistema de animação de scroll (que são globais no shared/), depois aplica na LP de acupuntura.
