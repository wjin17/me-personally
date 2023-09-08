-- PROJECTS
CREATE TABLE projects(
  id SERIAL PRIMARY KEY, title TEXT NOT NULL, 
  description TEXT NOT NULL, image TEXT, 
  github_url TEXT NOT NULL, demo_url TEXT
);

INSERT INTO projects(
  title, 
  description, 
  github_url, 
  demo_url, 
  image
) 
VALUES 
  (
    'Sample project', 
    'Personal website.', 
    'https://github.com/wjin17/me-personally', 
    'http://willjin1796.com/'
  )

-- BLOG
CREATE TABLE blog_posts(
  id SERIAL PRIMARY KEY, 
  title TEXT NOT NULL,
  slug TEXT,
  contents jsonb NOT NULL,
  hidden BOOLEAN DEFAULT FALSE,
  posted_at DATE NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO blog_posts(
  title,
  contents,
  posted_at
)
VALUES 
  (
    'Test Post', 
    '[{"type":"paragraph","align":"left","children":[{"text":"Doggo ipsum adorable doggo extremely cuuuuuute big ol pupper he made many woofs fluffer fat boi shooberino"}]}]', 
    '2023-5-8'
  );

-- FUNCTIONS
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE EXTENSION IF NOT EXISTS "unaccent";

CREATE OR REPLACE FUNCTION slugify("value" TEXT)
RETURNS TEXT AS $$
  -- removes accents (diacritic signs) from a given string --
  WITH "unaccented" AS (
    SELECT unaccent("value") AS "value"
  ),
  -- lowercases the string
  "lowercase" AS (
    SELECT lower("value") AS "value"
    FROM "unaccented"
  ),
  -- remove single and double quotes
  "removed_quotes" AS (
    SELECT regexp_replace("value", '[''"]+', '', 'gi') AS "value"
    FROM "lowercase"
  ),
  -- replaces anything that's not a letter, number, hyphen('-'), or underscore('_') with a hyphen('-')
  "hyphenated" AS (
    SELECT regexp_replace("value", '[^a-z0-9\\-_]+', '-', 'gi') AS "value"
    FROM "removed_quotes"
  ),
  -- trims hyphens('-') if they exist on the head or tail of the string
  "trimmed" AS (
    SELECT regexp_replace(regexp_replace("value", '\-+$', ''), '^\-', '') AS "value"
    FROM "hyphenated"
  )
  SELECT "value" FROM "trimmed";
$$ LANGUAGE SQL STRICT IMMUTABLE;

CREATE FUNCTION public.set_slug_from_title() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.slug := slugify(NEW.title);
  RETURN NEW;
END
$$;

-- TRIGGERS
CREATE FUNCTION public.set_slug_from_title() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.slug := slugify(NEW.title);
  RETURN NEW;
END
$$;