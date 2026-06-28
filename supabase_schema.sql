-- DEFINICION: Entidad de usuarios (perfiles)
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  pin text NOT NULL,
  avatar text NOT NULL,
  created_at timestamp DEFAULT now()
);

-- DEFINICION: Historial de sesiones cognitivas
CREATE TABLE sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  exercise text NOT NULL,
  exercise_name text,
  score integer,
  level integer,
  duration integer,
  created_at timestamp DEFAULT now()
);

-- INTEGRIDAD: Restricciones CHECK sobre rangos numericos
ALTER TABLE sessions
  ADD CONSTRAINT score_non_negative CHECK (score >= 0),
  ADD CONSTRAINT level_valid CHECK (level BETWEEN 1 AND 5),
  ADD CONSTRAINT duration_non_negative CHECK (duration >= 0);

-- OPTIMIZACION: Indice de busqueda por usuario
CREATE INDEX idx_sessions_user ON sessions(user_id);

-- SEGURIDAD RLS: Tabla users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir lectura publica de usuarios"
  ON public.users FOR SELECT USING (true);
CREATE POLICY "Permitir creacion publica de usuarios"
  ON public.users FOR INSERT WITH CHECK (true);

-- SEGURIDAD RLS: Tabla sessions
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir lectura publica de sesiones"
  ON public.sessions FOR SELECT USING (true);
CREATE POLICY "Permitir insercion publica de sesiones"
  ON public.sessions FOR INSERT WITH CHECK (true);
