-- =================================================================
-- Nintendo Switch Contest - Database Setup Script
-- =================================================================
-- Run this SQL in your Supabase SQL Editor

-- Create the participants table
CREATE TABLE IF NOT EXISTS partecipanti (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cognome VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  twitter_handle VARCHAR(15),
  numero_biglietto VARCHAR(20) UNIQUE NOT NULL,
  importo DECIMAL(10,2) NOT NULL,
  ticket_count INTEGER DEFAULT 1,
  stato_pagamento VARCHAR(20) DEFAULT 'pending',
  stripe_session_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  data_creazione TIMESTAMP DEFAULT NOW(),
  data_pagamento TIMESTAMP,
  
  -- Constraints
  CONSTRAINT chk_importo_positive CHECK (importo > 0),
  CONSTRAINT chk_ticket_count_positive CHECK (ticket_count > 0),
  CONSTRAINT chk_stato_pagamento CHECK (stato_pagamento IN ('pending', 'completed', 'failed', 'cancelled')),
  CONSTRAINT chk_email_format CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_partecipanti_email ON partecipanti(email);
CREATE INDEX IF NOT EXISTS idx_partecipanti_stripe_session ON partecipanti(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_partecipanti_stato_pagamento ON partecipanti(stato_pagamento);
CREATE INDEX IF NOT EXISTS idx_partecipanti_data_creazione ON partecipanti(data_creazione);

-- Create a function to generate unique ticket numbers
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS VARCHAR AS $$
DECLARE
    new_number VARCHAR;
    exists_count INTEGER;
BEGIN
    LOOP
        -- Generate a random 8-digit number
        new_number := LPAD(FLOOR(RANDOM() * 100000000)::TEXT, 8, '0');
        
        -- Check if it already exists
        SELECT COUNT(*) INTO exists_count 
        FROM partecipanti 
        WHERE numero_biglietto = new_number;
        
        -- If it doesn't exist, return it
        IF exists_count = 0 THEN
            RETURN new_number;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE partecipanti ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to insert their own data
CREATE POLICY "Allow authenticated users to insert participants" ON partecipanti
    FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated');

-- Create policy for service role to read/update all data (for webhooks)
CREATE POLICY "Allow service role full access" ON partecipanti
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Create policy for authenticated users to read their own data
CREATE POLICY "Allow users to read their own data" ON partecipanti
    FOR SELECT
    TO authenticated
    USING (email = auth.jwt() ->> 'email');

-- =================================================================
-- Sample Data (Optional - for testing)
-- =================================================================

-- Uncomment the following lines to insert test data
/*
INSERT INTO partecipanti (
    nome, 
    cognome, 
    email, 
    twitter_handle, 
    numero_biglietto, 
    importo, 
    ticket_count,
    stato_pagamento
) VALUES 
(
    'Test', 
    'User', 
    'test@example.com', 
    'testuser', 
    '12345678', 
    10.00, 
    1,
    'completed'
);
*/

-- =================================================================
-- Verification Queries
-- =================================================================

-- Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'partecipanti'
ORDER BY ordinal_position;

-- Check constraints
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'partecipanti';

-- Check indexes
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'partecipanti';

-- Test the ticket number generation function
SELECT generate_ticket_number() as sample_ticket_number;

-- =================================================================
-- Cleanup (if needed)
-- =================================================================

-- Uncomment these lines if you need to reset the database
/*
DROP TABLE IF EXISTS partecipanti CASCADE;
DROP FUNCTION IF EXISTS generate_ticket_number();
*/
