# Adisah African Store: launch and Google setup checklist

Work through this in order. Some steps depend on earlier ones. Google Business Profile verification can take several days, so start it first.

You never need the owner's Google password. Each Google tool lets you share access by email, so you work from your own account and the owner holds the Owner or Administrator role on everything. Invitations go to adisah@gmail.com, so first confirm that the owner actually reads that inbox.

## 1. Before anything else

- [ ] Send the owner the discovery questions (`docs/discovery-questions.md`) and wait for their answers
- [ ] Get the original logo file (PNG or SVG) and 10 to 20 photos of the store front, the aisles, the freezers and popular products
- [ ] Buy the domain, for example `adisahafricanstore.com`, and register it in the owner's name
- [ ] Update `lib/site.ts` with the real hours, delivery areas and social links, then remove the TODO notes

## 2. Google Business Profile and Maps

1. [ ] Ask the owner to sign in at business.google.com on their phone, find or create the listing, then add your email under Business Profile settings > People and access with the Manager role. (Or create it from your account, then make the owner Primary owner and step down to Manager.)
2. [ ] Search for "Adisah African Store" first. If a listing already exists, claim it instead of creating a second one
3. [ ] Business name: Adisah African Store, exactly as on the sign. Adding keywords to the name breaks Google's rules and can get the listing suspended
4. [ ] Primary category: African Grocery Store. Secondary categories: Grocery store, Meat products store, Frozen food store
5. [ ] Address: 5436 Old Crain Hwy, Upper Marlboro, MD 20772. Drag the pin onto the store's front door
6. [ ] Service area: turn on delivery and add the delivery towns
7. [ ] Phone: +1 (301) 543-7933. Website: the new domain
8. [ ] Verify the listing. Google usually asks for a video of the store sign, the inside of the store and proof of management, such as keys or a till. The owner has to record it on site
9. [ ] After verification, fill in:
   - [ ] Hours, plus holiday hours
   - [ ] Attributes: Delivery, In-store pickup, In-store shopping, and payment types
   - [ ] Business description (use the site's meta description as a starting point)
   - [ ] Products: 6 to 10 items with photos, one per category
   - [ ] Photos: logo, cover, exterior, interior and products
   - [ ] Messaging or WhatsApp link, if the option is offered
10. [ ] Copy the latitude and longitude from the verified pin into `site.geo` in `lib/site.ts`

## 3. Google review QR system

1. [ ] In Business Profile, choose **Ask for reviews** and copy the short link (it looks like `https://g.page/r/.../review`)
2. [ ] Put it in the `NEXT_PUBLIC_GOOGLE_REVIEW_URL` variable in Railway and redeploy
3. [ ] Open `yourdomain.com/review` on a phone and check that it opens the review box
4. [ ] Print the QR card from `yourdomain.com/reviews`. Print it on card stock for the counter, the door, the delivery bags and receipts
5. [ ] The QR code opens the site's `/review` address, which forwards to Google. If the review link ever changes, update the environment variable and the printed cards keep working
6. [ ] Ask the owner to request a review from every happy delivery customer on WhatsApp, and to reply to every review

## 4. Deploy the website

The site is hosted on Railway. Railway runs `npm run build` and then `npm start`, and Next.js picks up Railway's `PORT` on its own, so the project needs no extra config.

1. [ ] Push the code to a GitHub repo
2. [ ] In Railway, create a new project from that GitHub repo
3. [ ] Under the service's Variables tab, add the variables from `.env.example`. Next.js copies any `NEXT_PUBLIC_` value into the site when it builds, so redeploy after changing one
4. [ ] Under Settings > Networking, add `www.adisahafricanstore.com` and `adisahafricanstore.com` as custom domains. Railway shows the DNS records each one needs
5. [ ] In Namecheap, open Domain List > Manage > Advanced DNS. Delete the default parking records (the CNAME for `www` and the URL Redirect for `@`), then add what Railway asked for:
   - `CNAME` record, host `www`, value from Railway
   - `ALIAS` record, host `@`, the value Railway gave for the root domain. Namecheap does not allow a CNAME on the root, and ALIAS does the same job there
   - Any `TXT` verification record Railway lists
6. [ ] Wait for Railway to show both domains as active with a certificate. This usually takes minutes, sometimes a few hours
7. [ ] Set `NEXT_PUBLIC_SITE_URL` to `https://adisahafricanstore.com` with no trailing slash, then redeploy
8. [ ] Test on a real phone: the Call, WhatsApp and Directions buttons, and one full order through the order builder

## 5. Google Search Console

1. [ ] Go to search.google.com/search-console and add a **Domain** property. Verify it with the DNS TXT record at the domain registrar
   - If DNS access is hard to get, use a **URL prefix** property with the HTML tag method, and paste the `content` value into `NEXT_PUBLIC_GSC_VERIFICATION`
2. [ ] Under Settings > Users and permissions, add the owner's email with Owner permission
3. [ ] Under Sitemaps, submit the full address `https://adisahafricanstore.com/sitemap.xml`. A Domain property rejects the short form `sitemap.xml`
4. [ ] Use URL Inspection on the home page and click **Request indexing**
5. [ ] Paste the home page into search.google.com/test/rich-results and check that GroceryStore and FAQ show up with no errors

## 6. Google Analytics 4 and conversion tracking

1. [ ] Create a GA4 property at analytics.google.com. Set the time zone to Eastern and the currency to USD
2. [ ] Add a Web data stream for the domain and copy the Measurement ID (`G-XXXXXXXXXX`) into `NEXT_PUBLIC_GA_ID`, then redeploy
   - Under Admin > Property access management, add the owner's email as Administrator
3. [ ] Open the site, click each button, and check under Reports > Realtime that these events come in:

   | Event | Fires when |
   |---|---|
   | `call_click` | Any tap-to-call link |
   | `whatsapp_click` | Any general WhatsApp button |
   | `whatsapp_order` | A customer sends a list from the order builder |
   | `directions_click` | Any Get Directions link |
   | `order_builder_open` | Start your order buttons |
   | `review_click` | Leave a review buttons |

   Each event includes a `location` parameter (header, hero, mobile_bar and so on), so you can see which button gets used.
4. [ ] Under Admin > Events, mark `whatsapp_order`, `call_click`, `whatsapp_click` and `directions_click` as **Key events**
5. [ ] Under Admin > Custom definitions, register `location` as an event-scoped custom dimension
6. [ ] Link GA4 to Search Console (Admin > Product links)
7. [ ] Optional: turn on Business Profile Performance insights, which show calls, direction requests and website clicks from Maps, so the owner gets one monthly number to watch

## 7. Local SEO foundation (already built into the site)

- Titles, descriptions and headings target "African store Upper Marlboro", "African grocery Maryland" and similar searches
- GroceryStore structured data covers the address, hours, geo coordinates, service area and product categories
- FAQ structured data for the questions people ask
- sitemap.xml, robots.txt, canonical URLs and an Open Graph share image
- The name, address and phone number match exactly across the site, the Business Profile and the footer

Ongoing work after launch:

- [ ] List the store with the same name, address and phone on Apple Business Connect, Bing Places, Yelp, Facebook and Nextdoor
- [ ] Post on Business Profile once a week: new stock, a weekend special or holiday hours
- [ ] Add photos to Business Profile every month
- [ ] Check Search Console and GA4 once a month and send the owner a short report

## 8. Handover

- [ ] The owner has owner access to Business Profile, GA4, Search Console, Railway and the domain
- [ ] The owner knows how to print more QR cards
- [ ] Walk the owner through what each GA4 event means
