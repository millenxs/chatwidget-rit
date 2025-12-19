import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "./components/ChatWidget";
import "./index.css";

// Widget configuration interface
interface WidgetConfig {
  containerId?: string;
  position?: "bottom-right" | "bottom-left";
}

// Global configuration
declare global {
  interface Window {
    RitmosWidget?: {
      init: (config?: WidgetConfig) => void;
      destroy: () => void;
    };
  }
}

let widgetRoot: ReactDOM.Root | null = null;
let widgetContainer: HTMLDivElement | null = null;

function createWidgetContainer(config: WidgetConfig = {}): HTMLDivElement {
  const container = document.createElement("div");
  container.id = config.containerId || "ritmos-chat-widget-root";
  container.style.cssText = `
    position: fixed;
    z-index: 999999;
    pointer-events: none;
    inset: 0;
  `;
  
  // Create shadow root for style isolation
  const shadowRoot = container.attachShadow({ mode: "open" });
  
  // Create inner container for React
  const innerContainer = document.createElement("div");
  innerContainer.id = "ritmos-widget-inner";
  innerContainer.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
  `;
  
  // Clone all stylesheets into shadow DOM
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    * {
      pointer-events: auto;
    }
    
    /* Reset box-sizing */
    *, *::before, *::after {
      box-sizing: border-box;
    }
  `;
  
  shadowRoot.appendChild(styleElement);
  shadowRoot.appendChild(innerContainer);
  
  document.body.appendChild(container);
  
  return innerContainer as unknown as HTMLDivElement;
}

function init(config: WidgetConfig = {}) {
  // Prevent multiple initializations
  if (widgetRoot) {
    console.warn("Ritmos Widget already initialized");
    return;
  }

  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init(config));
    return;
  }

  try {
    widgetContainer = createWidgetContainer(config);
    
    // For shadow DOM, we need to get the actual container
    const parentElement = widgetContainer.parentNode as ShadowRoot;
    const actualContainer = parentElement?.host?.shadowRoot?.getElementById("ritmos-widget-inner");
    
    if (!actualContainer) {
      // Fallback: mount directly without shadow DOM
      const fallbackContainer = document.createElement("div");
      fallbackContainer.id = config.containerId || "ritmos-chat-widget-root";
      document.body.appendChild(fallbackContainer);
      widgetContainer = fallbackContainer;
    }
    
    widgetRoot = ReactDOM.createRoot(widgetContainer);
    widgetRoot.render(
      <React.StrictMode>
        <ChatWidget />
      </React.StrictMode>
    );
    
    console.log("✅ Ritmos Widget initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Ritmos Widget:", error);
  }
}

function destroy() {
  if (widgetRoot) {
    widgetRoot.unmount();
    widgetRoot = null;
  }
  
  if (widgetContainer) {
    const parentElement = widgetContainer.parentNode;
    if (parentElement instanceof ShadowRoot) {
      parentElement.host.remove();
    } else {
      widgetContainer.remove();
    }
    widgetContainer = null;
  }
  
  console.log("🗑️ Ritmos Widget destroyed");
}

// Expose global API
window.RitmosWidget = {
  init,
  destroy
};

// Auto-initialize if script has data-auto-init attribute
const currentScript = document.currentScript as HTMLScriptElement;
if (currentScript?.hasAttribute("data-auto-init")) {
  init();
}

// Export for module usage
export { init, destroy };
