
-- Create a table for storing reels
CREATE TABLE public.reels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  url TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  date_saved TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_liked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) to ensure users can only see their own reels
ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own reels
CREATE POLICY "Users can view their own reels" 
  ON public.reels 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own reels
CREATE POLICY "Users can create their own reels" 
  ON public.reels 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own reels
CREATE POLICY "Users can update their own reels" 
  ON public.reels 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own reels
CREATE POLICY "Users can delete their own reels" 
  ON public.reels 
  FOR DELETE 
  USING (auth.uid() = user_id);
