# ramhunter.com

RAM price comparison site. Sorted by price-per-GB. Multi-retailer.

**Live Site:** https://ramhunter.com (domain pending DNS)  
**Tech Stack:** 11ty (Eleventy), Cloudflare Pages  
**GitHub:** github.com/tomrbon/ramhunter

## Status

✅ **Site complete** — 61 RAM products, 20 articles  
⏳ **Awaiting:** Domain registration + DNS configuration

## Content

**61 products** across 5 categories:
- DDR5
- DDR4
- DDR3
- SODIMM (Laptop)
- ECC (Server)

**20 articles** covering RAM guides, comparisons, and buying advice.

## Quick Start

```bash
cd site
npm install
npm run build
npm run serve  # Local dev server at http://localhost:8080
```

## Deployment

1. Register `ramhunter.com` domain
2. Point DNS to Cloudflare Pages
3. Push to GitHub — auto-deploys via Cloudflare

## Project Structure

```
ramhunter/
├── site/
│   ├── _data/           # Product data (products.json)
│   ├── _includes/       # Templates
│   ├── css/             # Styles
│   ├── js/              # Client-side JS
│   ├── posts/           # 20 blog articles
│   └── .eleventy.js     # 11ty config
├── .gitignore
├── package.json
└── README.md            # This file
```

## Next Steps

1. Register domain (ramhunter.com)
2. Configure Cloudflare Pages custom domain
3. Update affiliate links
4. Launch

## Related Projects

- **diskprices.info** — Storage price comparison (same stack, live)
- **easyhtpc.com** — HTPC guides (same stack, live)

---

Built with [11ty](https://www.11ty.dev/) • Hosted on [Cloudflare Pages](https://pages.cloudflare.com/)
