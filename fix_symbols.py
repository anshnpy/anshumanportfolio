from pathlib import Path

p = Path("app/page.tsx")
s = p.read_text(encoding="utf-8")

fixes = {
    "â˜£": "☣",
    "â†³": "↳",
    "âŒ˜": "⌘",
    "âš™": "⚙",
    "â†—": "↗",
    "â†’": "→",
    "â—Ž": "◎",
    "â–¡": "□",
    "âœ“": "✓",
    "â–£": "▣",
    "â—Œ": "◌",
    "âš¡": "⚡",
    "âŒ•": "◉",
    "âœ•": "✕",
    "â˜": "☁",
    "âˆž": "∞",
    "Ã—": "×",
    "â€”": "—",
    "Â©": "©"
}

for old, new in fixes.items():
    s = s.replace(old, new)

p.write_text(s, encoding="utf-8", newline="")
print("SYMBOLS FIXED")
