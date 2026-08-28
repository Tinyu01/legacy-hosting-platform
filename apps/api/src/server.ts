import express from "express";
import {
  loadCatalog,
  getActiveProducts,
  getProductsByCategory,
  getProductBySlug,
  getAddonsForCategory,
  isPurchasable,
} from "@legacy-hosting/catalog-sdk";
import { handleCheckout } from "./routes/checkout";
import type { BillingPeriod } from "@legacy-hosting/types";

const app = express();
const PORT = Number(process.env.API_PORT ?? 4000);

app.use(express.json());

// CORS for local storefront
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.STOREFRONT_URL ?? "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (_req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  next();
});

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "legacy-hosting-api",
    version: "2026.1.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/v1/catalog", (_req, res) => {
  try {
    const catalog = loadCatalog();
    res.json({
      version: catalog.catalog.version,
      currency: catalog.catalog.currency,
      categories: catalog.categories,
      products: getActiveProducts(catalog),
      addons: catalog.addons?.filter((a) => a.status === "active") ?? [],
      locations: catalog.locations?.filter((l) => l.status === "active") ?? [],
      operatingSystems:
        catalog.operatingSystems?.filter((os) => os.status === "active") ?? [],
      paymentMethods:
        catalog.paymentMethods?.filter((p) => p.status === "active") ?? [],
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.get("/api/v1/products", (req, res) => {
  try {
    const category = req.query.category as string | undefined;
    const products = category
      ? getProductsByCategory(category)
      : getActiveProducts();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.get("/api/v1/products/:slug", (req, res) => {
  try {
    const product = getProductBySlug(req.params.slug);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    const catalog = loadCatalog();
    res.json({
      product,
      purchasable: isPurchasable(product, catalog),
      addons: getAddonsForCategory(product.category, catalog),
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.post("/api/v1/checkout", async (req, res) => {
  try {
    const { productSlug, period, addonIds, locationId } = req.body ?? {};

    if (!productSlug || !period) {
      res.status(400).json({
        error: "productSlug and period are required",
      });
      return;
    }

    if (period !== "month" && period !== "year") {
      res.status(400).json({ error: 'period must be "month" or "year"' });
      return;
    }

    const result = await handleCheckout({
      productSlug,
      period: period as BillingPeriod,
      addonIds,
      locationId,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

app.listen(PORT, () => {
  console.log(`Legacy Hosting API listening on http://localhost:${PORT}`);
  console.log(`  GET  /health`);
  console.log(`  GET  /api/v1/catalog`);
  console.log(`  GET  /api/v1/products`);
  console.log(`  GET  /api/v1/products/:slug`);
  console.log(`  POST /api/v1/checkout`);
});
