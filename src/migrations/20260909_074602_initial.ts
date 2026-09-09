import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text DEFAULT 'Image',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text DEFAULT 'FEATURED PROJECT' NOT NULL,
  	\`cover_image_id\` integer,
  	\`video_id\` integer,
  	\`link\` text,
  	\`link_label\` text DEFAULT 'View Project',
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_cover_image_idx\` ON \`projects\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_video_idx\` ON \`projects\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`reels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`cover_image_id\` integer,
  	\`video_id\` integer,
  	\`link\` text,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`reels_cover_image_idx\` ON \`reels\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`reels_video_idx\` ON \`reels\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`reels_updated_at_idx\` ON \`reels\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`reels_created_at_idx\` ON \`reels\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`projects_id\` integer,
  	\`reels_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`reels_id\`) REFERENCES \`reels\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_reels_id_idx\` ON \`payload_locked_documents_rels\` (\`reels_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`homepage_hero_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_hero_stats_order_idx\` ON \`homepage_hero_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_hero_stats_parent_id_idx\` ON \`homepage_hero_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_services_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_services_features_order_idx\` ON \`homepage_services_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_services_features_parent_id_idx\` ON \`homepage_services_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text DEFAULT '✦',
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`image_id\` integer,
  	\`link\` text,
  	\`link_label\` text DEFAULT 'View work',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_services_order_idx\` ON \`homepage_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_services_parent_id_idx\` ON \`homepage_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_services_image_idx\` ON \`homepage_services\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_about_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_about_list_order_idx\` ON \`homepage_about_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_about_list_parent_id_idx\` ON \`homepage_about_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_tools\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_tools_order_idx\` ON \`homepage_tools\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_tools_parent_id_idx\` ON \`homepage_tools\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_process_steps_order_idx\` ON \`homepage_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_process_steps_parent_id_idx\` ON \`homepage_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_socials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_socials_order_idx\` ON \`homepage_socials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_socials_parent_id_idx\` ON \`homepage_socials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_type\` text DEFAULT 'text',
  	\`logo_text\` text DEFAULT 'IKRAM',
  	\`logo_image_id\` integer,
  	\`nav_cta\` text DEFAULT 'Let''s Talk' NOT NULL,
  	\`nav_cta_link\` text DEFAULT '#contact',
  	\`site_title\` text DEFAULT 'Ikram Ullah Khan | Video Editor & Motion Designer' NOT NULL,
  	\`hero_tag\` text DEFAULT 'Available for freelance projects',
  	\`hero_name_line1\` text DEFAULT 'Ikram Ullah',
  	\`hero_name_line2\` text DEFAULT 'Khan.',
  	\`hero_description\` text DEFAULT 'Video Editor & Motion Designer creating cinematic videos, engaging social content, motion graphics and AI-powered visual stories.',
  	\`hero_primary_cta\` text DEFAULT 'View My Work ->',
  	\`hero_primary_cta_link\` text DEFAULT '#work',
  	\`hero_secondary_cta\` text DEFAULT 'Let''s Work Together',
  	\`hero_secondary_cta_link\` text DEFAULT '#contact',
  	\`work_label\` text DEFAULT 'Selected Work',
  	\`work_title\` text DEFAULT 'My Portfolio.',
  	\`work_description\` text DEFAULT 'A selection of my latest video projects and short-form content.',
  	\`reels_label\` text DEFAULT 'Short Form',
  	\`reels_title\` text DEFAULT 'Reels.',
  	\`reels_description\` text DEFAULT 'Short-form edits made for social media.',
  	\`services_label\` text DEFAULT 'What I Do',
  	\`services_title\` text DEFAULT 'Creative services.',
  	\`services_description\` text DEFAULT 'From raw footage to polished final videos, I handle the complete visual production process.',
  	\`about_label\` text DEFAULT 'About Me',
  	\`about_title\` text DEFAULT 'Behind every good video is a good story.',
  	\`about_paragraph1\` text DEFAULT 'I''m Ikram Ullah Khan, a Video Editor and Motion Designer focused on creating engaging, cinematic and modern visual content.',
  	\`about_paragraph2\` text DEFAULT 'I combine editing, motion graphics, sound, typography and AI visuals to transform ideas into content that looks professional and keeps viewers engaged.',
  	\`about_card_label\` text DEFAULT 'VIDEO EDITOR / MOTION DESIGNER',
  	\`about_card_text\` text DEFAULT 'Turning ideas into visual stories.',
  	\`tools_label\` text DEFAULT 'My Toolkit',
  	\`tools_title\` text DEFAULT 'Software & Tools',
  	\`tools_description\` text DEFAULT 'The creative tools I use to edit, design, animate and produce visual content.',
  	\`process_label\` text DEFAULT 'My Process',
  	\`process_title\` text DEFAULT 'From idea to final cut.',
  	\`process_description\` text DEFAULT 'A simple creative workflow designed to keep projects organized and visually strong.',
  	\`contact_label\` text DEFAULT 'Have a Project?',
  	\`contact_title\` text DEFAULT 'Let''s create something',
  	\`contact_title_accent\` text DEFAULT 'great together.',
  	\`contact_description\` text DEFAULT 'Have an idea, project or video that needs a professional touch?',
  	\`contact_email\` text DEFAULT 'ikram@example.com',
  	\`contact_cta\` text DEFAULT 'Start a Conversation ->',
  	\`contact_cta_link\` text DEFAULT 'mailto:ikram@example.com',
  	\`footer_text\` text DEFAULT '© 2026 Ikram Ullah Khan. All rights reserved.',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_logo_image_idx\` ON \`homepage\` (\`logo_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`projects\`;`)
  await db.run(sql`DROP TABLE \`reels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`homepage_hero_stats\`;`)
  await db.run(sql`DROP TABLE \`homepage_services_features\`;`)
  await db.run(sql`DROP TABLE \`homepage_services\`;`)
  await db.run(sql`DROP TABLE \`homepage_about_list\`;`)
  await db.run(sql`DROP TABLE \`homepage_tools\`;`)
  await db.run(sql`DROP TABLE \`homepage_process_steps\`;`)
  await db.run(sql`DROP TABLE \`homepage_socials\`;`)
  await db.run(sql`DROP TABLE \`homepage\`;`)
}
