import {pgTable, primaryKey, text, timestamp, uniqueIndex, uuid, varchar} from 'drizzle-orm/pg-core'

export const application = pgTable(
    'application',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: varchar('name', {length: 255}).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updatedAt').defaultNow().notNull(),
    }
)

export const users = pgTable(
    'users',
    {
        id: uuid('id').defaultRandom().notNull(),
        email: varchar('email', {length: 256}).notNull(),
        name: varchar('name', {length: 256}).notNull(),
        applicationId: uuid('application_id').references(() => application.id),
        password: varchar('password', {length: 256}).notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updatedAt').defaultNow().notNull(),
    },
    (users)=> {
        return {
            cpk: primaryKey(users.email, users.applicationId),
            idIndex: uniqueIndex("users_id_index").on(users.id)
        }
    }
)

export const roles = pgTable(
    'roles',
    {
        id: uuid('id').defaultRandom().notNull(),
        name: varchar('name', {length: 256}).notNull(),
        applicationId: uuid('application_id').references(() => application.id),
        permissions: text('permissions').array().$type<Array<string>>(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updatedAt').defaultNow().notNull(),
    },
    (roles)=> {
        return {
            cpk: primaryKey(roles.name, roles.applicationId),
            idIndex: uniqueIndex("roles_id_index").on(roles.id)
        }
    })

export const userToRoles = pgTable(
    'userToRoles', {
        applicationId: uuid('applicationId').references(() => application.id).notNull(),
        userId: uuid('userId').references(() => users.id).notNull(),
        roleId: uuid('roleId').references(() => roles.id).notNull(),

    },
    (userToRoles)=> {
        return {
            cpk: primaryKey(userToRoles.applicationId, userToRoles.userId, userToRoles.roleId),
        }
    }
)