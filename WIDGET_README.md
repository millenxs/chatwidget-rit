# 🎵 Ritmos do Coração - Widget Embedável

Widget de chat flutuante para incorporar em qualquer site.

## 📦 Build do Widget

Para gerar o arquivo `widget.js` embedável:

```bash
npm run build:widget
```

Os arquivos serão gerados em `dist/widget/`:
- `widget.js` - Script principal (inclui React e todos os estilos)
- `widget.css` - Estilos (opcional, já incluído no JS)

---

## 🚀 Como Usar no Seu Site

### Opção 1: Auto-inicialização (Mais simples)

Adicione no `<head>` ou antes do `</body>` do seu HTML:

```html
<script src="https://seu-dominio.vercel.app/widget.js" data-auto-init defer></script>
```

O widget aparecerá automaticamente no canto inferior direito.

---

### Opção 2: Inicialização Manual (Mais controle)

```html
<script src="https://seu-dominio.vercel.app/widget.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o widget
    window.RitmosWidget.init();
  });
</script>
```

---

### Opção 3: Uso no Angular

No arquivo `angular.json`, adicione o script nos assets ou scripts:

```json
{
  "projects": {
    "seu-projeto": {
      "architect": {
        "build": {
          "options": {
            "scripts": [
              {
                "input": "https://seu-dominio.vercel.app/widget.js",
                "inject": true,
                "bundleName": "ritmos-widget"
              }
            ]
          }
        }
      }
    }
  }
}
```

Ou simplesmente adicione no `index.html` do Angular:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <!-- ... outros meta tags ... -->
</head>
<body>
  <app-root></app-root>
  
  <!-- Widget Ritmos do Coração -->
  <script src="https://seu-dominio.vercel.app/widget.js" data-auto-init defer></script>
</body>
</html>
```

---

## 🎨 Configuração Avançada

### Inicialização com Opções

```javascript
window.RitmosWidget.init({
  containerId: 'meu-widget-container', // ID personalizado
  position: 'bottom-right'             // Posição (bottom-right | bottom-left)
});
```

### Destruir o Widget

```javascript
window.RitmosWidget.destroy();
```

---

## 🌐 Deploy no Vercel

1. Faça push do projeto para o GitHub
2. Conecte o repositório no Vercel
3. Configure:
   - **Build Command:** `npm run build:widget`
   - **Output Directory:** `dist/widget`
4. O widget estará disponível em `https://seu-projeto.vercel.app/widget.js`

---

## 📋 Checklist de Integração

- [ ] Script adicionado ao HTML
- [ ] Atributo `defer` presente para não bloquear o carregamento
- [ ] `data-auto-init` se quiser inicialização automática
- [ ] Testar em diferentes navegadores
- [ ] Verificar responsividade mobile

---

## 🔧 Troubleshooting

### Widget não aparece
- Verifique se o script foi carregado (DevTools > Network)
- Confira o console por erros
- Certifique-se que não há bloqueio de CORS

### Conflito de estilos
- O widget usa Shadow DOM para isolamento
- Se ainda houver conflitos, verifique z-index muito alto em outros elementos

### Performance
- O script é minificado (~150KB com React incluso)
- Use `defer` para não bloquear o render da página

---

## 📞 Suporte

Desenvolvido por **Millena Medeiros - Desenvolvedora Fullstack**

Para dúvidas ou customizações, entre em contato.
