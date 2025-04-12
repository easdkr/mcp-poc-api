/* eslint-disable @typescript-eslint/require-await */
import { Migration } from '@mikro-orm/migrations';

export class Migration20250412000000 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      CREATE TABLE "products" (
        "id" serial PRIMARY KEY,
        "name" varchar(255) NOT NULL,
        "description" varchar(255) NOT NULL,
        "price" int NOT NULL,
        "stock_quantity" int NOT NULL,
        "image_url" varchar(255) NULL,
        "created_at" timestamp NOT NULL,
        "updated_at" timestamp NOT NULL
      );
    `);
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS "products";');
  }
}
