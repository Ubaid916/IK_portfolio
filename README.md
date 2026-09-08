# Ikram Portfolio CMS

Next.js + Payload CMS portfolio with editable admin panel. Design matches the original static site.

## Quick start

```bash
cd portfolio-cms
npm install --legacy-peer-deps
npm run dev
```

- Website: http://localhost:3000
- Admin panel: http://localhost:3000/admin

First visit to `/admin` pe apna admin email + password create karein.

## Admin mein kya edit kar sakte ho

| Section | Where |
|---|---|
| Hero, About, Services, Tools, Process, Contact, Footer | **Globals → Homepage Content** |
| Featured projects (add/edit/delete videos) | **Collections → Projects** |
| Reels | **Collections → Reels** |
| Uploaded images/videos | **Collections → Media** |

## Projects / Reels add karne ka tareeqa

1. Admin → **Media** → video upload karein
2. **Projects** ya **Reels** → Create New
3. Title/label + uploaded video select karein
4. Order number set karein (chhota number pehle dikhega)
5. Save — website automatically update ho jayegi

## Notes

- Local database: SQLite (`portfolio.db`)
- Production mein `PAYLOAD_SECRET` change zaroor karein
- Heavy videos ke liye baad mein Cloudinary/Mux use karna better hai
