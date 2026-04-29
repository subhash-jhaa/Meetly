-- AlterTable: Add status column to Meeting (with default so existing rows get a value)
ALTER TABLE "Meeting" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'ACTIVE';

-- CreateTable: Summary
CREATE TABLE IF NOT EXISTS "Summary" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "transcript" TEXT,
    "content" TEXT,
    "keyDecisions" TEXT[],
    "actionItems" TEXT[],
    "nextSteps" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Summary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: unique on meetingId in Summary
CREATE UNIQUE INDEX IF NOT EXISTS "Summary_meetingId_key" ON "Summary"("meetingId");

-- AddForeignKey: Summary -> Meeting
ALTER TABLE "Summary" DROP CONSTRAINT IF EXISTS "Summary_meetingId_fkey";
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
