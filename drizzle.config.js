/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/models/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:DGhRkj6Fg7yq@ep-young-salad-a1inde95.ap-southeast-1.aws.neon.tech/mock-interview?sslmode=require",
  },
};
