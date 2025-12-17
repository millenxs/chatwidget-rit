Chat Widget Design Guidelines - Ritmos do Coração
Design Approach
System Selected: Material Design principles adapted for conversational UI, with influences from modern chat applications (WhatsApp, Telegram) for familiarity and trust.

Rationale: This is a utility-focused widget where clarity, ease of navigation, and trust are paramount. Users need to quickly find donation information through menu-driven interactions.

Core Design Principles
Conversational Clarity: Every message must be scannable and actionable
Progressive Disclosure: Guide users through menus without overwhelming
Trust & Accessibility: Professional appearance suitable for NGO context
Mobile-First: Optimized for small screens where chat widgets are most used
Typography System
Font Family:

Primary: System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)
Fallback for Brazilian Portuguese: Include "Helvetica Neue"
Hierarchy:

Widget Header: 18px, semi-bold (600)
Message Text (Bot): 15px, regular (400), line-height 1.5
Message Text (User): 15px, regular (400), line-height 1.5
Button Labels: 14px, medium (500)
Timestamps: 11px, regular (400)
Helper Text: 13px, regular (400)
Layout & Spacing System
Tailwind Units: Use consistent spacing of 2, 3, 4, 6, 8 units

Message padding: p-3 (12px)
Button padding: px-4 py-2 (16px/8px)
Container margins: m-4 (16px)
Section gaps: gap-2 for tight grouping, gap-4 for separation
Widget Dimensions:

Desktop: 380px width × 600px height
Mobile: Full-width × 100vh (minus safe areas)
Collapsed (FAB): 56px × 56px circular button
Chat Container Structure:

┌─────────────────────────┐
│ Header (fixed, h-16)    │
├─────────────────────────┤
│                         │
│ Messages (flex-1,       │
│  overflow-y-auto)       │
│                         │
├─────────────────────────┤
│ Input Area (h-20)       │ ← Only when typing mode active
└─────────────────────────┘

Component Library
1. Floating Action Button (FAB)
Position: Fixed bottom-right (bottom-6 right-6)
Size: 56px × 56px, fully rounded
Icon: Chat bubble or custom NGO logo
Shadow: Deep elevation (shadow-lg)
Animation: Subtle pulse on initial page load
2. Chat Container
Border radius: 16px (desktop), 0px (mobile fullscreen)
Shadow: Prominent (shadow-2xl on desktop)
Background: Solid surface
Backdrop: Semi-transparent overlay when open (mobile)
3. Header Component
Height: 64px (h-16)
Elements: NGO logo/name (left), minimize/close buttons (right)
Typography: 18px semi-bold
Divider: 1px bottom border
4. Message Bubbles
Bot Messages:

Alignment: Left-aligned
Max-width: 85% of container
Border radius: 16px 16px 16px 4px (tail on bottom-left)
Padding: p-3
Spacing: mb-3 between messages
User Messages:

Alignment: Right-aligned
Max-width: 75% of container
Border radius: 16px 16px 4px 16px (tail on bottom-right)
Padding: p-3
Spacing: mb-3 between messages
Timestamp:

Position: Below bubble, 11px, reduced opacity
Format: HH:MM (Brazilian time format)
5. Quick Reply Buttons
Critical Component - These are the primary interaction method:

Layout:

Vertical stack for 1-4 buttons
Grid 2-column for 5-8 buttons (grid-cols-2 gap-2)
Full-width for single prominent action
Button Styling:

Border radius: 8px
Padding: px-4 py-2.5
Border: 2px solid
Typography: 14px medium (500), left-aligned text
Icon support: Optional leading icon (16px)
Min-height: 40px (touch-friendly)
Hover: Slight scale (1.02) and shadow increase
Active: Scale down (0.98)
Button Variants:

Primary action: Filled style
Secondary actions: Outlined style
Navigation ("Voltar"): Ghost/text style
6. Typing Indicator
Display: Three animated dots
Size: 8px each, gap-1
Animation: Sequential fade in/out (0.6s cycle)
Position: Left-aligned bot message style
7. Fallback Message
Style: Warning/alert treatment
Include: Helpful suggestions and "Voltar ao menu" button
Icon: Question mark or alert symbol
8. Scrollbar
Width: 4px (thin)
Auto-hide on desktop, always visible on mobile
Smooth scroll behavior
Interaction Patterns
Navigation Flow
Initial State: Greeting message with 4 main menu buttons
Menu Selection: Bot responds with submenu buttons
Information Display: Bot shows detailed response + "Mais alguma dúvida?" with Sim/Não
Continuation: Loop back to appropriate menu level
Button Interactions
Click/Tap: Immediate visual feedback (scale down)
Disabled State: Reduced opacity (50%) after selection to prevent re-clicks
Loading: Replace button text with spinner during API call
Message Animations
Entry: Fade in + slide up (200ms)
Typing indicator: Appears before bot message (500ms delay)
No exit animations (static history)
Accessibility Requirements
Keyboard Navigation: Full tab/enter support through all buttons
Screen Readers: Semantic HTML with ARIA labels
role="log" for message container
aria-live="polite" for new messages
aria-label for all icon buttons
Focus States: Clear 2px outline on all interactive elements
Contrast: Minimum WCAG AA (4.5:1 for text)
Touch Targets: Minimum 40px height for all buttons
Responsive Behavior
Desktop (>768px):

Fixed position widget (bottom-right)
Contained 380px × 600px window
Remains on top of page content
Mobile (<768px):

Full-screen takeover when open
FAB remains in bottom-right when closed
Slide-up animation on open
Swipe-down to close gesture support
Special Components
Link Formatting
Display: Inline with arrow icon →
Style: Underlined on hover
External links: Open in new tab with indicator
Information Cards (for bank details, addresses)
Border: 1px solid
Padding: p-4
Border radius: 8px
Icon: Leading icon for context (bank, location)
Copyable fields: Click-to-copy with confirmation toast
Session Persistence Indicator
Subtle badge showing "Conversa restaurada" when loading history
Auto-dismiss after 3 seconds
Content Density
Message spacing: Generous mb-3 between bubbles for readability
Button spacing: gap-2 in stacks, gap-3 between groups
Padding: Consistent p-4 for container edges
Line height: 1.5 for all body text (readability in Portuguese)
Key Differentiators
This chat widget prioritizes decision clarity over conversational flair. Unlike open-ended chatbots:

Every response includes actionable buttons
No text input by default (button-driven navigation)
Clear visual hierarchy guides users to donations
Professional NGO aesthetic builds trust for financial transactions