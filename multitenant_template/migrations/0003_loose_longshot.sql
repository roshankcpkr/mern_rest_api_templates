CREATE TABLE IF NOT EXISTS "userToRoles" (
	"applicationId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"roleId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "userToRoles" ADD CONSTRAINT "userToRoles_applicationId_userId_roleId" PRIMARY KEY("applicationId","userId","roleId");

DO $$ BEGIN
 ALTER TABLE "userToRoles" ADD CONSTRAINT "userToRoles_applicationId_application_id_fk" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "userToRoles" ADD CONSTRAINT "userToRoles_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "userToRoles" ADD CONSTRAINT "userToRoles_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
