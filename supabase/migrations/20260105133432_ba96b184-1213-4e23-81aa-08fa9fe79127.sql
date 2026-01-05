-- Add RLS policies to protect rsvp_submissions from unauthorized UPDATE and DELETE

-- Only admins can update RSVP submissions
CREATE POLICY "Only admins can update RSVP submissions"
ON public.rsvp_submissions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete RSVP submissions
CREATE POLICY "Only admins can delete RSVP submissions"
ON public.rsvp_submissions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));