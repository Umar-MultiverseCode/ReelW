CREATE TABLE public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    user_name TEXT, -- Made optional from the start
    user_avatar_url TEXT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL
);

-- RLS Policies for feedback table
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read all feedback
CREATE POLICY "Allow public read access"
ON public.feedback
FOR SELECT
USING (true);

-- Allow authenticated users to insert their own feedback
CREATE POLICY "Allow users to insert their own feedback"
ON public.feedback
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own feedback
CREATE POLICY "Allow users to update their own feedback"
ON public.feedback
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own feedback
CREATE POLICY "Allow users to delete their own feedback"
ON public.feedback
FOR DELETE
USING (auth.uid() = user_id); 