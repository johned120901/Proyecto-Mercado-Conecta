import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ihrgachxxrabndctfmvr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlocmdhY2h4eHJhYm5kY3RmbXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MTk1MDgsImV4cCI6MjA2MTI5NTUwOH0.hDdi9VXNIstp3oxB5TitGvQwLBnXLvgMlWumJVyRnnM'

export const supabase = createClient(supabaseUrl, supabaseKey)
