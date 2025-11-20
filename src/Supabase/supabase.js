import { createClient } from '@supabase/supabase-js'

// Reemplaza con tus datos reales de Supabase
const SUPABASE_URL = 'https://uapyoszytusdxlavvqyr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcHlvc3p5dHVzZHhsYXZ2cXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMjY1NjMsImV4cCI6MjA3NjkwMjU2M30.YNEG-akIvqWQndATL-buie6hm8FykXkajRiNXAy9gBw'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
