-- Full-text search index on summary content + transcript
CREATE INDEX IF NOT EXISTS summary_fts_idx 
ON "Summary" 
USING GIN (
  to_tsvector('english', 
    coalesce(content, '') || ' ' || 
    coalesce(transcript, '')
  )
);