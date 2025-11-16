-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('student', 'driver', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create buses table
CREATE TABLE public.buses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_number TEXT NOT NULL UNIQUE,
  capacity INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  current_location JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create routes table
CREATE TABLE public.routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  stops JSONB NOT NULL,
  distance_km DECIMAL(10, 2),
  estimated_duration_mins INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create bus_assignments table (linking drivers to buses)
CREATE TABLE public.bus_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  bus_id UUID REFERENCES public.buses(id) ON DELETE CASCADE NOT NULL,
  route_id UUID REFERENCES public.routes(id) ON DELETE SET NULL,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'active'
);

-- Create bus_requests table (student requests)
CREATE TABLE public.bus_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  pickup_point TEXT NOT NULL,
  drop_point TEXT NOT NULL,
  preferred_time TIME,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create GPS tracking table
CREATE TABLE public.bus_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_id UUID REFERENCES public.buses(id) ON DELETE CASCADE NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bus_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bus_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bus_locations ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for buses
CREATE POLICY "Everyone can view buses"
  ON public.buses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage buses"
  ON public.buses FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for routes
CREATE POLICY "Everyone can view routes"
  ON public.routes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage routes"
  ON public.routes FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for bus_assignments
CREATE POLICY "Drivers can view their assignments"
  ON public.bus_assignments FOR SELECT
  USING (
    public.has_role(auth.uid(), 'driver') AND driver_id = auth.uid()
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can manage assignments"
  ON public.bus_assignments FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for bus_requests
CREATE POLICY "Students can view their own requests"
  ON public.bus_requests FOR SELECT
  USING (
    public.has_role(auth.uid(), 'student') AND student_id = auth.uid()
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Students can create requests"
  ON public.bus_requests FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'student') AND student_id = auth.uid()
  );

CREATE POLICY "Students can update their own requests"
  ON public.bus_requests FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'student') AND student_id = auth.uid()
  );

CREATE POLICY "Admins can manage all requests"
  ON public.bus_requests FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for bus_locations
CREATE POLICY "Everyone can view bus locations"
  ON public.bus_locations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Drivers can insert their bus location"
  ON public.bus_locations FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'driver')
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can manage all locations"
  ON public.bus_locations FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add update triggers to tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_buses_updated_at
  BEFORE UPDATE ON public.buses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_routes_updated_at
  BEFORE UPDATE ON public.routes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bus_requests_updated_at
  BEFORE UPDATE ON public.bus_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();