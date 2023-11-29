import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
	username: text("username").primaryKey(),
	nickname: text("nickname").default("new user").notNull(),
	password: text("password").notNull(),
	email: text("email").unique().notNull(),
	avatar: text("avatar"),
	created: integer("created", { mode: "timestamp" }).default(
		sql`CURRENT_TIMESTAMP`,
	),
	role: text("role").default("user"),
});

export const topic = sqliteTable("topic", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
});

export const article = sqliteTable(
	"article",
	{
		id: integer("id").primaryKey({ autoIncrement: true }),
		topic: text("topic")
			.notNull()
			.references(() => topic.id),
		title: text("title").notNull(),
		content: text("content").notNull(),
		created: integer("created", { mode: "timestamp" })
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),
		edited: integer("edited", { mode: "timestamp" })
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),
		author: text("author")
			.notNull()
			.references(() => user.username),
	},
	(articles) => ({
		topicIdx: index("topicIdx").on(articles.topic),
		authorIdx: index("author").on(articles.author),
	}),
);

export const comment = sqliteTable("comment", {
	id: integer("id").primaryKey(),
	topic: text("topic").references(() => topic.id),
	article: integer("article").references(() => article.id),
	user: text("user").references(() => user.username),
	content: text("content"),
	created: integer("created", { mode: "timestamp" }),
});

export const userRelation = relations(user, ({ many }) => ({
	article: many(article),
	comment: many(comment),
}));

export const topicRelation = relations(topic, ({ many }) => ({
	article: many(article),
	comment: many(comment),
}));

export const articleRelation = relations(article, ({ one, many }) => ({
	topic: one(topic, {
		fields: [article.topic],
		references: [topic.id],
	}),
	author: one(user, {
		fields: [article.author],
		references: [user.username],
	}),
	many: many(comment),
}));

export const commentRelation = relations(comment, ({ one }) => ({
	article: one(article, {
		fields: [comment.article],
		references: [article.id],
	}),
	topic: one(topic, {
		fields: [comment.topic],
		references: [topic.id],
	}),
	user: one(user, {
		fields: [comment.user],
		references: [user.username],
	}),
}));
