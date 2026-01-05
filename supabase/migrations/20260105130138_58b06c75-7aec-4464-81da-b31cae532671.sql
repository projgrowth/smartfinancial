-- Add RLS policies to deny UPDATE and DELETE for non-admin users on meeting_requests
-- Only admins should be able to update meeting requests
CREATE POLICY "Only admins can update meeting requests"
ON public.meeting_requests
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins should be able to delete meeting requests
CREATE POLICY "Only admins can delete meeting requests"
ON public.meeting_requests
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));