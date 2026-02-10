CREATE POLICY "Allow anonymous lead submissions"
ON public.leads
FOR INSERT
WITH CHECK (true);