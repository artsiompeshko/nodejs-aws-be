CREATE DATABASE SHOP;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	title text NOT NULL,
  imageUrl text,
	description text,
	price integer CHECK (price > 0)
);

CREATE TABLE stocks (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	product_id UUID NOT NULL UNIQUE REFERENCES products,
	count integer CHECK (count > 0)
);
