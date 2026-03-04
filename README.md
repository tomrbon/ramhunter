# RamHunter.com - RAM Price Comparison

🎮 **Hunt Down the Best RAM Deals**

RamHunter.com helps you find the best memory deals by calculating the true cost-per-gigabyte across different RAM types and retailers.

## Features

- **Price Per GB Comparison** - Fair comparison across different capacities
- **Multiple Categories** - DDR5, DDR4, DDR3, SODIMM (laptop), ECC (server)
- **Real-time Sorting & Filtering** - Find exactly what you need
- **Best Deal Highlighting** - Automatically marks the best value per category
- **Affiliate Link Support** - Support the site at no extra cost

## Tech Stack

- [Eleventy](https://www.11ty.dev/) - Static site generator
- Vanilla JavaScript - Filtering and sorting
- CSS Custom Properties - Theming
- Responsive Design - Mobile-first approach

## Categories

- 🚀 **DDR5** - Latest generation desktop memory
- ⚡ **DDR4** - Current generation desktop memory
- 📀 **DDR3** - Legacy desktop memory
- 💻 **SODIMM** - Laptop memory (DDR4/DDR5)
- 🖥️ **ECC** - Server and workstation memory

## Retailers

We compare prices from:
- Amazon
- Newegg
- B&H Photo
- Best Buy
- Corsair
- G.Skill
- Kingston

## Development

```bash
# Install dependencies
npm install

# Build the site
npm run build

# Serve locally
npm run serve
```

## Deployment

This site is designed to be deployed to Cloudflare Pages or any static hosting platform.

```bash
# Build for production
npm run build
```

The output goes to `_site/` directory.

## License

MIT

---

**Affiliate Disclosure:** This site earns commissions from qualifying purchases through affiliate links at no extra cost to you.